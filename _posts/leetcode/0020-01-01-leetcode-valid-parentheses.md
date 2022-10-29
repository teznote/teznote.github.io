---
layout: post
title: "20. Valid Parentheses"
updated: 2022-03-29
categories: [leetcode_easy]
tags: [python,leetcode,easy,string,stack]
---

## 문제

[https://leetcode.com/problems/valid-parentheses/](https://leetcode.com/problems/valid-parentheses/)

소/중/대 괄호만으로 나열된 s 문자열이 있을 때, 열리고 닫힌 괄호들이 모두 올바르게 쌍을 이뤘는지를 판별하여 리턴하는 문제다.

문제에서 든 예시를 보자면, `(){}[]` 은 모든 괄호쌍이 올바른 문자열이지만, `(]` 는 올바르지 못한 문자열이다.

## 반복문으로 올바른 괄호쌍 제거

```python
import re

def isValid(self, s: str) -> bool:
    p = ''

    while p != s:
        p = s
        s = re.sub(r'\(\)|\{\}|\[\]', '', s)

    return s == ''
```
{:.python}

정규식을 사용하여 s 문자열에서 올바른 괄호쌍을 계속 제거해간다.

더 이상 제거할 수 없을 때, s 문자열이 비어있어야 s 는 처음부터 올바른 괄호쌍으로 이뤄졌었다는 의미가 된다.

## 스택 (Stack) 사용

```python
def isValid(self, s: str) -> bool:
    st = []
    d = {')': '(', '}': '{', ']': '['}

    for x in s:
        if x in d:
            if not st or st.pop() != d[x]:
                return False
        else:
            st.append(x)

    return st == []
```
{:.python}

스택 (Stack) 자료형으로 사용할 stack 리스트와, 대/중/소 각각 올바른 괄호쌍이 `{닫힌괄호: 열린괄호, ... }` 형태로 입력되어있는 d 딕셔너리를 생성한다.

s 문자열을 x 로 순회하면서, 열린괄호라면 stack 에 차례로 삽입하고, 닫힌괄호라면 stack 의 가장 마지막 열린괄호를 가져와서 올바른 괄호쌍인지 비교한다.

만일 x 가 닫힌괄호인데 stack 이 비어있거나, 올바른 괄호쌍이 아니라면 즉시 False 를 리턴한다. 그리고 s 순회를 마친 이후에는 stack 이 비어있어야 s 는 올바른 괄호쌍이었다고 볼 수 있다.
