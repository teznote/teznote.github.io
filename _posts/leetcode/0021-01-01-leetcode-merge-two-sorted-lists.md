---
layout: default
title: "21. Merge Two Sorted Lists"
updated: 2022-03-30
tags: [leetcode,graph]
---

## 문제

[https://leetcode.com/problems/merge-two-sorted-lists/](https://leetcode.com/problems/merge-two-sorted-lists/)

각각 오름차순으로 정렬된 두 개의 주어진 연결리스트 list1, list2 가 있을 때, 오름차순을 유지한 채 하나로 병합한 새로운 연결리스트를 리턴하는 문제다.

두 연결리스트를 순회하여, 어떤 값들이 순서대로 들어가야할지 알아낸 후, 새롭게 노드를 생성하여 연결리스트를 만드는 방법도 있겠으나, 이 문제에서 진정으로 의도하는 바는 이미 두 개의 연결리스트로 구현된 노드를 새롭게 생성하는 일 없이 연결 순서만을 바꿔 풀어보라는 것이 아닐까 한다.

## Iterative

```python
def mergeTwoLists(self, list1: Optional[ListNode], list2: Optional[ListNode]) -> Optional[ListNode]:
    merged = n = ListNode()
    
    while list1 and list2:
        if list1.val < list2.val:
            n.next, n, list1 = list1, list1, list1.next
        else:
            n.next, n, list2 = list2, list2, list2.next
    
    n.next = list1 or list2
    
    return merged.next

# 수행시간: 40 ms
```
{:.python}

list1 과 list2 가 끝에 다다르지 않았다면, 비교를 하여 연결을 새로 구성한다. 만일 둘 중 하나라도 끝에 다다랐다면 while 반복문을 빠져나와서 남아있는 연결리스트를 그대로 연결하는 방식이다.

## Recursive

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

# 수행시간: 54 ms
```
{:.python}

반복문 방식의 풀이를 재귀호출 방식으로 변경한 풀이다.