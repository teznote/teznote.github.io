---
layout: post
title: "21. Merge Two Sorted Lists"
updated: 2022-03-30
categories: [leetcode_easy]
tags: [python,leetcode,easy,linked_list,recursion]
---

## 문제

[https://leetcode.com/problems/merge-two-sorted-lists/](https://leetcode.com/problems/merge-two-sorted-lists/)

각각 오름차순으로 정렬된 두 개의 주어진 연결리스트 list1, list2 가 있을 때, 오름차순을 유지한 채 하나로 병합된 새로운 연결리스트를 리턴하는 문제다.

두 연결리스트를 순회하여, 어떤 값들이 순서대로 들어가야할지 알아낸 후, 새롭게 노드를 생성하면서 연결리스트를 만들어 리턴하는 방법도 있겠으나, 이 문제가 의도하는 바는 이미 생성되어있는 두 연결리스트의 각 노드의 연결 순서를 조작하여 풀어보라는 것이 아닐까 한다.

## 반복문으로 노드 연결순서 조작

```python
def mergeTwoLists(self, list1: Optional[ListNode], list2: Optional[ListNode]) -> Optional[ListNode]:
    head = n = ListNode()

    while (list1 and list2):
        if list1.val < list2.val:
            n.next, n, list1 = list1, list1, list1.next
        else:
            n.next, n, list2 = list2, list2, list2.next
    n.next = list1 or list2

    return head.next
```
{:.python}

새로운 노드를 하나 생성하여 head 와 n 이 가리키도록 한다.

list1 과 list2 가 모두 노드일 때는, 값을 비교해가며 연결 순서를 바꿔가고, list1 과 list2 둘 중 하나라도 노드가 아니라면 나머지를 모두 가져다 붙인다.

특히 while 반복문의 if 구문 안에 있는 내용이 연결 순서를 조작하는 핵심구문인데, 아래와 같은 도식으로 이해할 수 있다.

```pseudo
# while 반복문에 진입하기 직전은 아래와 같다.

head, n            list1
|                  |
ṿ                  ṿ
NODE:              NODE:       +----> NODE:       +----> NODE:
+ val: 0           + val: 1    |      + val: 2    |      + val: 4
+ next: None       + next: ----+      + next: ----+      + next: None



                   list2
                   |
                   ṿ
                   NODE:       +----> NODE:       +----> NODE:
                   + val: 1    |      + val: 3    |      + val: 4
                   + next: ----+      + next: ----+      + next: None
```
{:.pseudo}

```pseudo
# list1.val < list2.val 이 아니므로, n.next, n, list2 = list2, list2, list2.next 구문이 실행된다.
# 구문 실행 후는 아래과 같다.

head               list1
|                  |
ṿ                  ṿ
NODE:              NODE:       +----> NODE:       +----> NODE:
+ val: 0           + val: 1    |      + val: 2    |      + val: 4
+ next: ----+      + next: ----+      + next: ----+      + next: None
            |
            |
            |
            |      n                  list2
            |      |                  |
            |      ṿ                  ṿ
            +----> NODE:       +----> NODE:       +----> NODE:
                   + val: 1    |      + val: 3    |      + val: 4
                   + next: ----+      + next: ----+      + next: None
```
{:.pseudo}

```pseudo
# 이제는 list1.val < list2.val 이므로, n.next, n, list1 = list1, list1, list1.next 구문이 실행된다.
# 구문 실행 후는 아래과 같다.

head               n                  list1
|                  |                  |
ṿ                  ṿ                  ṿ
NODE:          +-> NODE:       +----> NODE:       +----> NODE:
+ val: 0       |   + val: 1    |      + val: 2    |      + val: 4
+ next: ----+  |   + next: ----+      + next: ----+      + next: None
            |  |
            |  |
            |  +---------------+
            |                  |      list2
            |                  |      |
            |                  |      ṿ
            +----> NODE:       |      NODE:       +----> NODE:
                   + val: 1    |      + val: 3    |      + val: 4
                   + next: ----+      + next: ----+      + next: None
```
{:.pseudo}

위와 같이 진행되며, 마지막에 `head.next` 를 리턴하는 이유도 알 수 있을 것이다.

## 재귀함수로 노드 연결순서 조작

```python
def mergeTwoLists(self, list1: Optional[ListNode], list2: Optional[ListNode]) -> Optional[ListNode]:
    if list1 and list2:
        if list1.val < list2.val:
            list1.next = self.mergeTwoLists(list1.next, list2)
            return list1
        else:
            list2.next = self.mergeTwoLists(list1, list2.next)
            return list2
    else:
        return list1 or list2
```
{:.python}

list1, list2 값을 비교해서 값이 작은 노드를 리턴한다. 그리고 노드 리턴하기 전에 재귀호출로 더 작은 값을 가진 노드를 미리 이어붙이는 구조다.
