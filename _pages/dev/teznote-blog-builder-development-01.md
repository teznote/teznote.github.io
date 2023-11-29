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

## 빌드 코드

### 1. 모듈 import

마크다운을 파싱하기 위해 필요한 모듈을 아래와 같이 터미널에서 설치한다.

```bash
npm i -D fast-glob fs-extra markdown-it highlight.js html-minifier gray-matter liquidjs
```

프로젝트 루트 폴더에 `build.js` 파일을 생성하고 모듈을 사용하기 위한 import 구문을 코딩한다.

```js
// build.js


```