---
layout: post
title: "Excel: 3 차원 민감도 분석 템플릿"
updated: 2021-08-17
categories: [msoffice_tips]
tags: [msoffice,excel,data_table,template]
---

## 3 차원 민감도 분석

"민감도 분석" 은 독립변수의 미세한 변화에 따라 종속변수가 얼마나 변화하는지를 살펴보는 분석법이다. 엑셀로 민감도 분석을 수행할 땐 "데이터" > "가상 분석" > "데이터 표" 기능을 사용하고는 하는데, 아래처럼 최대 2 개의 독립변수를 허용한다.

![그림00](/img/msoffice/tips/tips/0100-00.png)

하지만 독립변수들의 변화를 Case 로 미리 만들어두면 "데이터 표" 기능으로 3 개 이상의 독립변수 민감도 변화를 분석할 수 있다. 이른바 3차원 민감도 분석인데 아래와 같다.

![그림01](/img/msoffice/tips/tips-0100-01.png)

- [three-dimensional-sensitivity-analysis.xlsx](/res/three-dimensional-sensitivity-analysis.xlsx)
{:.file}

위 파일에서 가장 중요한 부분은 M ~ Q 열에 위치한 Case 이다. "환율", "이자율", "법인세율" 이라는 3 가지 독립변수의 변화를 미리 Case 화 하였다. 3개 독립변수를 Case 로 만들어뒀기 때문에 사실상 독립변수는 1개 뿐이다. Case 를 잘 활용하면 4 개 이상의 독립변수로도 분석이 가능할 것이다.

해당 파일에는 이미 "데이터 표" 가 적용되어 있지만 새롭게 적용하고 싶을 때는 M5 ~ N32 셀을 지정한 뒤 "데이터 표" 기능을 실행한다. "행 입력 셀" 은 빈칸으로 그대로 두고 "열 입력 셀" 에 M3 셀을 지정하면 된다.

사전에 "데이터 표" 기능을 알고있어야 이 템플릿이 어떤 식으로 작동하는지 쉽게 이해할 수 있을 것이다.