---
layout: default
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

이진탐색 알고리즘은 이해하기 어렵지 않으나, 코드로 구현할 땐 다소 까다롭다.

위 코드에서는 탐색범위를 i 이상 j 미만으로 설정하였다. 그래서 초기값은 `i, j = 0, len(nums)` 이다. 그리고 반복문을 반복하다보면 반드시 `i == j` 가 되는데, 그 위치가 target 이 들어갈 위치다. 아래 도식으로 이해할 수 있다.

```pseudo
# [1, 3, 5, 7, 9] 에서 8 이 target 이라 가정하면, 초기 i, j 는 아래와 같다.

i              j
|              |
ṿ              ṿ
1, 3, 5, 7, 9, 
```
{:.pseudo}

```pseudo
# 첫번째 반복에서 m = 0 + (5-0)//2 = 2 이므로, nums[m] = 5 이고, target 인 8 보다 작다.
# 따라서 i 를 m+1 위치로 옮긴다.

         i     j
         |     |
         ṿ     ṿ
1, 3, 5, 7, 9, 
```
{:.pseudo}

```pseudo
# 두번째 반복에서 m = 3 + (5-3)//2 = 4 이므로, nums[m] = 9 이고, target 인 8 보다 작지않다.
# 따라서 j 를 m 위치로 옮긴다.

         i  j
         |  |
         ṿ  ṿ
1, 3, 5, 7, 9, 
```
{:.pseudo}

```pseudo
# 세번째 반복에서 m = 3 + (4-3)//2 = 3 이므로, nums[m] = 7 이고, target 인 8 보다 작다.
# 따라서 i 를 m+1 위치로 옮긴다.

            i, j
            |
            ṿ
1, 3, 5, 7, 9,

#  i == j 가 되었으므로, 반복문을 종료한다.
```
{:.pseudo}

다양한 케이스를 들어가면서 도식화해봐도 모두 반복 끝에 `i == j` 가 된다.
