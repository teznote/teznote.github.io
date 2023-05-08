---
layout: post
title: "70. Climbing Stairs"
updated: 2022-04-20
categories: [leetcode_easy]
tags: [python,leetcode,easy,math,dynamic_programming,memoization]
---

## 문제

[https://leetcode.com/problems/climbing-stairs/](https://leetcode.com/problems/climbing-stairs/)

계단을 한번에 한개씩 또는 두개씩 오를 수 있을 때, n 계단을 오를 수 있은 방법의 가짓수를 리턴하는 문제다.

n 개의 계단이 있다고 하면, n-2 개의 계단까지 오른 뒤 두계단을 한번에 오르는 방법과, n-1 개의 계단까지 오른 뒤 한계단을 오르는 방법을 택할 수 있다. 즉 아래와 같은 점화식으로 나타낼 수 있으며, 이는 [피보나치 수열](https://namu.wiki/w/%ED%94%BC%EB%B3%B4%EB%82%98%EC%B9%98%20%EC%88%98%EC%97%B4)과 유사하다.

```pseudo
# n 계단을 오르는 가짓수 f(n)
초기값: f(1) = 1, f(2) = 2
일반항: f(n) = f(n-2) + f(n-1)
```
{:.pseudo}

그리고 이런 점화식을 해결하는 방식을 [동적계획법](https://namu.wiki/w/%EB%8F%99%EC%A0%81%20%EA%B3%84%ED%9A%8D%EB%B2%95) (Dynamic Programming) 이라고 한다.

## 재귀함수를 사용한 동적계획법

```python
def climbStairs(self, n: int) -> int:
    def fn(x):
        return x if x <= 2 else fn(x-2) + fn(x-1)

    return fn(n)
```
{:.python}

점화식을 fn 재귀함수에 반영했다. 이론적으로는 문제가 없지만 위 코드는 n 이 커질수록 시간초과가 발생한다.

과도한 재귀호출이 문제인데, 예를들어 f(45) 를 구하고자 한다면, f(43) 과 f(44) 를 알아야 한다. f(43) 을 먼저구한 뒤, f(44) 를 구할 땐 또 f(43) 을 알아야하므로 또 계산을 한다. 시간복잡도가 O(2^N) 으로 상당히 비효율적이다.

이미 한번 마친 계산을 또 할 필요없이 그 결과만을 사용할 수 있다면 상당히 개선된 성능을 보일 수 있을 것이다.

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
    def fn(x):
        return x if x <= 2 else fn(x-2) + fn(x-1)

    return fn(n)
```
{:.python}

memoize 라는 함수를 만들어 Python 의 데코레이터 문법으로 fn 함수를 감쌌다. memoize 함수 안을 보면 h 딕셔너리를 생성하여 함수의 결과가 없다면 구해서 저장하고, 있다면 결과를 그대로 리턴하는 구조다. 시간복잡도는 O(N) 이 된다.

참고로 Python 에는 메모이제이션을 쉽게 구현할 수 있는 모듈을 내장하고 있다. lru_cahe 가 그것으로 아래는 이를 사용한 풀이인데, 위 memoize 함수보다 더 효율적이고 범용적으로 사용할 수 있도록 설계되어 있다.

```python
from functools import lru_cache

def climbStairs(self, n: int) -> int:
    @lru_cache
    def fn(x):
        return x if x <= 2 else fn(x-2) + fn(x-1)

    return fn(n)
```
{:.python}

## 반복문을 사용한 동적계획법

```python
def climbStairs(self, n: int) -> int:
    h = {}

    for x in range(n+1):
        h[x] = x if x <= 2 else h[x-2] + h[x-1]

    return h[n]
```
{:.python}

반복문으로 점화식 풀이를 구현했다.
