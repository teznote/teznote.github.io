---
layout: post
title: "94. Binary Tree Inorder Traversal"
updated: 2022-09-28
categories: [leetcode_easy]
tags: [python,leetcode,easy,stack,tree,depth_first_search,binary_tree]
---

## 문제

[https://leetcode.com/problems/binary-tree-inorder-traversal/](https://leetcode.com/problems/binary-tree-inorder-traversal/)

이진트리를 탐색하는 가장 대표적인 세가지 방법 (전위/중위/후위 탐색) 중 중위 탐색 결과를 리턴하는 문제다. 각각의 탐색 방법은 [위키피디아](https://en.wikipedia.org/wiki/Tree_traversal)를 참고하면 된다.

## 재귀함수로 탐색

```python
def inorderTraversal(self, root: Optional[TreeNode]) -> List[int]:
    a = []

    def fn(n):
        if n:
            fn(n.left)
            a.append(n.val)
            fn(n.right)
    fn(root)

    return a
```
{:.python}

위에서 fn 함수가 중위 탐색을 하는 재귀함수다. if 구문 아래 다음 노드를 탐색하기 위한 코드와, 현재의 노드 처리 코드 순서를 아래처럼 바꿔주면 다른 탐색이 된다.

```python
# 전위 (Preorder) 탐색     # 중위 (Inorder) 탐색      # 후위 (Postorder) 탐색
if n:                    if n:                    if n:
    a.append(n.val)          fn(n.left)               fn(n.left)
    fn(n.left)               a.append(n.val)          fn(n.right)
    fn(n.right)              fn(n.right)              a.append(n.val)
```
{:.python}

leetcode 문제풀이들 중 더욱 기발하게 축약한 코드가 있어 옮겨보았다.

```python
def inorderTraversal(self, root: Optional[TreeNode]) -> List[int]:
    return [*self.inorderTraversal(root.left), root.val, *self.inorderTraversal(root.right)] if root else []
```
{:.python}

## 반복문으로 탐색

```python
def inorderTraversal(self, root: Optional[TreeNode]) -> List[int]:
    a = []
    st = [(root, False)]

    while st:
        n, v = st.pop()

        if (n and v):
            a.append(n.val)
        elif (n and not v):
            st.append((n.right, False))
            st.append((n, True))
            st.append((n.left, False))

    return a
```
{:.python}

스택 자료구조를 나타내는 st 리스트를 사용하여, `(노드, 처리를 할지 다음 노드를 탐색할지 나타내는 플래그)` 튜플이 모두 없어질 때까지 반복한다.

while 구문의 elif 아래를 보면, 재귀함수 방식과는 다르게 n.right 노드부터 담는 것을 볼 수 있는데, 이렇게 해야 위 재귀함수 방식과 동일한 순서로 탐색이 가능하다. 스택 자료구조가 LIFO (Last In First Out) 라는 것을 생각하면 이해가 될 것이다.
