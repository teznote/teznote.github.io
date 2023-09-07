---
layout: post
title: "[String] 파싱과 역파싱"
updated: 2023-09-07
tags: algorithm
---

## LeetCode: Roman to Integer

[https://leetcode.com/problems/roman-to-integer/](https://leetcode.com/problems/roman-to-integer/)

로마 숫자를 실제 숫자로 파싱해보는 문제다.

[로마 숫자](https://namu.wiki/w/%EB%A1%9C%EB%A7%88%20%EC%88%AB%EC%9E%90) 표기법을 들여다보면 아래와 같은 규칙을 찾을 수 있는데, 이 규칙이 문제를 푸는 핵심이다.

- 로마 숫자들이 나타내는 숫자를 모두 더하면 실제 숫자가 됨
- 단, 어떤 로마 숫자 A 다음에 A 보다 큰 로마 숫자가 오면 A 에는 마이너스를 적용
{:.note}

두번째 규칙만 보자면, `IV` 는 I 뒤에 나오는 V 가 더 높은 숫자이므로 -1 로 보고 V 가 5 이므로 전체적으로 4 가 되는 원리다.

```py
def romanToInt(self, s: str) -> int:
    h = {'M': 1000, 'D': 500, 'C': 100, 'L': 50, 'X': 10, 'V': 5, 'I': 1}
    a = 0
    
    for i, x in enumerate(s[:-1]):
        a += h[x] * (-1 if h[x] < h[s[i+1]] else 1)
    else:
        a += h[s[-1]]
    
    return a
```
{:.python}

로마 숫자 s 를 마지막 한글자를 제외하고 순회하면서, 위에서 언급한 규칙을 적용하여 파싱한다. 순회를 마치면 for else 구문에서 마지막 한글자를 파싱하는 구조다.

참고로, 파싱이 어려운 구조를 파싱이 쉬운 구조로 바꾸는 방법을 적용할 수도 있다. 이 문제에서는 `IV` 를 `IIII` 로, `IX` 를 `VIIII` 로 문자열을 바꿔서, 그냥 모든 로마 숫자를 더해버리는 방법도 생각해 볼 수 있다.

주요 코드 보면 아래와 같다.

```py
= s.replace('IV', 'IIII').replace('IX', 'VIIII').replace('XL', 'XXXX').replace('XC', 'LXXXX').replace('CD', 'CCCC').replace('CM', 'DCCCC')
return sum(h[x] for x in s)
```
{:.python}
