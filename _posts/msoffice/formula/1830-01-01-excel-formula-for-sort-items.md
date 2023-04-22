---
layout: post
title: "INDEX,MATCH: 원본 목록을 정렬하여 재나열하는 함수식"
updated: 2023-04-22
categories: [excel_formula]
tags: [msoffice,excel,formula,index,match,countifs,small,row]
---

## 정렬 함수식

![그림00](/img/msoffice/formula/formula-1830.png)

```excel
{= INDEX( 원본목록, MATCH( SMALL( COUNTIFS( 원본목록, "<"&원본목록 ), ROW(원본목록첫째항목상대참조) - ROW(원본목록첫째항목절대참조) + 1 ), COUNTIFS( 원본목록, "<"&원본목록 ), 0 ))}
```
{:.excel}

정렬할 때 메뉴의 "데이터" > "정렬" 기능을 사용하지 않고 함수식을 이용한 방법이다. 함수식을 사용하였기 때문에 목록이 변경될 때마다 자동으로 다시 정렬을 수행한다.

수식 앞뒤의 중괄호는 위 수식이 **배열수식**으로 입력되어있다는 표시이다. 또한 위 수식은 수식을 넣고자 하는 범위를 전부 지정하고 배열수식을 입력하는 것이 아니라, 한 개의 셀만 배열수식으로 입력하고, 그 셀을 아래로 복사해서 붙여야 한다. 위 그림으로 보자면 D9 셀에 배열수식을 입력한 뒤, D9 셀을 복사하여 아래쪽 셀들 (D10 ~ D19) 에 붙여넣기 하는 식이다.

`원본목록`은 정렬하기 원하는 목록 원본을 지정하면 된다. 모두 5 군데인데 모두 동일하게 지정하면 된다. ROW 함수는 모두 `원본목록`의 첫째항목이 위치한 셀을 지정하면 되나 하나는 상대참조, 다른 하나는 절대참조라는 것에 주의하자.

그리고 위 함수식은 오름차순 정렬로, 부등호 방향을 바꾸거나 SMALL 함수를 LARGE 함수로 바꾸면, 내림차순 정렬이 된다.

사용할 때 주의할 점이 있는데, 정렬을 원하는 **`원본목록`에 Blank 가 있거나 텍스트와 숫자가 혼재되어 있으면 오작동**하게 된다.

## 함수식 이해

COUNTIFS 함수의 두번째 인수에 특정셀이나 값이 아닌 볌위를 지정하면, 두번째 인수로 지정한 범위 안에 있는 내용들의 만족여부를 모두 검사하여 다시 배열로 반환한다. 여기서는 범위안에 있는 각각의 내용들보다 작은 값 ('<' 기호가 사용되었으므로) 의 개수를 다시 배열로 만들어 반환하게 되는 셈이다.

그리고 `ROW - ROW + 1` 함수 형태는 순서대로 1, 2, 3, ... 과 같은 숫자를 반환한다. COUNTIFS 의 결과인 배열과 차례대로의 숫자 1, 2, 3, ... 을 SMALL 함수가 받는 형태이다. 사실상 이 부분이 정렬의 핵심 기능이다.