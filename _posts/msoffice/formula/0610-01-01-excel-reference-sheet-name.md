---
layout: post
title: "CELL: Sheet 이름을 불러오는 함수식"
updated: 2021-08-05
tags: [msoffice,formula]
---

## Sheet 이름 불러오기

엑셀 Sheet 이름을 함수로 불러들일 수 있는 방법이 있다.

![그림00](/img/msoffice/formula/formula-0610.png)

```excel
= MID( CELL( "filename", 셀 ), FIND( "]", CELL( "filename", 셀 )) + 1, 256 )
```
{:.excel}

위 식에서 `셀` 부분에는 이름을 불러오길 원하는 Sheet 안의 아무 셀이나 지정하면 된다. 다른 Sheet 의 셀을 지정하면 그 다른 Sheet 의 이름을 불러온다. 그리고 Sheet 이름을 바뀌면 함수식의 결과도 알아서 자동으로 바뀐다.

사용할 땐 아래 사항에 주의해야 한다.

새로 엑셀 문서를 만들고 아직 한번도 저장을 안한 상태에서 위 함수식을 사용하면 에러가 발생한다. 에러가 발생했다면 바로 저장하고 F9 키를 눌러 수식 재계산을 해주면 된다.

즉, 반드시 한번이라도 저장된 엑셀문서에서 사용해야 한다는 것인데, 이유는 CELL 의 첫번째 인수인 "filename" 때문이다.

CELL 의 첫번째 인수를 "filename" 이라 지정하면 폴더경로, 파일이름, Sheet 이름 등을 모두 포함한 셀의 정보를 반환한다. 아직 한번이라도 저장을 안한 갓 만든 엑셀 문서라면, 파일정보가 있을 리 없으므로 에러를 발생시키게 되는 것이다. CELL 함수가 반환한 정보에서 FIND, MID 함수를 사용하여 Sheet 이름만 가져오는 구조다.

## VBA 사용자함수로 구현

VBA 로 위와 같은 기능을 하는 사용자함수를 만들 수 있다. CELL 을 사용한 함수식과는 다르게 한번도 파일로 저장안했어도 사용이 가능하다.

```vb
Function SheetName(rCell As Range) As String
    Application.Volatile
    SheetName = rCell.Parent.Name
End Function
```
{:.vba}

엑셀 화면에서 ALT + F11 을 눌러 VBA Editor 를 연 다음, "삽입" 메뉴의 "모듈" 항목을 선택하면 나오는 창에 위 코드를 입력하면 된다. 다시 엑셀로 돌아와서 아래와 같이 사용하면 된다.

```excel
= SheetName( 셀 )
```
{:.excel}

이 역시 `셀` 부분에는 Sheet 이름을 얻고자 하는 Sheet 의 아무 셀이나 지정하면 된다.