---
layout: default
title: "70. Climbing Stairs"
updated: 2022-04-20
tags: [leetcode,design]
---

## 문제

[https://leetcode.com/problems/climbing-stairs/](https://leetcode.com/problems/climbing-stairs/)

1 또는 2 계단씩 오르기를 할 때, n 계단을 오를 수 있은 방법의 가짓수를 구하는 문제다.

n 개의 계단이 있다고 하면, n-2 개의 계단까지 오른 뒤 2 계단을 오르는 방법과, n-1 개의 계단을 오른 뒤 1 계단을 오르는 방법이 있다. 즉 아래와 같은 점화식으로 나타낼 수 있으며 이는 피보나치 수열과 유사하다.

```pseudo
# n 계단을 오르는 가짓수 f(n)
초기값: f(1) = 1, f(2) = 2
일반항: f(n) = f(n-2) + f(n-1)
```
{:.pseudo}

## Recursive with Memoization

```python
def climbStairs(self, n: int) -> int:
    def memoize(f):
        h = {}
        def wrapper(n):
            if n not in h:
                h[n] = f(n)
            return h[n]
        return wrapper
    
    @memoize
    def f(n):
        return n if n in [1, 2] else f(n-2) + f(n-1)
    
    return f(n)

# 수행시간: 36 ms
```
{:.python}

메모이제이션이 아닌 단순한 재귀호출로는 시간초과로 문제를 풀 수 없다. 예를들어 f(20) 을 구하려면 f(18) 과 f(19) 을 알아야하는데, f(18) 을 구했다 하더라도, f(19) 를 구할 때 다시 f(18) 을 다시 구하기 때문에 과도한 재귀호출이 발생한다.

메모이제이션을 위해 Python 데코레이션 문법을 사용했으며, h 딕셔너리가 메모이제이션을 위한 저장소 역할을 한다. h 딕셔너리 안에 f(n) 의 결과값이 없을 때만 재귀호출을 하기 때문에 과도한 호출을 제한할 수 있다.

## Dynamic Programming

```python
def climbStairs(self, n: int) -> int:
    h = {}
    for i in range(1, n+1):
        h[i] = i if i in [1, 2] else h[i-2] + h[i-1]
        
    return h[n]

# 수행시간: 20 ms
```
{:.python}

점화식으로 구현되는 문제는 동적계획법으로 풀기 쉽다.

## Python 모듈 사용

```python
def climbStairs(self,n: int) -> int:
    from functools import lru_cache
    
    @lru_cache
    def f(n):
        return n if n in [1, 2] else f(n-2) + f(n-1)
    
    return f(n)

# 수행시간: 45 ms
```
{:.python}

Python 은 메모이제이션을 위한 함수를 functools 모듈에서 제공한다. 위에서 구현한 메모이제이션은 인수가 n 하나 있는 경우에만 가능토록 하였으나, lru_cache 함수는 보다 다양한 인수에 대해서도 지원한다.