---
layout: default
title: "53. Maximum Subarray"
updated: 2022-04-20
tags: [leetcode,design]
---

## 문제

[]()

배열 안의 연속된 수들로 합계를 구하고, 합계들 중 최고로 높은 합계 (최고부분합) 를 리턴하는 문제다.

이중루프로 구현하는 방법 (Brute Force) 을 가장 먼저 떠올릴 수 있지만 시간초과로 문제를 통과할 수 없다.

배열에서 i 번째 수까지의 최고부분합은 아래와 같은 점화식으로 나타낼 수 있다. 그리고 점화식은 동적계획법으로 풀기 쉽다.

```pseudo
# N 배열 i 인덱스까지의 최고부분합 f(i) 는...
초기값: f(0) = N[0]
일반항: f(i) = max(f(i-1)+N[i], N[i])
```
{:.pseudo}

그리고 문제를 읽어보면 동적계획법 말고도 Divide and Conquer 방식으로도 문제를 해결할 수 있다고 한다.

## Dynamic Planning

```python

# 수행시간: 
```
{:.python}

## Divide and Conquer

```python

# 수행시간: 
```
{:.python}