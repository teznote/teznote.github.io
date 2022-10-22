---
layout: post
title: "136. Single Number"
updated: 2022-10-22
categories: [leetcode_easy]
tags: [python,leetcode,easy,math,array,bit_manipulation]
---

## 문제

[https://leetcode.com/problems/single-number/](https://leetcode.com/problems/single-number/)

nums 리스트 안에서, 다른 숫자들은 모두 2 개씩 있지만, 유일하게 1 개만 있는 숫자를 찾아서 리턴하는 문제다.

## 수학 공식 사용

```python
  def singleNumber(self, nums: List[int]) -> int:
      return sum(set(nums))*2 - sum(nums)
```
{:.python}

nums 리스트를 set 자료형으로 변환하면, num 안에서 고유한 값들만 추려지게 된다. 이들의 합계에 2 를 곱한 뒤, nums 리스트 합계를 빼면 1 개만 있는 숫자만큼 차이가 나게된다.

## 반복문으로 탐색

```python
  def singleNumber(self, nums: List[int]) -> int:
      h = set()

      for x in nums:
          if x in h:
              h.remove(x)
          else:
              h.add(x)

      return next(iter(h))
```
{:.python}

반복문으로 nums 를 순회하면서, 1 개만 있는 숫자를 찾아내는 방법이다. 찾아내는 방법은 여러가지가 있을 수 있으나, 여기에서는 h 라는 set 자료형을 생성하여, 순회 과정에서 어떤 숫자가 처음 나오면 그 숫자를 h 에 저장하고, 다시 나오면 그 숫자를 h 에서 제거한다.

순회를 종료하면 제거가 안된 숫자가 하나 나오는데, 제거가 안된 이유는 nums 안에 1 개만 존재하는 숫자이기 때문일 것이다.

## 비트 연산 사용

```python
  from functools import reduce

  def singleNumber(self, nums: List[int]) -> int:
      return reduce(lambda x, y: x^y, nums)
```
{:.python}

[배타적 논리합](https://ko.wikipedia.org/wiki/XOR_%EA%B5%90%EC%B2%B4_%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98) (XOR) 비트 연산으로 문제를 해결할 수 있다.

링크를 확인해보면 이 연산은 교환법칙이 성립하며, 0 이 항등원이면서 자기자신을 역원으로 가진다. 이를 정리하면 아래와 같다.

```pseudo
# XOR 비트 연산자를 ^ 라 하면...
A ^ B = B ^ A
A ^ 0 = A
A ^ A = 0
```
{:.pseudo}

따라서 만일 `A ^ B ^ C ^ A ^ B` 라는 연산이 있다면, 교환법칙으로 `A ^ A ^ B ^ B ^ C` 로 바꿀 수 있으며, 자기자신이 역원이므로 `0 ^ 0 ^ C` 가 되고, 0 이 항등원이므로 최종적으로 `C` 와 같게 된다. 이 성질을 이용한 풀이다.

Python 의 reduce 함수를 이용하여 연속적으로 XOR 연산을 실행하였다.
