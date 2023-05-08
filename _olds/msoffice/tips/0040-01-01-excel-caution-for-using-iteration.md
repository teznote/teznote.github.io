---
layout: post
title: "Excel: 반복계산으로 순환참조를 의도적으로 사용할 때 주의할 점"
updated: 2021-08-13
categories: [msoffice_tips]
tags: [msoffice,excel,iteration]
---

## 순환참조 사용

엑셀에서 순환참조를 사용하면 원래 에러를 발생시키지만, 메뉴에서 "옵션" > "수식" > "반복 계산 사용" 을 설정하면 일정한 횟수를 반복적으로 계산하여 방정식을 풀 듯 해답을 구하게 할 수도 있다.

하지만 반복계산을 통한 의도적인 순환참조는 되도록 사용하지 않는 것이 좋다. 계산 Logic 자체가 이해하기 어렵다는 점도 있겠지만, 무엇보다도 순환참조로도 해답을 구할 수 없는 경우가 있음에도 마치 해답을 구한 것으로 착각하게 만든다는 점이 문제이다.

## 순환참조 반복계산 문제

예를들어 아래는 의도적인 순환참조를 구현하고 있는데, 위 수식은 해답을 구할 수 없는 경우를, 아래 경우는 해답을 구할 수 있는 경우를 나타내고 있다.

![그림00](/img/msoffice/tips/tips-0040.png)

엑셀은 반복 계산을 하다가 최대 반복 계산 횟수를 넘기면 그냥 그대로 멈춰버린다. 위 그림의 왼쪽 예시도 200 까지만 반복하다가 그냥 멈춰버린 것이다. 엑셀 대안 프로그램인 [리브레오피스](https://ko.libreoffice.org/)의 칼크는 이 경우 에러를 내보이지만 엑셀은 그런 거 없다.

일반적으로 순환참조를 사용할 때에는 위처럼 수식이 단순한 경우는 거의 없다. 엑셀 스스로 방정식을 푸는 것을 기대하면서 복잡한 참조와 수식을 구성하는 경우가 많은데, 의도적으로 순환참조를 사용했다면 **제대로 해답을 구할 수 있는 순환참조인지 F9 키를 계속 눌러 확인**하는 것이 좋다.

해답을 구할 수 없는 경우에는 F9 키를 누를 때마다 계속해서 반복계산이 들어가므로 숫자가 계속 변하는 것을 볼 수 있다.