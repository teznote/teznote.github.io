---
layout: default
title: "53. Maximum Subarray"
updated: 2022-04-20
tags: [leetcode,design]
---

## 문제

[https://leetcode.com/problems/maximum-subarray/](https://leetcode.com/problems/maximum-subarray/)

배열 안의 연속된 수들로 합계를 구하고, 합계들 중 최고로 높은 합계 (최고부분합) 를 리턴하는 문제다.

이중루프로 구현하는 방법 (Brute Force) 을 가장 먼저 떠올릴 수 있지만 시간초과로 문제를 통과할 수 없다.

배열에서 i 번째 수까지의 최고부분합은 아래와 같은 점화식으로 나타낼 수 있다. 그리고 점화식은 동적계획법 (Dynamic Programming) 으로 풀기 쉽다.

```pseudo
# N 배열 i 인덱스까지의 최고부분합 f(i) 는...
초기값: f(0) = N[0]
일반항: f(i) = max(f(i-1)+N[i], N[i])
```
{:.pseudo}

그리고 문제를 읽어보면 동적계획법 말고도 Divide and Conquer 방식으로도 문제를 해결할 수 있다고 한다.

## Dynamic Planning

```python
def 최대부분합Array(self, nums: List[int]) -> int:
    subs = [0]*len(nums)
    for i, x in enumerate(nums):
        subs[i] = x if i == 0 else max(subs[i-1]+x, x)
            
    return max(subs)

# 수행시간: 1004 ms
```
{:.python}

subs 리스트는 nums 리스트의 i 번째 인덱스까지의 최대부분합을 저장하는 리스트이다. 반복문 내부를 보면 위 점화식의 초기값과 일반항을 그대로 담고 있다.

최종적으로는 subs 안에서 최대값을 리턴하면 된다.

## Divide and Conquer

```python
def maxSubArray(self, nums: List[int]) -> int:
    def f(A):
        if len(A) == 1:
            return A[0], A[0], A[0], A[0]
        m = len(A) // 2
        ll, lm, lr, lt = f(A[:m])
        rl, rm, rr, rt = f(A[m:])
        return max(ll, lt+rl), max(lm, lr+rl, rm), max(lr+rt, rr), lt+rt
    
    return f(nums)[1]

# 수행시간: 1797 ms
```
{:.python}

nums 를 계속 둘로 쪼개고 난 뒤, 쪼개진 부분배열들을 다시 조립할 때 최대부분합을 계속 갱신해가는 구조다. 아래와 같이 이해할 수 있다.

```pseudo
# 두 배열 L, R 이 있을 때, 두 배열을 연결한 배열 L+R 의 최대부분합은
# 아래와 같이 기존 L 의 최대부분합 lm, 기존 R 의 최대부분합 rm, L 과 R 을 이어붙였을 때의 최대부분합 lr+rl 중 최대값이 됨

L                       R
|                       |
ṿ                       ṿ
[x1, x2, x3, ... , xm], [y1, y2, y3, ... , yn]
   |                |    |              |
   ṿ        lr <----+    +----> rl      ṿ
   lm        \                   \      rm - # R 배열의 최대부분합
    \         \                   \
     \         \                   # R 배열의 가장 왼쪽에서부터의 최대부분합
      \         \
       \         # L 배열의 가장 오른쪽에서부터의 최대부분합
        \        
         # L 배열의 최대부분합
         
# L+R 최대부분합 은 L 의 가장 오른쪽 값 xm 이 포함된 상태에서의 최대부분합 인 lr 과,
# R 의 가장 왼쪽 값인 y1 이 포함된 상태에서의 최대부분합 인 rl 의 값을 알아야 함
```
{:.pseudo}

```pseudo
# 두 배열이 있을 때, 가장 오른쪽 값이 포함된 상태에서의 최대부분합 lr 은
# 아래와 같이 기존 R 의 오른쪽으로부터의 최대부분합 rr, L 과 R 을 이어붙였을 때의 오른쪽으로부터의 최대부분합 lr+rt 중 최대값이 됨

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
# 아래와 같이 기존 L 의 왼쪽으로부터의 최대부분합 ll, L 과 R 을 이어붙였을 때의 왼쪽으로부터의 최대부분합 lt+rl 중 최대값이 됨

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

위 사항들을 종합하면, 알아야 하는 정보는 어떤 배열의 "왼쪽으로부터의 최대부분합, 그 배열 자체의 최대부분합, 오른쪽으로부터의 최대부분합, 전체합" 이 된다. 이를 Divide and Conquer 방식으로 조립해 가고, 마지막에는 최종 조립한 배열의 자체 최대부분합 만을 리턴하는 구조다.