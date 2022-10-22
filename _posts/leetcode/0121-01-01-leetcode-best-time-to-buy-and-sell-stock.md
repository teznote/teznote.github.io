---
layout: post
title: "121. Best Time to Buy and Sell Stock"
updated: 2022-10-22
categories: [leetcode_easy]
tags: [python,leetcode,easy,array,dynamic_programming]
---

## 문제

[https://leetcode.com/problems/best-time-to-buy-and-sell-stock/](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/)

각 일자의 주가를 나타내는 prices 리스트가 주어질 때, 최대로 확보할 수 있는 이윤을 리턴하는 문제다.

## 반복문으로 해결

```python
  def maxProfit(self, prices: List[int]) -> int:
      a, b = float('-inf'), float('inf')    # a: max profit, b: min price

      for x in prices:
          b = min(b, x)
          a = max(a, x-b)

      return a
```
{:.python}

위 코드에 나타냈 듯, a 는 확보할 수 있는 최대 이윤을, b 는 어떤 시점보다 보다 앞선 시점까지의 최소 주가이다.

prices 리스트를 x 로 순회하면서, 순회했을 때의 최소 주가 b 를 갱신한 다음, 이윤을 `x-b` 로 계산하고 나서, 그 이윤이 최대 이윤인지를 따져 a 를 갱신해 간다.

## 동적계획법

```python
  def maxProfit(self, prices: List[int]) -> int:
      a = [0]*len(prices)    # [max profit from 0 to index, ... ]

      for i, x in enumerate(prices):
          a[i] = 0 if i == 0 else max(0, a[i-1] + x - prices[i-1])

      return max(a)
```
{:.python}

[동적계획법](https://namu.wiki/w/%EB%8F%99%EC%A0%81%20%EA%B3%84%ED%9A%8D%EB%B2%95)으로도 문제를 해결할 수 있다. 보통 점화식으로 나타낼 수 있는 문제를 동적계획법으로 푸는데 i 시점의 주가를 p(i), 확보할 수 있는 최대 이윤을 f(i) 라 하면 아래와 같은 점화식으로 나타낼 수 있다.

```pseudo
초기값: a(0) = p(0)
일반항: a(i) = max(0, a(i-1) + p(i) - p(i-1))
```

위 점화식을 for 반복문 안에 구현하여, i 인덱스 까지의 최대 이윤을 나타내는 a 리스트를 만들어낸 뒤, a 안에서 최대값을 리턴하는 구조다.
