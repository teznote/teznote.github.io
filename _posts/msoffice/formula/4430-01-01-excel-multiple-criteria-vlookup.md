---
layout: post
title: "VLOOKUP: 두가지 이상 검색기준으로 VLOOKUP 검색 방법"
updated: 2023-04-23
categories: [excel_formula]
tags: [msoffice,excel,formula,choose]
---

## Helper 열을 이용한 방법

![그림00](/img/msoffice/formula/formula-4430-01.png)

```excel
= VLOOKUP( 검색값1&검색값2, 검색범위, 열번호, false )
```
{:.excel}

& 연산자 또는 CONCATENATE 함수로 두 열을 묶은 새로운 Helper 열을 만들어서, Helper 열을 기준으로 검색하는 방법이다.

## 배열수식을 이용한 방법

![그림01](/img/msoffice/formula/formula-4430-02.png)

```excel
{= VLOOKUP( 검색값1&검색값2, CHOOSE( {1, 2}, 검색기준열1&검색기준열2, 검색대상열 ), 2, false )}
```

수식 앞뒤의 중괄호는 실제 입력하는 것이 아닌 **배열수식**으로 입력했을 때 나오는 표시를 그대로 표현한 것으로 위 수식이 배열수식으로 입력되어있다는 뜻이다.

CHOOSE 함수의 첫번째 인수를 {1, 2} 와 같은 형태로 두면, 두번째 인수부터 지정된 범위들을 모아서 가상의 범위를 만드는데, 이 가상의 범위를 대상으로 VLOOKUP 검색을 한다고 생각하면 된다.

Helper 열 방식과 마찬가지로, & 연산자 대신 CONCATENATE 함수를 사용해도 된다.

## INDEX, MATCH 함수를 이용한 방법

VLOOKUP 대신 사용할 수 있는 INDEX, MATCH 로도 두가지 이상 조건 검색을 할 수 있다. 이에 대해서는 [별도 포스팅](/post/excel-index-match-for-vlookup-alternative)을 참고하기 바란다.