---
layout: post
title: "101. Symmetric Tree"
updated: 2022-09-28
categories: [leetcode_easy]
tags: [python,leetcode,easy,tree,dpeth_first_search,breadth_first_search,binary_tree]
---

## 문제

[https://leetcode.com/problems/symmetric-tree/](https://leetcode.com/problems/symmetric-tree/)

어떤 이진트리가 주어졌을 때, 좌우대칭이 되어 있는지를 판별하여 리턴하는 문제다.

대칭이라는 구조를 생각해보면 크게 두가지를 성립되어야 하는데, 첫째는 뻗어나가는 가지의 구조가 대칭적이어야 하며, 둘째는 대칭되는 노드들끼리의 값이 동일해야 한다.

트리를 탐색하는 대표적인 방법인 [너비우선탐색](https://namu.wiki/w/%EB%84%88%EB%B9%84%20%EC%9A%B0%EC%84%A0%20%ED%83%90%EC%83%89) (Breadth First Search, BFS) 또는 [깊이우선탐색](https://namu.wiki/w/%EA%B9%8A%EC%9D%B4%20%EC%9A%B0%EC%84%A0%20%ED%83%90%EC%83%89) (Depth First Search, DFS) 를 사용하여 해결할 수 있다.

## 반복문으로 너비우선탐색

```python
def isSymmetric(self, root: Optional[TreeNode]) -> bool:
    queue = [(root.left, root.right)]

    while queue:
        ln, rn = queue.pop(0)

        if ln and rn:
            if ln.val == rn.val:
                queue.append((ln.left, rn.right))
                queue.append((ln.right, rn.left))
            else:
                return False
        elif ln or rn:
            return False

    return True
```
{:.python}

큐 (Queue) 자료구조를 사용하여 너비우선탐색을 구현할 수 있다. 큐 자료구조를 나타내는 queue 리스트에 서로 대칭이 되어야 할 노드를 넣고 탐색을 한다.

위에서 언급한 두가지 대칭조건을 while 반복문 안 if 구문이 판별하고 있으며, 탐색 중 대칭이 아님을 알게 되는 순간 즉시 False 를 리턴한다.

## 재귀함수로 깊이우선탐색

```python
def isSymmetric(self, root: Optional[TreeNode]) -> bool:
    def fn(ln, rn):
        if not ln and not rn:
            return True
        elif ln and rn:
            if ln.val == rn.val:
                return True and fn(ln.left, rn.right) and fn(ln.right, rn.left)
            else:
                return False
        else:
            return False

    return fn(root.left, root.right)
```
{:.python}

깊이우선탐색은 반복문 또는 재귀함수로 구현할 수 있다. 반복문 방식은 위 너비우선탐색 풀이에서 `que.pop(0)` 구문을 `quq.pop()` 으로 바꿔주기만 하면 구현이되므로, 여기서는 재귀함수 방식의 깊이우선탐색 코드를 구현했다. (참고로 너비우선탐색은 재귀함수 방식으로 구현이 안되는데, 재귀호출 이라는 것이 스택 자료구조를 이용한 방식이 때문에 그렇다.)

너비우선탐색 풀이와는 다르게, 재귀호출에는 모든 케이스에 대해 리턴이 필요하므로, fn 재귀함수 안의 if 구문에 대칭여부와 관련된 모든 조건이 구현되어 있다.
