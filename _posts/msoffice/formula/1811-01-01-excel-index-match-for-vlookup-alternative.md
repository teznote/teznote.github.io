---
layout: post
title: "INDEX,MATCH: VLOOKUP 대신 사용할 수 있는 보완 함수조합"
updated: 2023-04-23
categories: [excel_formula]
tags: [msoffice,excel,formula,index,match,exact]
---

## INDEX, MATCH 기본 사용

![그림01](/img/msoffice/formula/formula-1811-01.png)

```excel
= VLOOKUP( 검색값, 검색범위, 열번호, false)
= INDEX( 검색대상열, MATCH( 검색값, 검색기준열, 0 ))
```
{:.excel}

VLOOKUP 함수는 `검색범위`를 넓게 지정하여, 가장 왼쪽열을 `검색기준열`로 삼고, `열번호`만큼 오른쪽으로 떨어진 열을 `검색대상열`로 삼지만, INDEX, MATCH 함수는 `검색기준열`과 `검색대상열`을 독립적으로 각각 지정한다. 따라서, INDEX, MATCH 조합은 오른쪽으로부터의 검색도 쉽고, `검색범위`의 열삽입/삭제에 영향을 받지 않는다.

## 함수조합 응용

*1. 오른족열을 기준으로 보다 왼쪽열을 검색*

![그림02](/img/msoffice/formula/formula-1811-02.png)

사실 오른쪽 기준으로 보다 왼쪽을 검색하는 것은 다른 함수의 도움을 받아 VLOOKUP 함수로도 구현할 수는 있다. [별도 포스팅](/post/excel-vlookup-from-right-to-left)을 참고하자.

*2. 두가지 이상 조건으로 검색*

![그림03](/img/msoffice/formula/formula-1811-03.png)

```excel
{= INDEX( 검색대상열, MATCH( 1, (검색기준열1=검색값1)*(검색기준열2=검색값2), 0 ))}
```
{:.excel}

수식 앞뒤의 중괄호는 실제입력이 아닌 **배열수식**으로 입력했을 때 보이는 중괄호를 표현한 것이다.

MATCH 함수의 두번째 인수를 보면 `(조건식)*(조건식)` 형태로 되어 있는데, 각 조건식의 결과는 true 혹은 false 이다. 엑셀은 이 값에 사칙연산을 가하면 true 는 1 로, false 는 0 으로 치환하여 계산을 한다. 모든 조건식이 true 가 되어야만 곱셈의 결과가 1 이 되는데, 이런 경우의 값을 찾도록 함수식이 구성되어 있다.

사실 VLOOKUP 함수로도 두가지 이상 조검 검색이 가능하다. [별도 포스팅](/post/excel-multiple-criteria-vlookup)을 참고하기 바란다.

*3. 면으로 검색 (VLOOKUP 과 HLOOKUP 의 혼합)*

![그림04](/img/msoffice/formula/formula-1811-04.png)

```excel
= INDEX( 검색대상범위, MATCH( 검색값, 검색기준열, 0 ), MATCH( 검색값, 검색기준행, 0 ))
```
{:.excel}

INDEX 함수 안에 MATCH 함수가 두번 나오는데, 첫번째 MATCH 함수는 열방향(세로방향)으로 검색을, 두번째는 행방향(가로방향)으로 검색을 한다고 이해하면 된다.

*4. 대/소문자 구별 검색*

![그림05](/img/msoffice/formula/formula-1811-05.png)

```excel
{= INDEX( 검색대상열, MATCH( TRUE, EXACT( 검색값, 검색기준열 ), 0 ))}
```
{:.excel}

수식 앞뒤의 중괄호는 실제입력이 아닌 **배열수식**으로 입력했을 때 보이는 중괄호를 표현한 것이다.

VLOOKUP 이나 일반적 INDEX, MATCH 함수는 대소문자를 구별하지 않는다. 이 문제를 해결한 것으로 EXACT 함수가 핵심이다. EXACT 함수의 한쪽 인수를 셀 하나로 두고, 다른쪽 인수를 범위로 두어 배열수식으로 입력하면, 일일이 대소문자 하나하나를 비교하여 완전일치 여부를 다시 배열로 반환한다. 이를 INDEX, MATCH 함수가 받아서 처리하는 구조이다.