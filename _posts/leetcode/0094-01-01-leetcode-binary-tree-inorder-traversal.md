---
layout: default
title: "94. Binary Tree Inorder Traversal"
updated: 2022-09-28
tags: [leetcode,graph]
---

## 문제

[https://leetcode.com/problems/binary-tree-inorder-traversal/](https://leetcode.com/problems/binary-tree-inorder-traversal/)

이진트리를 탐색하는 가장 대표적인 세가지 방법 (전위/중위/후위 탐색) 중 중위 탐색 결과를 리턴하는 문제다. 각각의 탐색 방법은 [위키피디아](https://en.wikipedia.org/wiki/Tree_traversal)를 참고하면 된다.

## Recursive

```js
var inorderTraversal = function(root) {
    let visited = [];
    
    let traverse = function(node) {
        if (node) {
            traverse(node.left);
            visited.push(node.val);
            traverse(node.right);
        }
    };
    
    traverse(root);
    
    return visited;
};

// 수행시간: 62 ms
```
{:.javascript}

traverse 함수가 중위탐색의 핵심이다. 재귀호출로 구성되어 있으며, 위 코드처럼 재귀호출들 사이에 탐색 노드 작업을 하면 "중위" 탐색이며, 탐색 노드 작업 후 재귀호출이 모두 나중에 실행되면 "전위", 재귀호출이 모두 먼저 실행되고 탐색 노드 작업을 하게 되면 "후위" 탐색이 된다.

leetcode 문제풀이들을 보다가 더욱 기발하게 축약된 코드가 있어서 가져와봤다.

```js
var inorderTraversal = function(root) {
    return root ? [...inorderTraversal(root.left), root.val, ...inorderTraversal(root.right)] : [];
};

// 수행시간: 94 ms
```
{:.javascript}

## Iterative

재귀호출 방식의 이진트리 탐색은 잘 알려져있어, 이를 순환문으로만 구현해볼 것도 문제가 요구하고 있다. 순환문으로 구현한 코드를 인터넷 검색으로 쉽게 찾을 수 있는데, 이중에서 재귀호출 방식의 코드와 가장 유사한 방식을 사용해봤다.

```js
var inorderTraversal = function(root) {
    let st = [[root, false]];
    let visited = [];
    
    while (st.length) {
        let [n, v] = st.pop();
        
        if (n && v) {
            visited.push(n.val);
        } else if (n && !v) {
            st.push([n.right, false]);
            st.push([n, true]);
            st.push([n.left, false]);
        }
    }
    
    return visited;
};

// 수행시간: 78 ms
```
{:.javascript}

재귀호출 방식과의 차이는 오른쪽 노드를 먼저 탐색하도록 했다는 점이다. 이렇게 해야 재귀호출 방식과 결과가 동일하게 나온다.
