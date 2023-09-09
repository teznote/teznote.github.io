---
layout: post
title: "Hash Table"
updated: 2023-09-07
tags: algorithm
---

## 문제

[https://leetcode.com/problems/two-sum/](https://leetcode.com/problems/two-sum/)

요약하면, nums 안에 합이 target 이 되는 두 요소 x, y 가 반드시 존재하는데, 두 요소의 인덱스를 리턴하는 문제다.

## 풀이

x, y 쌍을 모두 탐색하여 그 합이 target 이 되는지를 알아보는 Brute Force 방식을 우선 생각할 수 있다.

```py
# brute force -> Time Limit
def twoSum(self, nums: List[int], target: int) -> List[int]:
    for i, j in ((i, j) for i in range(len(nums)) for j in range(len(nums))):
        if i == j: continue
        if nums[i]+nums[j] == target:
            return i, j
```
{:.python}

이중 루프로 구현되기 때문에 시간복잡도가 O(n^2) 이 된다. 이 때문인지 시간초과로 문제를 통과할 수 없었다.

이중 루프를 깰 수 있는 방법으로 풀 수 있는 방법이 있다. 첫 순회에서 x 를 Hash Table 과 같은 저장소에 모두 저장하고, 다음 순회에서 저장된 값과 합이 target 이 되는 경우를 찾으면 된다.

```py
# hash table -> 60ms
def twoSum(self, nums: List[int], target: int) -> List[int]:
    h = {}

    for i, x in enumerate(nums):
        y = target-x
        if y in h:
            return h[y], i
        else:
            h[x] = i
```
{:.python}

이론적으로 Hash Table 에 대한 접근은 시간복잡도가 O(1) 이기 때문에, 이 방식은 시간복잡도는 O(n) 이 된다.

h 딕셔너리를 만들어두고, nums 순회할 때 h 안에 target - x 가 있는지를 판별한다. 있다면 리턴하면 되고, 없다면 나중을 위해 미리 `{숫자: 인덱스, ...}` 형태로 저장을 해둔다.

미리 h 딕셔너리를 완성해놓고, x, y 탐색을 나중에 할 수도 있다.

```py
# hash table 2 -> 67ms
def twoSum(self, nums: List[int], target: int) -> List[int]:
    h = {x: i for i, x in enumerate(nums)}

    for i, x in enumerate(nums):
        y = target-x
        if y in h and h[y] != i:
            return h[y], i
```
{:.python}

두번을 순회하지만 시간복잡도는 O(n) 으로 동일하다. 개인적으로는 이 방식이 코드 이해가 더 잘 되었다.
