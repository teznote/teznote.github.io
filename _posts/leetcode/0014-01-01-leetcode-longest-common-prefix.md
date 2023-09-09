---
layout: post
title: "14. Longest Common Prefix"
updated: 2023-09-09
tags: leetcode
---

## 문제

[https://leetcode.com/problems/longest-common-prefix/](https://leetcode.com/problems/longest-common-prefix/)

여러 단어들이 주어졌을 때, 앞에서부터 각 단어들의 공통에 해당하는 문자들을 추려서 리턴하는 문제다.

예를들어 "flower", "flow", "flight" 이라는 단어가 주어졌다면, 앞에서부터 공통된 문자들인 "fl" 을 리턴해야 한다.

## 풀이

쉽게 생각할 수 있는 방법은 모든 단어들의 첫번째 문자부터 모두 같은지를 비교해보는 방식일 것이다.

```py
# compare chars -> 40ms
def longestCommonPrefix(self, strs: List[str]) -> str:
    a = ''
    for xs in zip(*strs):
        if all(xs[0] == x for x in xs):
            a += xs[0]
        else:
            break
    
    return a
```
{:.python}

zip 함수로 모든 단어들의 문자들을 순서대로 꺼내온다. 이를 all 함수를 사용하여 모두 같은지를 판별하는 방식이다.

다만 다른 LeetCode 풀이들을 보면 가장 많이 추천하는 방식은, strs 를 미리 정렬하고, 제일 앞과 뒤 단어만을 비교해보는 방식이었다.

```py
# compare chars 2 -> 43ms
def longestCommonPrefix(self, strs: List[str]) -> str:
    strs = sorted(strs)

    a = ''
    for x, y in zip(strs[0], strs[-1]):
        if x == y:
            a += x
        else:
            break

    return a
```
{:.python}

포털 검색창에서 많이 볼 수 있는 자동완성을 구현하는 데 있어 가장 기본이 되는 자료구조인 Trie 자료구조 를 사용할 수도 있다.

```py
# trie -> 51ms
def longestCommonPrefix(self, strs: List[str]) -> str:
    class Node:
        def __init__(self, key='', data=None):
            self.key = key
            self.data = data
            self.children = {}

    head = Node()

    for word in strs:
        n = head
        for x in word:
            n = n.children.setdefault(x, Node(x))
        else:
            n.data = word

    a, n = '', head
    while len(n.children) == 1 and n.data is None:
        n = list(n.children.values())[0]
        a += n.key
    return a
```
{:.python}

Trie 그래프의 각 노드를 나타내는 Node 클래스를 정의하였다. key 속성에는 어떤 문자인지를, data 속성에는 만일 어떤 단어의 끝부분에 해당하는 노드라면 해당 단어를, children 속성에는 다음 노드의 위치를 넣도록 하였다.

주어진 단어들이 담긴 strs 리스트를 word 로 순회, 다시 word 를 x 로 순회하면서, 문자 x 를 Trie 에 삽입 한다.

Trie 가 완성되었다면, Trie 를 공통문자에 해당되는 부분까지만 탐색 (children 요소 개수 1 개 이면서, 단어의 끝이 아닐 때까지만) 하고 그 결과를 리턴하는 구조다.
