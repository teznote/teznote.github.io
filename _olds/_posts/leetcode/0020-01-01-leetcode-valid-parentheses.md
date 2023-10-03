---
layout: post
title: "20. Valid Parentheses"
updated: 2023-09-10
tags: leetcode
---

## 문제

[https://leetcode.com/problems/valid-parentheses/](https://leetcode.com/problems/valid-parentheses/)

주어진 대중소 괄호 문자열이 올바른 형태로 이뤄져있는지를 판별하여 리턴하는 문제다.

예를들면 "(){}[]" 는 올바른 형태이며, "[)"는 올바르지 않은 형태이다.

## 풀이

문자열을 계속 순회하면서 올바른 괄호쌍을 제거해가는 방법을 생각할 수 있다. 더 이상 제거가 불가능할 때 문자열에 아무것도 남아있지 않다면 최초에 주어진 문자열이 올바른 형태로 이뤄져있다고 볼 수 있다.

```py
# remove valid pairs -> 54ms
def isValid(self, s: str) -> bool:
    p = ''
    while p != s:
        p = s
        s = s.replace('[]', '').replace('{}', '').replace('()', '')
    
    return s == ''
```
{:.python}

replace 함수로 올바른 괄호쌍을 계속 제거한다. 대신 정규식을 활용할 수도 있는데 아래와 같다.

```py
# remove valid pairs 2 -> 44ms
import re

def isValid(self, s: str) -> bool:
    p = ''
    while p != s:
        p = s
        s = re.sub(r'\(\)|\{\}|\[\]', '', s)

    return s == ''
```
{:.python}

괄호쌍을 제거하는 대신 Stack 자료구조를 사용할 수도 있다.

s 를 순회하면서 여는괄호가 나온다면 Stack 에 저장해두고, 닫는괄호가 나온다면 Stack 최후미에 있는 괄호를 pop 하며 올바른 괄호쌍인지 비교해보는 방식이다.

s 순회를 마쳤을 때, Stack 이 비어있다면 s 는 올바른 형태의 괄호쌍인 것으로 판별하면 된다.

```py
# stack -> 44ms
def isValid(self, s: str) -> bool:
    st = []
    h = {']': '[', '}': '{', ')': '('}

    for x in s:
        if x in h:
            if not(st and st.pop() == h[x]):
                return False
        else:
            st.append(x)
    
    return st == []
```
{:.python}

닫힌괄호가 나왔을 때 어느 것이 올바른 괄호쌍인지 알 수 있도록 미리 h 딕셔너리를 상정한다.

s 를 x 로 순회하면서, x 가 h 에 속한다면 (즉, 닫힌괄호라면) 스택 st 에서 최후미 요소를 pop 하여 비교한다. 올바른 쌍이 아니라면 바로 False 를 리턴한다.

순회를 다 마치고 st 가 비어있는지 아닌지를 리턴하는 구조다.
