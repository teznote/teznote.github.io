---
layout: post
title: "35. Search Insert Position"
updated: 2022-04-01
categories: [leetcode_easy]
tags: [python,leetcode,easy,array,binary_search]
---

## 문제

[https://leetcode.com/problems/search-insert-position/](https://leetcode.com/problems/search-insert-position/)

오름차순으로 정렬이 되어있는 nums 리스트가 주어졌을 때, 오름차순을 유지한 채로 target 이 삽입될 수 있는 위치(인덱스)를 찾아 리턴하는 문제다.

nums 를 반복문으로 순회하면서 위치를 찾는 방법을 생각할 수 있겠으나, 이는 시간복잡도가 O(N) 이다. 보다 더 효율적인 O(log N) 시간복잡도로 해결하라고 되어 있으므로, [이진탐색](https://namu.wiki/w/%EC%9D%B4%EC%A7%84%20%ED%83%90%EC%83%89) (Binary Search) 알고리즘을 적용해야 한다. 링크를 참고하면 이진탐색이 무엇인지 쉽게 이해할 수 있을 것이다.

## 이진탐색

```python
def searchInsert(self, nums: List[int], target: int) -> int:
    i, j = 0, len(nums)

    while i < j:
        m = i + (j-i)//2

        if nums[m] < target:
            i = m+1
        else:
            j = m

    return i
```
{:.python}

이진탐색 알고리즘은 이해하기 어렵지 않으나, 코드로 구현할 땐 다소 까다롭다. 아래처럼 작동하도록 하였다.

```pseudo
- i 이상, j 미만을 탐색범위로 지정한다.
- 중간위치 m 은 i + (j-i)//2 공식을 사용한다.
- nums[m] < target 인 경우 i 는 m+1 로, 그렇지 않은 경우 j 는 m 위치로 옮긴다.
  (i 는 m+1, j 는 m 인 이유는 탐색범위가 i 이상 j 미만이기 때문이다.)
- 반복문의 결과 어느시점에 반드시 i == j 가 되며, 이 때의 i 또는 j 위치가 target 이 들어갈 위치가 된다.
```
{:.pseudo}

여러 케이스를 두고 손으로 끄적여보면 이해하기 쉽다.

## Python 의 bisect 모듈 사용

```python
from bisect import bisect_left

def searchInsert(self, nums: List[int], target: int) -> int:
    return bisect_left(nums, target)
```
{:.python}

Python 에는 이진탐색을 위한 다양함 함수들이 담겨있는 bisect 모듈이 기본으로 제공된다. bisect_left 함수는 위에서 언급한 이진탐색 작동원리대로 탐색을하는 함수다.
