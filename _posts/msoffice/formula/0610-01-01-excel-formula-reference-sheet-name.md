---
layout: post
title: "CELL: Sheet 이름을 불러오는 함수식"
updated: 2023-04-22
categories: [excel_formula]
tags: [msoffice,excel,formula,cell,find,mid]
---

## Sheet 이름 불러오기

![그림00](/img/msoffice/formula/formula-0610.png)

```excel
= MID( CELL( "filename", 셀 ), FIND( "]", CELL( "filename", 셀 )) + 1, 256 )
```
{:.excel}

`셀` 부분에는 이름을 불러오길 원하는 Sheet 안의 아무 셀이나 지정하면 된다. Sheet 이름을 바뀌면 함수식의 결과도 알아서 자동으로 바뀐다.

주의할 점이 있다. **반드시 파일이 저장된 상태에서 함수식을 사용해야 제대로 작동**한다. 예를들어 새로 엑셀 문서를 만들어서 아직 한번도 저장도 안한 상태에서 위 함수를 사용하면 에러를 발생시킨다. 만일 에러가 발생했다면 일단 저장부터 하고 F9 키를 눌러 재계산을 해줘야 한다.

CELL 함수의 첫번째 인수를 "filename" 이라 지정하면 폴더경로, 파일이름, Sheet 이름 등을 모두 포함한 셀의 정보를 반환한다. 따라서 아직 한번이라도 저장을 안한 갓 만든 엑셀 문서라면, 파일정보가 있을 리 없으므로 에러를 발생시키게 되는 것이다. CELL 함수가 반환한 정보에서 FIND, MID 함수를 사용하여 Sheet 이름만 가져오는 구조이다.

## VBA 사용자함수로 구현

```vb
Function SheetName(rCell As Range) As String
    Application.Volatile
    SheetName = rCell.Parent.Name
End Function
```
{:.vba}

```excel
= SheetName( 셀 )
```
{:.excel}

이 역시 `셀` 부분에는 Sheet 이름을 얻고자 하는 Sheet 의 아무 셀이나 지정하면 된다. CELL 함수를 사용한 함수식과는 다르게 파일로 저장하지 않은 상태에서도 사용이 가능하다.
