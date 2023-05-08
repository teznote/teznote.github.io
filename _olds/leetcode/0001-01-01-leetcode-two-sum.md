---
layout: post
title: "1. Two Sum"
updated: 2022-03-29
categories: [leetcode_easy]
tags: [python,leetcode,easy,array,hash_table]
---

## 문제

[https://leetcode.com/problems/two-sum/](https://leetcode.com/problems/two-sum/)

숫자들로 이뤄진 nums 리스트 안에, 두 요소의 합의 target 이 되는 케이스가 반드시 유일하게 존재한다고 할 때, 두 요소의 인덱스를 찾아 리턴하는 문제다.

문제에서는 O(N^2) 보다 더 효율적인 방법도 찾아보라고 하고 있다.

## 무차별 대입법 (Brute Force)

```python
def twoSum(self, nums: List[int], target: int) -> List[int]:
    for i, x in enumerate(nums[:-1]):
        for j, y in enumerate(nums[i+1:], i+1):
            if x+y == target:
                return [i, j]
```
{:.python}

두 요소 쌍이 되는 모든 케이스를 순회하며서, 합이 target 이 되는지 탐색한다. 시간복잡도는 O(N^2) 이다.

## 해시테이블 사용

```python
def twoSum(self, nums: List[int], target: int) -> List[int]:
    h = {}

    for i, x in enumerate(nums):
        y = target-x
        if y in h:
            return [h[y], i]
        h[x] = i
```
{:.python}

h 딕셔너리를 해시테이블 저장소로 상정했다. h 에는 `{숫자: 그 숫자가 위치한 인덱스}` 형태의 키/밸류를 저장한다.

nums 를 x 로 순회하면서, x 와 합이 target 이 되는 어떤 숫자 y 가 이미 h 안에 저장되어 있다면, y 와 x 의 인덱스를 리턴한다. 저장되어 있지 않다면 현재시점의 인덱스와 숫자를 나중을 위해 h 안에 저장한다.

위 코드의 시간복잡도는 O(N) 이다.
