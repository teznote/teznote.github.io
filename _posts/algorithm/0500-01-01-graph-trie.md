---
layout: post
title: "[Graph] 문자열 Trie 구조"
updated: 2023-09-09
tags: algorithm
---

## LeetCode: Longest Common Prefix

[https://leetcode.com/problems/longest-common-prefix/](https://leetcode.com/problems/longest-common-prefix/)

여러 단어들이 주어졌을 때, 앞에서부터 각 단어들의 공통에 해당하는 문자들을 추려서 리턴하는 문제다.

예를들어 "flower", "flow", "flight" 이라는 단어가 주어졌다면, 앞에서부터 공통된 문자들인 "fl" 을 리턴해야 한다.

LeetCode 풀이들을 보면 가장 많이 풀어내는 방법은, 단어들을 정렬한 다음, 가장 첫 단어와 마지막 단어의 문자를 비교하여 리턴하는 방법이다.

하지만 여기서는 포털 검색창에서 많이 볼 수 있는 자동완성을 구현하는 데 있어 가장 기본이 되는 자료구조인 Trie 를 사용하였다.

```py
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

주어진 단어들이 담긴 strs 리스트를 word 로 순회, 다시 word 를 x 로 순회하면서, 문자 x 를 Trie 그래프에 삽입 한다.

Trie 그래프가 완성되었다면, Trie 를 공통문자에 해당되는 부분까지만 탐색 (children 요소 개수 1 개 이면서, 단어의 끝이 아닐 때까지만) 하고 그 결과를 리턴하는 구조다.
