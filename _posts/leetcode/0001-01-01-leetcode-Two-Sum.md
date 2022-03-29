---
layout: default
title: "1. Two Sum"
updated: 2022-03-29
tags: [leetcode,easy,array,hash_table]
---

## 문제

[https://leetcode.com/problems/two-sum/](https://leetcode.com/problems/two-sum/)

숫자들을 요소로 가진 배열 nums 가 주어지고, nums 의 임의의 두 요소의 합이 target 이 되는 경우가 반드시 유일하게 존재한다고 할 때, 두 요소의 인덱스를 리턴하는 문제다.

## Brute Force

```python
# 수행시간: 3696 ms
def twoSum(self, nums: List[int], target: int) -> List[int]:
    for i, x in enumerate(nums):
        for j, y in enumerate(nums[i + 1:], i + 1):
            if x + y == target:
                return i, j
```
{:.python}

Python 의 enumerate 는 참 요긴한 함수다. 이중루프로 구현할 수 있다.

## Hash Table

```python
# 수행시간: 69 ms
def twoSum(self, nums: List[int], target: int) -> List[int]:
    h = {}
    for i, x in enumerate(nums):
        y = target - x
        if y in h:
            return h[y], i
        else:
            h[x] = i
```
{:.python}

h 딕셔너리를 해시 테이블로 삼았다. 해시 테이블의 값 접근은 이론적으로 O(1) 의 시간복잡도를 지니므로, 1 번의 루프만으로 문제를 해결할 수 있다.

nums 를 x 로 순회하면서, target - x 값이 h 안에 있는지를 탐색한다. 없다면, h 에 저장을 해두고, 있다면, 즉시 리턴하는 구조다.