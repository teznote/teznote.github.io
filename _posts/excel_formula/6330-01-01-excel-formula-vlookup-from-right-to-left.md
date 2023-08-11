---
layout: post
title: "VLOOKUP,CHOOSE: 오른쪽열 기준으로 보다 왼쪽열 내용 VLOOKUP 검색"
updated: 2021-05-03
tags: [excel_formula]
---

VLOOKUP 의 기본 함수식은 아래와 같다.

```excel
= VLOOOKUP( 검색값, 검색범위, 열번호, false )
```
{:.excel}

VLOOKUP 함수는 `검색범위`를 넓게 지정해주면, 가장 왼쪽 열이 `검색기준열`로 고정되고, `열번호`만큼 오른쪽으로 떨어진 열이 `검색대상열`이 되어 검색을 수행한다. 이 때문에 보통은 왼쪽을 기준으로 보다 오른쪽에 있는 열만 검색이 가능하다.

하지만 오른쪽열을 기준으로 보다 왼쪽열을 검색할 수 있는 방법이 있어 이를 소개한다.

## CHOOSE 함수로 가상범위 생성

![그림00](/img/excel_formula/formula-6330-00.png)

```excel
= VLOOKUP( 검색값, CHOOSE( {1, 2}, 검색기준열, 검색대상열 ), 2, false )
```
{:.excel}

CHOOSE 는 본래 첫번째 인수에 번호 n 을 지정하면, 뒤 이어진 인수들 중에서 n 번째 인수를 반환하는 함수다. 그러나 위 함수식처럼 `{1, 2}` 라는 표현이 들어가면, 뒤이어진 인수들(여기서는 `검색기준열`과 `검색대상열`)로 가상의 범위를 만들어낸다. 이 가상의 범위를 바탕으로 VLOOKUP 을 사용한다고 이해하면 된다.

## INDEX, MATCH 함수조합 사용

INDEX, MATCH 함수조합을 사용하면 보다 손쉽게 왼쪽열 검색을 할 수 있다. 이에 대해서는 [별도 포스팅](/post/excel-formula-index-match-for-vlookup-alternative)을 참고하기 바란다.