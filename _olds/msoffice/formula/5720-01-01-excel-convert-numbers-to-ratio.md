---
layout: post
title: "TEXT: 두 숫자를 비율 (Ratio) 로 표현하기"
updated: 2021-08-17
categories: [excel_formula]
tags: [excel,formula,text,gcd,substitute]
---

## 두 숫자를 비율로 표현

보통 비율을 표현할 때 "X : Y" 와 같은 형태로 표현하고는 한다. 아래부터는 주어진 두 숫자가 있을 때, 그 비율을 표현해주는 함수식들이다.

## TEXT 함수 사용

![그림00](/img/msoffice/formula/formula-5720.png)

```excel
= SUBSTITUTE( TEXT( 숫자1/숫자2, "#/######"), "/", " : " )
```
{:.excel}

두 숫자를 순서대로 `숫자1`, `숫자2` 부분에 넣어서 사용하면 적당한 정수 비율로 표시해준다. TEXT 함수는 2 번째 인수에 지정한 셀서식에 맞춰 숫자를 문자로 표현해주는 함수로, 셀서식을 `#/######`와 같은 식으로 지정하면 분수식으로 표현된다. 자세한 셀서식 규칙은 [MS오피스 도움말](https://support.microsoft.com/ko-kr/office/%ec%88%ab%ec%9e%90-%ec%84%9c%ec%8b%9d%ec%9d%84-%ec%82%ac%ec%9a%a9%ec%9e%90-%ec%a7%80%ec%a0%95%ed%95%98%eb%8a%94-%ec%a7%80%ec%b9%a8-c0a1d1fa-d3f4-4018-96b7-9c9354dd99f5?ui=ko-kr&rs=ko-kr&ad=kr)을 참고하면 된다.

분수식 표현에는 "/" 기호가 들어가는데, 최종적으로 이를 SUBSTITUTE 함수로 ":" 로 변환하면 된다. (위 함수식에는 보기에 좋도록 ":" 기호 양 옆에 공백도 추가하였다.)

## GCD 함수 사용

두 숫자의 최대공약수를 구하는 GCD 함수로도 비율을 표현할 수 있다.

```excel
= 숫자1 / GCD(숫자1, 숫자2) & " : " & 숫자2 / GCD(숫자1, 숫자2)
```
{:.excel}

하지만 위 함수식은 TEXT 함수에 비해, 숫자를 여러번 적용해야 해서 불편하고, 또한 소수점이 포함된 숫자의 비율은 계산할 수 없다는 제약이 있다. 위 엑셀 예시에서의 0.07, 0.35 를 함수식에 넣어보면 알 수 있다.