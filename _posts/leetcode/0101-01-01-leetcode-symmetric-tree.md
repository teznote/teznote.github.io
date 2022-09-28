---
layout: default
title: "101. Symmetric Tree"
updated: 2022-09-28
tags: [leetcode,graph]
---

## 문제

[https://leetcode.com/problems/symmetric-tree/](https://leetcode.com/problems/symmetric-tree/)

어떤 이진트리가 주어졌을 때, 좌우대칭이 되어 있는지를 판별하여 리턴하는 문제다.

대칭이라는 구조를 생각해보면 크게 두가지를 만족시켜야 하는데, 첫째로 뻗어나가는 가지의 구조가 대칭적이어야 하며, 둘째로 대칭되는 노드들끼리의 값도 동일해야 한다.

트리를 탐색하는 대표적인 방법인 너비 우선 탐색 (Breadth First Search) 또는 깊이 우선 탐색 (Depth First Search) 를 사용하여 해결할 수 있다.

## Breadth First Search

```js
var isSymmetric = function(root) {
    let que = [[root.left, root.right]];
    
    while (que.length) {
        let [ln, rn] = que.shift();
        
        if (ln && rn) {
            if (ln.val === rn.val) {
                que.push([ln.left, rn.right]);
                que.push([ln.right, rn.left]);
            } else {
                return false;
            }
        } else if (ln || rn) {
            return false;
        }
    }
    
    return true;
};

// 수행시간: 117 ms
```
{:.javascript}

Queue 자료구조를 사용하여 BFS 를 구현할 수 있다. 위에서 언급한 두가지 대칭조건을 if 조건절로 판별하고 있으며, 탐색 중 대칭이 아니라고 판별되는 순간 즉시 false 를 리턴한다.

## Recursive Depth First Search

```js
var isSymmetric = function(root) {
    var isMirror = function(ln, rn) {
        if (!ln && !rn) {
            return true;
        } else if (ln && rn && ln.val === rn.val) {
            return true && isMirror(ln.left, rn.right) && isMirror(ln.right, rn.left);
        } else {
            return false;
        }
    };
    
    return isMirror(root.left, root.right);
};

// 수행시간: 109 ms
```
{:.javascript}

DFS 는 순환문 또는 재귀호출로 구현할 수 있다. 순환문 방식은 위 BFS 예시에서 que.shift(); 구문을 que.pop(); 으로 바꿔주기만 하면 구현이되므로, 여기서는 재귀호출 방식의 DFS 를 구현해보았다.

재귀호출 DFS 방식은 중간에 대칭구조가 false 라고 결론이 나더라도 남은 노드를 계속 탐색하기 때문에 비효율 적으로 느껴진다. (하지만 수행시간은 더 빠르게 나왔다. ??)
