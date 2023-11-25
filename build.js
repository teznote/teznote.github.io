import fg from 'fast-glob'
import fs from 'fs-extra'
import matter from 'gray-matter'
import yaml from 'js-yaml'

import postcss from 'postcss'
import postcss_nested from 'postcss-nested'
import unocss from '@unocss/postcss'
import cssnano from 'cssnano'

import { Liquid } from 'liquidjs'
import { minify } from 'html-minifier'

import hljs from 'highlight.js'
import markdownIt from 'markdown-it'

hljs.registerLanguage("pseudo", function(hljs) {
  return {
    aliases: ['ps'],
    contains: [
      {
        className: 'comment',
        begin: /#/,
        end: /\s\s|\n|$/,
      },
      {
        className: 'strong',
        begin: /\b[A-Z][A-Z0-9]*\b/,
      },
      {
        className: 'number',
        begin: /\b[0-9]+\b/,
      },
      {
        className: 'leadline',
        begin: /[─│┌┐┘└├┬┤┴┼><∧∨]/,
      },
    ],
  }
})
const engine = new Liquid()
const md = new markdownIt({
  html: true,
  xhtmlOut: true,
  highlight: function (str, lang) {
    let lines_o = str.trim().match(/^[\s\S]*?$/gm)

    let str_modified = ''
    let tar_line = new Map()
    for (let [i, x] of lines_o.entries()) {
      let prefix = x[0]
      if (prefix === '+' || prefix === '-' || prefix === ':') {
        tar_line.set(i, prefix)
        x = x.slice(1)
      }
      str_modified += (x ? x : ' ') + '\n'
    }

    const _lang = lang && hljs.getLanguage(lang) ? lang : 'plaintext'
    const lines = hljs.highlight(str_modified, { language: _lang }).value.trim().match(/^[\s\S]*?$/gm)

    let res = ''
    for (let [i, x] of lines.entries()) {
      x = `<div class="line ${tar_line.get(i) || ''}">${x}</div>`
      res += x
    }
    
    return res
  },
})

// build_md
function build_md() {
  const src_mds = fg.globSync('./_pages/**/*.md')
  if (!fs.existsSync('./_pages/pageinfo.json')) {
    fs.outputJSONSync('./_pages/pageinfo.json', [])
  }
  const pageinfo_old = fs.readJSONSync('./_pages/pageinfo.json')
  const pageinfo_new = []

  // ver 있으면서, pageinfo 에 없거나(신규 생성), ver 달라진(업데이트) md 파일 -> json 변환
  for (let src_md of src_mds) {
    const ver = (src_md.match(/\[.*?\]/g) || [''])[0]
    const pathname = src_md.replace(ver, '').replace(/\.md$/, '').replace('./_pages/', '/').replace(/^\/index$/, '/')
    const exist_md = pageinfo_old.find(x => x.pathname === pathname)
    if (ver && (!exist_md || exist_md.ver !== ver)) {
      let { content, page } = (function fn(file, content, page) {
        let r = matter.read(file, {
          engines: {yaml: s => yaml.safeLoad(s, { schema: yaml.JSON_SCHEMA })}
        })
        if (file.match(/\.md$/)) {
          content = md.render(r.content)
          Object.assign(page, r.data)
          return ('layout' in r.data) ? fn(`./_layouts/${r.data.layout}.html`, content, page) : { content, page }
        } else {
          content = engine.parseAndRenderSync(r.content, { content, page, ...r.data })
          return ('layout' in r.data) ? fn(`./_layouts/${r.data.layout}.html`, content, page) : { content, page }
        }
      })(src_md, '', { pathname })

      content = minify(content, { collapseWhitespace: true })
      const tar_json = './docs' + (pathname === '/' ? '/index' : pathname) + '.json'
      fs.outputJSONSync(tar_json, { pathname, ver, content })
      pageinfo_new.push({ pathname, ver, ...page, tar_json, src_md })
    } else {
      pageinfo_new.push(exist_md)
    }
  }

  // page navigation 생성
  (function gen_nav(pages) {
    const pathname = '/posts'
    let r = matter.read('./_layouts/nav.html', {
      engines: {yaml: s => yaml.safeLoad(s, { schema: yaml.JSON_SCHEMA })}
    })
    let content = engine.parseAndRenderSync(r.content, { pages, ...r.data })
    content = minify(content, { collapseWhitespace: true })
    fs.outputJSONSync('./docs/posts.json', { pathname, content })
  })(pageinfo_new)

  // 삭제한 md 파일에 대응하는 json 파일 삭제
  // (pageinfo_old 에는 있지만 pageinfo_new 에는 없는 경우)
  for (const { pathname, tar_json } of pageinfo_old) {
    const exist_md = pageinfo_new.find(x => x.pathname === pathname)
    if (!exist_md) {
      fs.removeSync(tar_json)
      const old_dir = tar_json.match(/^.*(?=\/)/g)[0]
      if (!fs.readdirSync(old_dir).length) {
        fs.removeSync(old_dir)
      }
    }
  }

  // pageinfo.json 업데이트
  fs.outputJSONSync('./_pages/pageinfo.json', pageinfo_new)
}

function build_layout() {
  let r = matter.read('./_layouts/base.html', {
    engines: {yaml: s => yaml.safeLoad(s, { schema: yaml.JSON_SCHEMA })}
  })
  let content = engine.parseAndRenderSync(r.content, { ...r.data })
  content = minify(content, { collapseWhitespace: true })
  fs.outputFileSync('./docs/index.html', content)
  fs.copyFileSync('./docs/index.html', './docs/404.html')
}

async function build_asset() {
  const src_dir = './_assets'
  const tar_dir = './docs'

  fs.ensureDirSync(src_dir)
  fs.copySync(src_dir, tar_dir, {
    filter: (from, to) => {
      return !from.includes('/main.css')
    }
  })

  fs.ensureFileSync(src_dir + '/main.css')
  const css_o = fs.readFileSync(src_dir + '/main.css')
  const postcss_opt = {from: src_dir + '/main.css', to: tar_dir + '/main.css'}

  const r = await postcss([postcss_nested, unocss, cssnano]).process(css_o, postcss_opt)
  fs.outputFileSync(tar_dir + '/main.css', r.css)
}

switch (process.argv[2]) {
  case 'md':
    build_md()
    break
  case 'asset':
    build_asset()
    break
  case 'layout':
    build_layout()
    break
  case 'full':
    fs.outputJSONSync('./_pages/pageinfo.json', [])
    fs.removeSync('./docs')
    build_md()
    build_layout()
    build_asset()
    break
  default:
    console.log('you gave wrong command')
}