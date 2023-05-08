---
layout: post
title: "189. Majority Element"
updated: 2023-04-27
categories: [leetcode_easy]
tags: [python,leetcode,easy,array,hash_table,divide_and_conquer,sorting,counting]
---

## 문제

[https://leetcode.com/problems/majority-element/](https://leetcode.com/problems/majority-element/)

어떤 리스트가 주어지고, 그 안에는 반드시 과반을 차지하는 요소가 존재한다고 할 때, 그 요소가 무엇인지 찾아내는 문제다.

문제에서는 시간복잡도 O(n), 공간복잡도 O(1) 로도 해결해보라고도 하고 있다.

## 정렬을 사용

```python
def majorityElement(self, nums: List[int]) -> int:
    return sorted(nums)[len(nums)//2]
```
{:.python}

과반을 차지하는 요소가 반드시 존재한다는 것은, 그 요소의 개수가 전체 요소 개수의 절반보다 많다는 것이 되고, 순서대로 정렬을 했을 때 중간값은 반드시 그 요소가 있다는 의미가 된다.

## 해시 테이블을 사용하여 요소 개수 카운팅

```python
from collections import Counter

def majorityElement(self, nums: List[int]) -> int:
    return Counter(nums).most_common(1)[0][0]
```
{:.python}

가장 쉽게 생각할 수 있는 방법이다. 리스트 안의 각 요소 개수를 세고 가장 개수가 많은 요소를 리턴하면 된다.

Python 에서 기본으로 제공하는 Counter 클래스를 사용했다.

## 상대 개수 카운팅

```python
def majorityElement(self, nums: List[int]) -> int:
    m, c = nums[0], 1
    for x in nums[1:]:
        if x == m:
            c += 1
        else:
            c -= 1
            if c == 0:
                m, c = x, 1
    
    return m
```
{:.python}

nums 리스트를 앞에서부터 순회하면서, 나타나는 요소의 상대개수를 센다. 즉, 같은 요소가 나올때마다 c 를 증가시키지만 다른 요소가 나오면 c 를 감소시킨다.

만일 c 가 0 이 되면 (즉, 세고있던 요소의 개수가 다른 요소의 개수가 일치하게 되면) 그 때의 새로운 요소의 상대개수를 세기 시작한다.

한번 순회만 하므로 시간복잡도는 O(n) 이고, 단일값만 저장하는 변수 몇개만 추가되므로 공간복잡도는 O(1) 이다.

## 분할정복으로 상대 개수 카운팅

```python
def majorityElement(self, nums: List[int]) -> int:
    def dac(nums):
        if len(nums) == 1:
            return nums[0], 1
        
        t = len(nums)//2
        lm, lc = dac(nums[:t])
        rm, rc = dac(nums[t:])
        
        m, c = 0, 0
        if lm == rm:
            m, c = lm, lc+rc
        elif lc > rc:
            m, c = lm, lc-rc
        elif lc < rc:
            m, c = rm, rc-lc
        else:
            m, c = lm, 0
        
        return m, c
    
    return dac(nums)[0]
```
{:.python}

분할정복으로도 문제를 풀 수 있다. 사실 직관적으로 이해가 잘 되지 않는 풀이다.
