---
layout: post
title: "VLOOKUP: 두가지 이상 검색기준으로 VLOOKUP 검색 방법"
updated: 2021-08-04
tags: [msoffice,excel_formula]
---

## 두가지 이상 기준 VLOOKUP 검색

VLOOKUP 의 함수식은 아래와 같다.

```excel
= VLOOKUP( 검색값, 검색범위, 열번호, false )
```
{:.excel}

보통은 `검색값`을 하나 지정할 수 있지만, 둘 이상의 `검색값`을 And 로 만족하는 VLOOKUP 검색을 할 수 있는 방법이 있다.

## 함수식 사용법

### 1. Helper 열을 이용한 방법

![그림00](data:image/png;base64,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)

```excel
= VLOOKUP( 검색값1&검색값2, 검색범위, 열번호, false )
```
{:.excel}

별도의 Helper 열 (위 그림에서는 B 열) 을 만들어서, Helper 열까지 포함한 `검색범위`를 지정한 뒤 VLOOKUP 검색을 하면 있다.

원하는 `검색값` 들을 & 연산자로 묶어뒀다. & 연산자와 동일한 기능을 하는 CONCATENATE 함수를 사용해도 되며, 응용하면 세가지 이상 조건으로도 검색이 가능하다.

### 2. 배열수식을 이용한 방법

![그림01](data:image/png;base64,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)

```excel
{= VLOOKUP( 검색값1&검색값2, CHOOSE( {1, 2}, 검색기준열1&검색기준열2, 검색대상열 ), 2, false )}
```
{:.excel}

**배열수식**으로 입력해야 한다.

Helper 열이 필요없는 대신 수식은 복잡해졌는데, CHOOSE 함수의 첫번째 인수를 {1, 2} 와 같은 형태로 두면, 두번째 인수부터 지정된 범위들을 모아서 가상의 범위를 만든다. 이 가상의 범위를 대상으로 VLOOKUP 검색한다고 보면 된다.

Helper 열 방식과 마찬가지로, & 연산자 대신 CONCATENATE 함수를 사용해도 되며, 세가지 이상의 조건으로도 검색이 가능하다.

## INDEX, MATCH 함수를 이용한 방법

VLOOKUP 대신 사용할 수 있는 INDEX, MATCH 로도 두가지 이상 조건 검색을 할 수 있다. 이에 대해서는 [별도 포스팅](/post/excel-formula-index-match-for-vlookup-alternative)을 참고하기 바란다.