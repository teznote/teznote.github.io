// uno.config.ts
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup
} from 'unocss'
import fs from 'fs-extra'

export default defineConfig({
  preflights: [
    // {
    //   getCSS: ({ theme }) => '',
    // },
    {
      getCSS: ({ theme }) => fs.readFileSync('./node_modules/@unocss/reset/eric-meyer.css', 'utf-8'),
    },
  ],
  content: {
    filesystem: [
      './_layouts/**/*.html',
    ]
  },
  shortcuts: [
    // ...
  ],
  theme: {
    // colors: {
    //   // ...
    // },
    fontFamily: {
      // sans: 'NanumSquareRound, sans-serif',
      // mono: 'Hack, NanumSquareRound, monospace',
      sans: 'D2Coding, monospace',
      mono: 'D2Coding, monospace',
    },
  },
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
        // ...
      },
      cdn: 'https://esm.sh/'
    }),
    presetTypography(),
    presetWebFonts({
      fonts: {
        // ...
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})
