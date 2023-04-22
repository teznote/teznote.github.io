---
layout: post
title: "Excel: Sheet 깊게 숨기기 (Very Hidden) 속성 사용하기"
updated: 2021-08-09
categories: [msoffice_tips]
tags: [msoffice,excel,very_hidden]
---

## Sheet Very Hidden 속성으로 숨기기

엑셀 Sheet 는 안보이도록 숨길 수 있는데, 보통 Sheet 탭 위에 커서를 대로 마우스 우측키를 눌러 나오는 메뉴로 숨길 수 있다. 이렇게 숨겨진 Sheet 는 다시 "숨기기 취소"를 통해 보이도록 할 수 있다.

그런데, 엑셀 Sheet 에는 한단계 더 깊게 숨길 수 있는 Very Hidden 속성을 지정할 수 있다. 이른바 "깊게 숨기기" 인데 이렇게 숨겨진 Sheet 는 엑셀 화면에서 "숨기기 취소" 를 통해 다시 나타나도록 할 수 없다. "숨기기 취소" 메뉴에도 Sheet 가 보이지 않으니, 다른 사람이 보면 애초에 숨겨져 있는 Sheet 가 있는 걸 알아차리지 못하고 그냥 넘어갈 가능성이 크다.

Sheet 를 깊게 숨기려면 VBA Editor 를 사용해야 한다.

![그림01](/img/msoffice/tips/tips-0002.png)

"프로젝트" 창에서 아무 Sheet 나 선택한 뒤, "속성" 창에 있는 Visible 속성을 바꾸면 된다. Visible 속성을 보면 옵션들 중 "Very Hidden" 옵션이 있는데 이 옵션이 깊게 숨기는 옵션이다. 나머지 "Visible" 및 "Hidden" 옵션 은 엑셀 본 화면에서 일반적으로 숨기거나 보이거나 하는 것과 동일한 옵션들이다.

참고로 만일 모든 Sheet 를 숨기려고 하면 에러가 발생한다. 엑셀은 보이는 Sheet 가 최소한 한개 이상 필요하기 때문이다.

실무에서 외부 엑셀 자료를 얻었을 때 한번쯤은 깊게 숨겨진 Sheet 가 있는지 VBA Editor 로 찾아보는 것이 좋다. 간혹 요청했던 자료 이상의 내용을 얻는 경우도 있기 때문이다.
