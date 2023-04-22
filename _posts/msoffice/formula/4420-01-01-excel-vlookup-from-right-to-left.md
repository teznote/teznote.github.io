---
layout: post
title: "VLOOKUP,CHOOSE: 오른쪽열 기준으로 보다 왼쪽열 내용 VLOOKUP 검색"
updated: 2023-04-23
categories: [excel_formula]
tags: [msoffice,excel,formula,vlookup,choose]
---

## CHOOSE 함수로 가상범위 생성

![그림01](/img/msoffice/formula/formula-4420.png)

```excel
= VLOOKUP( 검색값, CHOOSE( {1, 2}, 검색기준열, 검색대상열 ), 2, FALSE )
```
{:.excel}

CHOOSE 는 본래 첫번째 인수에 번호 n 을 지정하면, 뒤 이어진 인수들 중에서 n 번째 인수를 반환하는 함수다. 그러나 위 함수식처럼 `{1, 2}` 라는 표현이 들어가면, 뒤이어진 인수들(여기서는 `검색기준열`과 `검색대상열`)로 가상의 범위를 만들어낸다. 이 가상의 범위를 바탕으로 VLOOKUP 함수를 사용한다고 보면 된다.

## INDEX, MATCH 함수조합 사용

왼쪽열 검색은 INDEX, MATCH 함수조합이 더 편하다고 생각한다. [별도 포스팅](/post/excel-index-match-for-vlookup-alternative)을 참고하자.