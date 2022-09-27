---
layout: default
title: "70. Climbing Stairs"
updated: 2022-04-20
tags: [leetcode,design]
---

## 문제

[https://leetcode.com/problems/climbing-stairs/](https://leetcode.com/problems/climbing-stairs/)

1 또는 2 계단씩 오르기를 할 때, n 계단을 오를 수 있은 방법의 가짓수를 구하는 문제다.

n 개의 계단이 있다고 하면, n - 2 개의 계단까지 오른 뒤 2 계단을 한번에 오르는 방법과, n - 1 개의 계단까지 오른 뒤 1 계단을 오르는 방법을 택할 수 있다. 즉 아래와 같은 점화식으로 나타낼 수 있으며 이는 피보나치 수열과 유사하다.

```pseudo
# n 계단을 오르는 가짓수 f(n)
초기값: f(1) = 1, f(2) = 2
일반항: f(n) = f(n - 2) + f(n - 1)
```
{:.pseudo}

그리고 점화식은 동적계획법 (Dynamic Programming) 으로 구현하기 쉽다.

## Recursive Dynamic Programming using Memoization

```js
var climbStairs = function(n) {
    var memoize = function(f) {
        var h = new Map();
        
        return function(n) {
            if (!h.has(n)) {
                h.set(n, f(n));
            }
            
            return h.get(n);
        };
    };
    
    var countStairs = function(n) {
        if (n < 3) {
            return n;
        } else {
            return countStairs(n - 2) + countStairs(n - 1);
        }
    };
    
    countStairs = memoize(countStairs);
    
    return countStairs(n);
};

// 수행시간: 113 ms
```
{:.javascript}

재귀호출로 구현한 countStairs 만으로는 시간 초과로 문제를 풀 수 없다. 과도한 재귀호출이 문제가 된다.

Javascript 의 클로저를 응요하여 메모이제이션을 구현했다. 동적계획법을 구현한 핵심 countStairs 함수를 memoize 함수로 감싼 방식이다. h 맵안에 countStairs(n) 의 결과값이 없을 때만 재귀호출을 하기 때문에 과도한 호출을 피할 수 있다.

## Iterative Dynamic Programming

```js
var climbStairs = function(n) {
    var counts = Array(n + 1).fill(0);
    
    [counts[1], counts[2]] = [1, 2];
    for (var i = 3; i < n + 1; i++) {
        counts[i] = counts[i - 2] + counts[i - 1];
    }
    
    return counts[n];
};

// 수행시간: 91 ms
```
{:.javascript}
