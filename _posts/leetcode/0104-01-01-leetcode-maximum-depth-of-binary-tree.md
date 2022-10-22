---
layout: post
title: "104. Maximum Depth of Binary Tree"
updated: 2022-09-29
tags: [leetcode,graph]
---

## 문제

[https://leetcode.com/problems/maximum-depth-of-binary-tree/](https://leetcode.com/problems/maximum-depth-of-binary-tree/)

어떤 이진트리가 주어졌을 때 최대의 깊이를 리턴하는 문제다.

트리를 탐색하는 대표적인 방법인 [너비우선탐색](https://namu.wiki/w/%EB%84%88%EB%B9%84%20%EC%9A%B0%EC%84%A0%20%ED%83%90%EC%83%89) (Breadth First Search, BFS) 또는 [깊이우선탐색](https://namu.wiki/w/%EA%B9%8A%EC%9D%B4%20%EC%9A%B0%EC%84%A0%20%ED%83%90%EC%83%89) (Depth First Search, DFS) 를 사용하여 해결할 수 있다.

## 반복문으로 너비우선탐색

```python
def maxDepth(self, root: Optional[TreeNode]) -> int:
    if not root: return 0

    queue = [(root, 1)]
    a = 1

    while queue:
        n, d = queue.pop(0)

        if n:
            a = max(a, d)
            queue.append((n.left, d+1))
            queue.append((n.right, d+1))

    return a
```
{:.python}

너비우선탐색을 위한 큐 자료구조로 queue 리스트를 생성했다. queue 에 담기는 `(노드, 노드의 깊이)` 를 순서대로 탐색하면서, 노드의 깊이 최대갚을 계속 갱신해 나가는 구조다.

## 재귀함수로 깊이우선탐색

```python
def maxDepth(self, root: Optional[TreeNode]) -> int:
    if not root: return 0

    def fn(n, d):
        return max(fn(n.left, d+1), fn(n.right, d+1)) if n else d-1;

    return fn(root, 1)
```
{:.python}

깊이우선탐색은 반복문 또는 재귀함수로 구현이 가능하다. 반복문은 위 너비우선탐색 풀이의 `queue.pop(0)` 부분을 `queue.pop()` 으로 바꾸기만 하면 된다. (참고로 너비우선탐색은 재귀함수 방식으로 구현이 어렵다.)

fn 재귀함수는 다음 자식노들들의 깊이를 넘겨받아 그 중 높은 값을 리턴하는 구조이며, 자식노드들의 깊이를 구하기 위해 재귀호출을 한다. 만일 자식노드들이 없다면 부모 노드의 깊이를 리턴한다.

다른 leetcode 풀이를 보면, 더 효율적인 방법도 있어 아래에 그 코드를 옮겨보았다.

```python
    def maxDepth(self, root: Optional[TreeNode]) -> int:
        return 1 + max(self.maxDepth(root.left), self.maxDepth(root.right)) if root else 0
```
{:.python}

재귀호출을 할 때마다 깊이를 1 씩 계속 늘려가는 구조다.
