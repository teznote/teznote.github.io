---
layout: post
title: "RADIANS: 두 지점의 위도, 경도로 두 지점 간 거리 계산하기"
updated: 2021-08-16
categories: [excel_formula]
tags: [excel,formula,radians,acos,cos,sin]
---

## Haversine 공식

Haversine 공식이라는 것이 있다. [위키피디아](https://en.wikipedia.org/wiki/Haversine_formula) 들어가보면 구체의 두 지점간 표면 거리를 계산하는 식이다.

지구도 거의 구체에 가까우므로, 이 공식을 사용하면 두 지점의 위/경도로 두 지점 간 거리를 유추해낼 수 있다.

## 두 지점의 거리 계산

```excel
= ACOS( COS( RADIANS( 90-위도1 )) * COS( RADIANS( 90-위도2 )) + SIN( RADIANS( 90-위도1 )) * SIN( RADIANS( 90-위도2 )) * COS( RADIANS( 경도1-경도2 ))) * 6378.137
```
{:.excel}

어느 한 지점의 위도/경도를 `위도1`, `경도1`에 넣고, 다른 지점의 위도/경도를 `위도2`, `경도2`에 넣어 계산하면 된다. 결과로 구해지는 수치는 Km 단위이다.

실제로 들어맞는지 알아보자. [구글지도](https://www.google.com/maps)에서 "서울 시청"을 검색하고, 서울 시청을 나타내는 아이콘에 커서를 대고 오른쪽 키를 눌러보면 위도/경도를 구할 수 있다.

서울 시청은 (37.56663713551495, 126.97783642997813) 이고, 서울 중구청은 (37.56395398258974, 126.99756242676875) 이다. 이 결과를 위 식에 대입하면 서울 시청과 서울 중구청 사이의 거리는 약 1.766 Km 로 계산이 된다.

[네이버지도](https://map.naver.com/)에서 서울 시청과 서울 중구청 사이의 거리를 계산해봤다. 계산한 결과와 거의 동일하다.

![그림00](/img/msoffice/formula/formula-5110.png)