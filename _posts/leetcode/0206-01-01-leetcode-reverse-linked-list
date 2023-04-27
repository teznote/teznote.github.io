---
layout: post
title: "206. Reverse Linked List"
updated: 2023-04-27
categories: [leetcode_easy]
tags: [python,leetcode,easy,linked_list,recursive]
---

## 문제

[https://leetcode.com/problems/reverse-linked-list/](https://leetcode.com/problems/reverse-linked-list/)

연결리스트의 노드 순서를 역순으로 뒤집으면 되는 문제다.

## 반복문 사용

```python
def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:
    p, n = None, head
    
    while n:
        p, n.next, n = n, p, n.next
    
    return p
```
{:.python}

while 구문 안쪽이 핵심이다.

## 재귀함수 사용

```python
def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:
    def f(p, n):
        if n:
            t = n.next
            n.next = p
            return f(n, t)
        else:
            return p
    
    return f(None, head)
```
{:.python}

반복문을 재귀함수 형태로 옮기면 된다.