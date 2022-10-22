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

    while s != p:
        p = s
        s = re.sub(r'\(\)|\{\}|\[\]', '', s)

    return s == ''
```
{:.python}

정규식을 사용하여 s 문자열에서 올바른 괄호쌍을 계속 제거해간다.

더 이상 제거할 수 없을 때, 반복문을 탈출하며, 이 때 문자열 s 가 비어있다면, s 는 올바른 괄호쌍으로만 이뤄졌던 문자열이라는 뜻이 된다.

## 스택 사용

```python
def isValid(self, s: str) -> bool:
    stack = []
    d = {')': '(', '}': '{', ']': '['}

    for x in s:
        if x in d:
            if not stack or stack.pop() != d[x]:
                return False
        else:
            stack.append(x)

    return stack == []
```
{:.python}

스택 (Stack) 자료형을 나타낼 stack 리스트와, 대/중/소 각각 올바른 괄호쌍이 `{닫힌괄호: 열린괄호, ... }` 형태로 입력되어있는 d 딕셔너리를 상정했다.

s 문자열을 x 로 순회하면서, 만일 x 가 열린괄호라면 stack 에 저장을 하고, 닫힌괄호라면 stack 이 비어있거나, stack 에서 가장 마지막 요소를 꺼내서 올바른 괄호쌍이 아니라면, s 문자열은 올바른 괄호쌍이 아니었다는 의미이므로, 즉시 False 를 리턴한다. 올바른 괄호쌍이면 자연스롭게 stack 의 가장 최근 열린괄호가 지워진 채 다음 반복턴으로 넘어간다.

반복문을 마쳤을 때, stack 이 비어있어야 문자열 s 가 모두 올바른 괄호쌍이었다는 뜻이 된다.
