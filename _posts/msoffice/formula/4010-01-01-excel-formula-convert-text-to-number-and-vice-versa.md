---
layout: post
title: "TEXT: 숫자를 텍스트 형식의 숫자로, 또는 반대로 변환"
updated: 2023-04-22
categories: [excel_formula]
tags: [msoffice,excel,formula,text]
---

## 실제 숫자를 텍스트 형식으로 변환

```excel
= 셀 & ""
= TEXT( 셀, "셀서식" )
```
{:.excel}

`셀` 부분에 실제 숫자가 담겨있는 셀을 지정하면 되는데, TEXT 함수를 사용하면 `셀서식`을 지정할 수 있어 더 정교한 형태로 결과물을 얻을 수 있다. 예를들어 `= TEXT( 123, "000000" )` 과 같이 사용하면 된다.

구체적인 셀서식 지정 방법은 [오피스 도움말](https://support.microsoft.com/ko-kr/office/%ec%88%ab%ec%9e%90-%ec%84%9c%ec%8b%9d%ec%9d%84-%ec%82%ac%ec%9a%a9%ec%9e%90-%ec%a7%80%ec%a0%95%ed%95%98%eb%8a%94-%ec%a7%80%ec%b9%a8-c0a1d1fa-d3f4-4018-96b7-9c9354dd99f5?ui=ko-kr&rs=ko-kr&ad=kr)을 참고하자.

## 텍스트 형식의 숫자를 실제 숫자로 변환

```excel
= 셀 + 0
= 셀 * 1
```
{:.excel}
