---
layout: page
title: Tez'Note 블로그 빌더 개발노트 02 - 포스팅 빌드 코드
description: 마크다운 형식의 포스팅을 Html 을 거쳐 Json 으로 변환하는 코드 구현
updated: 2023-11-29
tags: dev
---

## 빌드 구분

`build.js` 에 빌드 관련된 내용을 코딩을 하다보니 크게는 두가지 빌드를 구현해야 했었다.

첫째는 마크다운 형식의 포스팅을 템플릿 엔진 통해 Html 파일로 변환하고 이를 Json 으로 바꿔 결과물로 저장하는 빌드이고, 둘째는 웹페이지의 껍데기가 되는 레이아웃과 CSS 를 빌드 하는 것이다.

우선 첫번째 빌드부터 구현을 하기로 했다.

## 모듈 import

마크다운을 파싱하기 위해 필요한 모듈을 아래와 같이 터미널에서 설치한다.

```bash
npm i -D fast-glob fs-extra markdown-it highlight.js html-minifier gray-matter liquidjs
```

프로젝트 루트 폴더에 `build.js` 파일을 생성하고 모듈을 사용하기 위한 import 구문을 코딩한다.

```js
// build.js
import fg from 'fast-glob'
import fs from 'fs-extra'
import matter from 'gray-matter'
import yaml from 'js-yaml'
import { Liquid } from 'liquidjs'
import { minify } from 'html-minifier'
import hljs from 'highlight.js'
import markdownIt from 'markdown-it'
```

대략적으로 살펴보면, [fast-glob](https://github.com/mrmlnc/fast-glob#readme) 은 glob 패턴을 사용하여, 로컬에 저장된 파일들을 경로를 배열 형식으로 리턴하는 모듈이다. 마크다운 포스팅들을 읽어들이는 용도로 쓸 예정이다.

[fs-extra](https://github.com/jprichardson/node-fs-extra) 는 [Node.JS](https://nodejs.org/en) 의 빌트인 모듈인 fs 를 보다 편리하게 개선한 모듈이라 보면 된다.

[gray-matter](https://github.com/jonschlinkert/gray-matter) 는 마크다운이나, 템플릿 html 의 상단에 포함되어있는 프론트매터와 그 아래의 콘텐츠를 각각 읽어서 각각을 오브젝트 형식으로 리턴하는 모듈이다.

[js-yaml](github.com/nodeca/js-yaml#readme) 은 비록 npm 으로 설치하지는 않았으나 gray-matter 설치를 하면 같이 사용할 수 있는 모듈로 Yaml 형식의 데이터를 파싱하여 오브젝트 형식으로 리턴하는 모듈이다.

[liquidjs](https://liquidjs.com/) 는 [Jekyll](http://jekyllrb-ko.github.io/) SSG 에서 사용되는 템플릿 엔진으로 익숙하기 때문에 사용하였다. 마크다운 파싱 후, 파싱된 html 코드 앞뒤로 html 덧붙이기 위해 사용하였다.

[html-minifier](https://github.com/kangax/html-minifier) 는 이름에서 알 수 있듯 빌드된 html 을 마지막으로 압축하기 위해 사용하는 모듈이다.

[highlight.js](https://highlightjs.org/) 는 