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
    n = head = ListNode()

    while list1 and list2:
        if list1.val > list2.val:
            list1, list2 = list2, list1
        n.next, n, list1 = list1, list1, list1.next
    n.next = list1 or list2

    return head.next
```
{:.python}

list1 과 list2 가 모두 노드일 때는, 값을 비교하여 list1 이 작거나같은 값을 가진 노드를 가리키도록 한다. 그리고 list1 이 가리키는 노드를 계속 이어붙인다.

반복문이 종료되면, 나머지 노드가 살아있는 쪽만을 그대로 이어붙인다.

마지막에는 head 가 가리키고 있던 일종의 더미 노드는 필요없으므로 head.next 를 리턴한다.

## 재귀함수로 노드 연결순서 조작

```python
def mergeTwoLists(self, list1: Optional[ListNode], list2: Optional[ListNode]) -> Optional[ListNode]:
    if list1 and list2:
        if list1.val > list2.val:
            list1, list2 = list2, list1
        list1.next = self.mergeTwoLists(list1.next, list2)
        return list1
    else:
        return list1 or list2
```
{:.python}

재귀함수는 두 노드를 받아서 값이 적은 노드를 리턴하는 구조로 되어있다. 노드 리턴하기 전에 재귀호출로 더 작은 값을 가진 노드를 미리 이어붙인다.
