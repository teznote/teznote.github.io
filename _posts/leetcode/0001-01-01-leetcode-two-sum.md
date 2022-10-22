---
layout: post
title: "1. Two Sum"
updated: 2022-03-29
categories: [leetcode_easy]
tags: [python,leetcode,easy,array.hash_table]
---

## 문제

[https://leetcode.com/problems/two-sum/](https://leetcode.com/problems/two-sum/)

숫자들로 이뤄진 nums 리스트 안에, 두 요소의 합의 target 이 되는 케이스가 반드시 유일하게 존재한다고 할 때, 두 요소의 인덱스를 찾아 리턴하는 문제다.

문제에서는 O(N^2) 보다 더 효율적인 방법도 찾아보라고 하고 있다.

## 무차별 대입법

```python
def twoSum(self, nums: List[int], target: int) -> List[int]:
    for i, x in enumerate(nums[:-1]):
        for j, y in enumerate(nums[i+1:], i+1):
            if x+y == target:
                return [i, j]
```
{:.python}

이른바 무차별 대입법 (Brute Force) 라 불리는 방법으로, 이중루프를 구현하여 모든 케이스를 순회하며서, 두 요소의 합이 target 이 되는지 탐색한다.

시간복잡도는 O(N^2) 으로, 문제에서는 더 효율적인 방법을 찾아보라 하고 있으므로, 문제가 요구하는 진정한 풀이는 아니다.

## 해시테이블 사용

```python
def twoSum(self, nums: List[int], target: int) -> List[int]:
    h = {}    # {nums[index]: index, ... }

    for i, x in enumerate(nums):
        y = target-x

        if y in h:
            return [h[y], i]
        else:
            h[x] = i
```
{:.python}

h 딕셔너리를 해시테이블 저장소로 상정했다. h 에는 `{숫자: 그 숫자가 위치한 인덱스}` 형태의 키/밸류를 저장한다.

nums 를 x 로 순회하면서, x 와 합이 target 이 되는 어떤 숫자 y 가 이미 h 안에 저장되어 있다면, y 와 x 의 인덱스를 리턴하고, h 안에 저장되어 있지 않다면 나중을 위해 h 안에 저장해놓는 방식이다. 문제에서 두 숫자의 합이 target 이 되는 케이스가 반드시 존재한다고 했기에 가능한 방법이다.

해시테이블은 이론적 시간복잡도가 O(1) 이므로, 위 코드의 총 시간복잡도는 O(N) 이 되어, 무차별대입법보다 훨씬 효율적이다.
