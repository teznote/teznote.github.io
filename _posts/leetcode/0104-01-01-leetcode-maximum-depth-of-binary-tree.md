---
layout: default
title: "104. Maximum Depth of Binary Tree"
updated: 2022-09-29
tags: [leetcode,graph]
---

## 문제

[https://leetcode.com/problems/maximum-depth-of-binary-tree/](https://leetcode.com/problems/maximum-depth-of-binary-tree/)

어떤 이진트리가 주어졌을 때 최대의 깊이를 리턴하는 문제다. 트리를 순회하는 방법들 중 깊이 우선 탐색 (Depth First Search) 를 사용하여 문제를 풀어보았다.

## Iterative Depth First Search

```js
var maxDepth = function(root) {
    let st = [[root, 1]];
    let m = 0;
    
    while (st.length) {
        let [n, d] = st.pop();
        
        if (n) {
            m = Math.max(m, d);
            st.push([n.left, d + 1]);
            st.push([n.right, d + 1]);
        }
    }
    
    return m;
};

// 수행시간: 68 ms
```
{:.javascript}

DFS 을 반복문으로 구현하기 위해 스택 자료구조를 사용했다. 스택은 [노드, 깊이] 형태의 자료를 담고 있으며, 자식 노드를 스택에 추가할 때 깊이를 하나씩 늘려간다. 이들 중 가장 큰 값을 리턴하는 방식이다.

## Recursive Depth First Search

```js
var maxDepth = function(root) {
    let findDepth = function(n, d) {
        return (n) ? Math.max(d, findDepth(n.left, d + 1), findDepth(n.right, d + 1)) : 0;
    };
    
    return findDepth(root, 1);
};

// 수행시간: 278 ms
```
{:.javascript}

별도의 재귀함수를 사용하여 DFS 알고리즘을 적용했다. leetcode 풀이들을 살펴보니 더 축약된 코드가 있어 아래에 가져와봤다.

```js
var maxDepth = function(root) {
    return (root) ? 1 + Math.max(maxDepth(root.left), maxDepth(root.right)) : 0;
};

// 수행시간: 137 ms
```
{:.javascript}
