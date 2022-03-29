---
layout: default
title: "20. Valid Parentheses"
updated: 2022-03-29
tags: [leetcode,seq]
---

## 문제

[https://leetcode.com/problems/valid-parentheses/](https://leetcode.com/problems/valid-parentheses/)

소/중/대 괄호만으로 나열된 s 문자열이 있을 때, 열리고 닫힌 괄호들이 모두 올바르게 쌍을 이뤘는지를 판별하는 문제다.

문제에서 든 예시를 보자면, `(){}[]` 은 모든 괄호쌍이 올바른 문자열이며, `(]` 는 올바르지 못한 문자열이다.

## Remove Valid Pairs with Regex

```python
def isValid(self, s: str) -> bool:
    import re
    
    p = ''
    while p != s:
        p, s = s, re.sub(r'\(\)|\{\}|\[\]', '', s)
    
    return s == ''

# 수행시간: 317 ms
```
{:.python}

p 라는 임시변수를 상정하여 s 를 대입시킨 뒤, s 에서 정규식으로 올바른 괄호쌍을 제거한다. 만일 p == s 라면 더 이상 제거할 괄호쌍이 없다는 의미이므로 반복문을 종료한다.

마지막에 s 문자열이 비어있다면 모든 괄호가 올바른 쌍을 이뤘다는 뜻이다.

## Remove Valid Pairs with Replace Function

```python
def isValid(self, s: str) -> bool:
    p = ''
    while p != s:
        p, s = s, s.replace('()', '').replace('{}', '').replace('[]', '')
        
    return s == ''

# 수행시간: 64 ms
```
{:.python}

정규식 대신 replace 함수를 세번 사용했다. 더 비효율일거라 생각했지만 오히려 정규식 방식보다 속도가 빨랐다.

## Stack

```python
def isValid(self, s: str) -> bool:
    stack = []
    d = {')': '(', '}': '{', ']': '['}
    
    for x in s:
        if x in d:
            if not stack or d[x] != stack.pop():
                return False
        else:
            stack.append(x)
    
    return stack == []

# 수행시간: 32 ms
```
{:.python}

Stack 자료구조를 사용했다. s 문자열을 순회하면서, 열린괄호가 나온다면 Stack 에 저장을 하고, 닫힌괄호라면 Stack 의 마지막 요소를 꺼내와서 올바른 괄호쌍인지를 비교한다. 만일 올바르지않은 괄호쌍이라면 즉시 False 를 리턴한다.

s 문자열을 보두 순회하였을 때, Stack 이 비어있다면 모든 괄호가 올바른 쌍을 이뤘다는 뜻이다.