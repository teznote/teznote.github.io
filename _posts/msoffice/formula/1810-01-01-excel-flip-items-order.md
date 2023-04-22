---
layout: post
title: "INDEX: 열에 있는 항목들을 역순으로 재나열"
updated: 2023-04-22
categories: [excel_formula]
tags: [msoffice,excel,formula,index,rows]
---

## 항목 순서 뒤집기

![그림00](/img/msoffice/excel/formula/formula-1810.png)

```excel
= INDEX( 목록범위, ROWS( 변형된목록범위 ))
```
{:.excel}

`목록범위`는 뒤집기를 원하는 원래의 항목들 범위를 지정하고, `변형된목록범위`는 `목록범위`와 범위는 동일하지만 상대/절대 참조 모양이 다르다. 변형된 참조형태로 인해 아래로 복사했을 때, ROWS 에 인수로 적용되는 범위가 달라지게 된다.

ROWS 함수는 주어진 범위의 열개수를 반환한다. 위 그림으로 보자면, C5 셀의 ROWS 값은 7 이 된다. 이를 INDEX 함수가 받아서 원래 범위의 7 번째 항목, 즉 제일 마지막 항목을 가져온다.

이제 C6 셀의 ROWS 값은 6 이 되는데, `변형된목록범위`의 상대/절대 참조 때문에 그렇게 된다. 이를 INDEX 함수가 받으면 위에서 6 번째, 아래서 두번째 항목을 가져온다.