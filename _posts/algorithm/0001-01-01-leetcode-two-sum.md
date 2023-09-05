---
layout: post
title: "1. Two Sum"
updated: 2023-09-05
tags: leetcode
---

## 문제

[https://leetcode.com/problems/two-sum/](https://leetcode.com/problems/two-sum/)

요약하면, nums 안에 합이 target 이 되는 두 요소 x, y 가 반드시 존재하는데, 두 요소의 인덱스를 리턴하는 문제다.

## 풀이

x, y 가 될만한 경우의 수를 모두 탐색해보는 가장 무식한 방법을 우선 생각할 수 있다.

```py
# Brute Force -> Time Limit
def twoSum(self, nums: List[int], target: int) -> List[int]:
    for i, j in ((i, j) for i in range(len(nums)) for j in range(len(nums))):
        if i == j: continue
        if nums[i]+nums[j] == target:
            return i, j
```
{:.python}

시간 초과로 문제를 풀 수 없다. 이중 루프 구조를 깨야 할 것 같다.

Hash Table 을 사용하면 반복을 한번으로 줄일 수 있다.

```py
def twoSum(self, nums: List[int], target: int) -> List[int]:
    h = {}  # {number: index, ...}
    for i, x in enumerate(nums):
        y = target-x
        if y in h:
            return h[y], i
        else:
            h[x] = i
```
{:.python}

저장소 h 를 두고, nums 를 한번 순회한다. x 요소 차례가 되었을 때, 합이 target 이 되는 y 가 이미 저장소 h 에 있다면 바로 리턴하는 구조다.
