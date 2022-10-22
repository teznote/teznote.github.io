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

그리고 개인적으로 점화식을 프로그래밍으로 푸는 것을 [동적계획법](https://namu.wiki/w/%EB%8F%99%EC%A0%81%20%EA%B3%84%ED%9A%8D%EB%B2%95) (Dynamic Programming) 이라고 생각한다. 링크를 보면 보다 추상적인 개념으로 동적계획법을 설명하고 있지만, 이제까지 개인적으로 접한 동적계획법은 모두 점화식 풀이의 형태였다.

## 재귀함수를 사용한 동적계획법

```python
def climbStairs(self, n: int) -> int:
    def f(x):
        return x if x <= 2 else f(x-2) + f(x-1)

    return f(n)
```
{:.python}

점화식 형태를 그대로 재귀함수 f 형태로 옮겨놓았다. 이론적으로는 문제가 없지만 위 코드는 시간초과로 문제를 통과할 수 없다.

과도한 재귀호출이 문제가 되는데, 예를들어 f(45) 를 구하고자 한다면, f(43) 과 f(44) 를 알아야 한다. f(43) 을 먼저구한 뒤, f(44) 를 구할 땐 또 f(43) 을 알아야하므로 또 계산을 한다. 시간복잡도가 O(2^N) 으로 상당히 비효율적이다.

이미 한번 마친 계산을 또 할 필요없이 그 결과만을 사용할 수 있다면 상당히 개선된 성능을 보일 수 있을 것이다.

```python
def climbStairs(self, n: int) -> int:
    def memoize(f):
        h = {}

        def wrapper(x):
            if x not in h:
                h[x] = f(x)

            return h[x]

        return wrapper

    @memoize
    def f(x):
        return x if x <= 2 else f(x-2) + f(x-1)

    return f(n)
```
{:.python}

memoize 라는 함수를 만들어 Python 의 데코레이터 문법으로 f 함수를 감쌌다. memoize 함수 안을 보면 h 딕셔너리를 생성하여 f 함수의 결과가 없다면 구해서 저장하고, 있다면 결과를 그대로 리턴하는 구조다. 시간복잡도는 O(N) 이 된다.

참고로 Python 에는 메모이제이션을 쉽게 구현할 수 있는 모듈을 내장하고 있다. lru_cahe 가 그것으로 아래는 이를 사용한 풀이인데, 위 memoize 함수보다 더 효율적이고 범용적으로 사용할 수 있도록 설계되어 있다.

```python
from functools import lru_cache

def climbStairs(self, n: int) -> int:
    @lru_cache
    def f(x):
        return x if x <= 2 else f(x-2) + f(x-1)

    return f(n)
```
{:.python}

## 반복문을 사용한 동적계획법

```python
def climbStairs(self, n: int) -> int:
    a = {}

    for i in range(1, n+1):
        a[i] = i if i <= 2 else a[i-2] + a[i-1]

    return a[n]
```
{:.python}

반복문 안에 점화식 풀이가 구현되어 있다.
