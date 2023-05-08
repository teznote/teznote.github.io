---
layout: post
title: "141. Linked List Cycle"
updated: 2022-10-23
categories: [leetcode_easy]
tags: [python,leetcode,easy,hash_table,linked_list,two_pointers]
---

## 문제

[https://leetcode.com/problems/linked-list-cycle/](https://leetcode.com/problems/linked-list-cycle/)

연결리스트가 주어졌을 때, 그 연결리스트가 계속 끝없이 순환하는 형태인지 아닌지를 리턴하는 문제다. 문제에서는 공간복잡도 O(1) 으로도 풀어보라 하고 있다.

## 해시테이블 사용

```python
  def hasCycle(self, head: Optional[ListNode]) -> bool:
      h = set()

      while head:
          if id(head) not in h:
              h.add(id(head))
              head = head.next
          else:
              return True

      return False
```
{:.python}

해시테이블 (Hash Table) 을 생성하여 방문한 노드를 기록한다. 만일 연결리스트를 따라서 계속 순회 도중, 한번 탐색했던 노드를 다시 탐색하게 된다면 순환구조 연결리스트라고 볼 수 있다.   

h set 자료형을 해시테이블 저장소로 생성하여, 방문한 노드 id 를 기록하게 하고, 이미 방문한 노드인지를 탐색하는 구조다. 이 방식은 공간복잡도가 O(N) 이다.

## 투 포인터 사용

```python
def hasCycle(self, head: Optional[ListNode]) -> bool:
    slow = fast = head

    while fast and fast.next:
        slow, fast = slow.next, fast.next.next
        if slow == fast:
            return True

    return False
```
{:.python}

slow, fast 투 포인터를 생성하여, slow 는 한 단계씩, fast 는 두 단계씩 노드를 탐색하도록 한다. 만일 순환구조라면 어느 순간에는 두 포인터가 반드시 만나게 되는 점을 이용한 코드다. 이는 플로이드의 거북이와 토끼 알고리즘 (Floyd's Tortoise & Hare Algorithm) 이라고도 한다.

이는 공간복잡도가 O(1) 이다.

## 연결리스트 방향 뒤집기

```python
def hasCycle(self, head: Optional[ListNode]) -> bool:
    if not(head and head.next):
        return False

    p, n = None, head

    while n:
        n.next, n, p = p, n.next, n

    return p == head
```
{:.python}

어떤 연결리스트의 방향을 뒤집을 때, 만일 순환구조 연결리스트라면, 처음 연결리스트 시작점으로 다시 돌아게되는 점을 이용한 풀이다.

이 풀이도 공간복잡도가 O(1) 이기는 하지만, 원래의 연결리스트를 변형하게 된다는 문제가 있다.
