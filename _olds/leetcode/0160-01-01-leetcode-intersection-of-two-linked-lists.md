---
layout: post
title: "160. Intersection of Two Linked Lists"
updated: 2022-10-25
categories: [leetcode_easy]
tags: [python,leetcode,easy,hash_table,linked_list,two_pointers]
---

## 문제

[https://leetcode.com/problems/intersection-of-two-linked-lists/](https://leetcode.com/problems/intersection-of-two-linked-lists/)

두 연결리스트가 주어지는데, 두 연결리스트는 어느 지점부터 노드를 공유할 수도 있고 아닐 수도 있다. 공유 여부를 판별하고, 공유한다면 공유하는 노드들 중 첫 시작노드를 리턴하는 문제다.

문제에서는 시간복잡도 O(M+N) 에 공간복잡도 O(1) 에도 도전해보라 하고 있다.

## 해시테이블 사용

```python
def getIntersectionNode(self, headA: ListNode, headB: ListNode) -> Optional[ListNode]:
    h = set()
    a, b = headA, headB

    while a or b:
        if a:
            if id(a) in h: return a
            else:
                h.add(id(a))
                a = a.next
        if b:
            if id(b) in h: return b
            else:
                h.add(id(b))
                b = b.next

    return None
```
{:.python}

가장 생각하기 쉬운 방법은 두 연결리스트를 각각 탐색하여, 방문한 노드마다 별도 저장소에 기록해두고, 그 노드가 다시 방문되는지를 탐색하는 방법일 것이다.

각 연결리스트를 a, b 로 순회하면서, 방문하는 노드의 id 를 h set 자료형에 저장해둔다. 만일 한번 방문했던 노드라면 즉시 그 노드를 리턴하고, 반복문이 종료된다면 공유 노드가 없다는 의미이므로 None 을 리턴한다.

하지만 이 방식은 시간복잡도는 O(M+N) 이지만 공간복잡도가 O(N) 이다.

## 두번 순회하여 공유부분 찾기

```python
def getIntersectionNode(self, headA: ListNode, headB: ListNode) -> Optional[ListNode]:
    a, b = headA, headB

    while a != b:
        a = a.next if a else headB
        b = b.next if b else headA

    return a
```
{:.python}

두개의 포인터로 길이가 다른 두 연결리스트를 각각 순회한 뒤, 연결리스트를 바꿔서 다시 순회하면 결국 마지막에 공유하는 노드에서 만나거나, 공유하는 노드가 없다면 같이 끝에 다다르게 된다. 아래와 같이 이해하면 된다.

```pseudo
# 연결리스트가 아래와 같다고 한다면, 노드 X, Y, Z 는 공유 노드구간이다.

      a --> b  
              \
               +--> X --> Y --> Z --> None 
              /
c --> d --> e
```
{:.pseudo}

```pseudo
# 어떤 포인터가 위쪽 연결리스트 순회 마친 뒤, 아래쪽 연결리스트를,
# 다른 포인터가 아래쪽 연결리스트 순회 마친 뒤, 위쪽 연결리스트를 순회한다면 아래와 같이 순회를 하게 된다.

a --> b --> X --> Y --> Z --> None --> c --> d --> e --> X --> Y --> Z --> None
c --> d --> e --> X --> Y --> Z --> None --> a --> b --> X --> Y --> Z --> None

# 두 포인터를 각각 한 노드씩 전진하다보면, 2 회차 순회에서는 공유노드에 반드시 동시에 진입하게 된다.
# 만일 공유구간이 없다면, 2 회차의 제일 마지막 None 에 동시에 진입하게 된다.
```
{:.python}

두 포인터가 가리키는 노드가 동일할 때 반복문이 종료가 되며, 위에서 설명했듯이 공유노드 또는 None 을 리턴하게 된다.

시간복잡도는 O(M+N), 공간복잡도는 O(1) 이다.

## 첫번째 순회 후 출발지점 조정하여 다시 순회하기

```python
def getIntersectionNode(self, headA: ListNode, headB: ListNode) -> Optional[ListNode]:
    lena, lenb = 0, 0
    a, b = headA, headB

    while a:
        lena += 1
        a = a.next
    while b:
        lenb += 1
        b = b.next

    a, b = headA, headB
    for _ in range(abs(lena - lenb)):
        if lena > lenb:
            a = a.next
        else:
            b = b.next

    while a != b:
        a = a.next
        b = b.next

    return a
```
{:.python}

첫번재 순회에서 각 연결리스트의 길이를 lena, lenb 에 담고, lena 와 lenb 차이만큼 긴 쪽을 먼저 전진시킨 후, 다시 순회하는 방식이다.

이 방식도 시간복잡도는 O(M+N), 공간복잡도는 O(1) 이다.
