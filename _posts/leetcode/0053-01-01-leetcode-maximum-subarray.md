---
layout: post
title: "53. Maximum Subarray"
updated: 2022-04-20
categories: [leetcode_medium]
tags: [python,leetcode,medium,array,divide_and_conquer,dynamic_programming]
---

## 문제

[https://leetcode.com/problems/maximum-subarray/](https://leetcode.com/problems/maximum-subarray/)

nums 리스트 안의 연속된 수들로 합계들 중, 가장 높은 합계 (최고부분합) 를 리턴하는 문제다.

가장 쉽게 생각할 수 있는 풀이는 이중루프로 모든 케이스를 직접 구하는 방식 (Brute Force) 일 테지만, 이 방식은 시간초과로 문제를 풀 수 없다.

문제를 보면 시간복잡도 O(N) 방식으로 해결하라고 하고 있으며, 이 외에도 [분할정복](https://namu.wiki/w/%EB%B6%84%ED%95%A0%20%EC%A0%95%EB%B3%B5%20%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98) (Divide and Conquer) 방식으로도 문제를 해결해보라 하고 있다.

## 동적계획법 풀이

```python
def maxSubArray(self, nums: List[int]) -> int:
    a = [0]*len(nums)

    for i, x in enumerate(nums):
        a[i] = x if i == 0 else max(a[i-1]+x, x)

    return max(a)
```
{:.python}

잘 보면, nums 리스트 i 인덱스 수까지의 최고부분합은 아래와 같은 점화식으로 나타낼 수 있는데, 점화식으로 나타낼 수 있다면 [동적계획법](https://namu.wiki/w/%EB%8F%99%EC%A0%81%20%EA%B3%84%ED%9A%8D%EB%B2%95) (Dynamic Programming) 으로 해결할 수 있다.

```pseudo
# num 리스트 i 인덱스까지의 최고부분합 f(i)
초기값: f(0) = num[0]
일반항: f(i) = max(f(i-1) + num[i], num[i])
```
{:.pseudo}

for 반복문 안에도 위 점화식 형태가 담겨있다. 특히 이 문제와 관련된 동적계획법 해결법을 카데인 알고리즘 (Kadane's Algorithm) 이라 부른다.

## 분할정복 풀이

```python
def maxSubArray(self, nums: List[int]) -> int:
    def fn(A):
        if len(A) == 1: return A[0], A[0], A[0], A[0]

        m = len(A)//2
        ll, lm, lr, lt = fn(A[m:])
        rl, rm, rr, rt = fn(A[:m])

        return max(ll, lt+rl), max(lm, lr+rl, rm), max(lr+rt, rr), lt+rt

    return fn(nums)[1]
```
{:.python}

분할정복 알고리즘을 위해 fn 재귀함수를 구현했다. nums 를 둘로 쪼개고 난 리스트를 다시 재귀호출로 넘겨 결과값을 받고, 결과값을 다시 조립하여 리턴하는 구조다.

최대부분합을 계속 갱신해가는데, 아래와 같이 이해할 수 있다.

```pseudo
# 두 배열 L, R 이 있을 때, 두 배열을 연결한 배열 L + R 의 최대부분합은
# 아래와 같이 기존 L 의 최대부분합 lm, 기존 R 의 최대부분합 rm, L 과 R 을 이어붙였을 때의 최대부분합 lr + rl 중 최대값이 됨

L                       R
|                       |
ṿ                       ṿ
[x1, x2, x3, ... , xm], [y1, y2, y3, ... , yn]
   |                |    |              |
   ṿ        lr <----+    +----> rl      ṿ
   lm        \                   \      rm 
    \         \                   \       \
     \         \                   \       # R 배열의 최대부분합
      \         \                   \
       \         \                   # R 배열의 가장 왼쪽에서부터의 최대부분합
        \         \
         \         # L 배열의 가장 오른쪽에서부터의 최대부분합
          \        
           # L 배열의 최대부분합
         
# L + R 최대부분합 은 L 의 가장 오른쪽 값인 xm 이 포함된 상태에서의 최대부분합 인 lr 과,
# R 의 가장 왼쪽 값인 y1 이 포함된 상태에서의 최대부분합 인 rl 의 값을 알아야 함
```
{:.pseudo}

```pseudo
# 두 배열이 있을 때, 가장 오른쪽 값이 포함된 상태에서의 최대부분합 lr 은
# 아래와 같이 기존 R 의 오른쪽으로부터의 최대부분합 rr, L 과 R 을 이어붙였을 때의 오른쪽으로부터의 최대부분합 lr + rt 중 최대값이 됨

L                       R
|                       |
ṿ                       ṿ
[x1, x2, x3, ... , xm], [y1, y2, y3, ... , yn]
                    |    |                  |
                    |    |          rr <----+
                    |    |           \
                    |    |            # R 배열의 가장 오른쪽에서부터의 최대부분합
                    |    |            
                    |    |                  |
            lr <----+    +------- rt -------+
                                   \
                                    # R 배열의 전체합

# L+R 의 오른쪽에서부터의 최대부분합 은 R 의 전체합인 rt 와 R 의 오른쪽에서부터의 최대부분합 인 rr 을 추가로 알아야 함
```
{:.pseudo}

```pseudo
# 두 배열이 있을 때, 가장 왼쪽 값이 포함된 상태에서의 최대부분합 rl 은
# 아래와 같이 기존 L 의 왼쪽으로부터의 최대부분합 ll, L 과 R 을 이어붙였을 때의 왼쪽으로부터의 최대부분합 lt + rl 중 최대값이 됨

L                       R
|                       |
ṿ                       ṿ
[x1, x2, x3, ... , xm], [y1, y2, y3, ... , yn]
 |                  |    |
 +----> ll          |    |
         \
 |        # L 배열의 가장 왼쪽에서부터의 최대부분합
 |                              
 |                  |    |                  
 +------- lt -------+    +----> rl
           \
            # L 배열의 전체합

# L+R 의 왼쪽에서부터의 최대부분합 은 L 의 전체합인 lt 와 L 의 왼쪽에서부터의 최대부분합 인 ll 을 추가로 알아야 함
```
{:.pseudo}

위 사항들을 종합하면, 알아야 하는 정보는 리스트의 `(왼쪽으로부터의 최대부분합, 그 배열 자체의 최대부분합, 오른쪽으로부터의 최대부분합, 전체합)` 이 된다.
