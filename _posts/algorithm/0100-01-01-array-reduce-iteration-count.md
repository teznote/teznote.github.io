---
layout: post
title: "[Array] Hash Table 활용하여 반복 횟수 줄이기"
updated: 2023-09-07
tags: algorithm
---

## Leetcode: Two Sum

[https://leetcode.com/problems/two-sum/](https://leetcode.com/problems/two-sum/)

요약하면, nums 안에 합이 target 이 되는 두 요소 x, y 가 반드시 존재하는데, 두 요소의 인덱스를 리턴하는 문제다.

x, y 쌍을 모두 탐색하여 그 합이 target 이 되는지를 알아보는 Brute Force 방식을 우선 생각할 수 있다. 이중 루프로 구현되기 때문에 시간복잡도가 O(n^2) 이 된다.

이중 루프를 깰 수 있는 방법으로 풀 수 있는 방법이 있다. 첫 순회에서 x 를 Hash Table 과 같은 저장소에 모두 저장하고, 다음 순회에서 저장된 값과 합이 target 이 되는 경우를 찾으면 된다.

이론적으로 Hash Table 에 대한 접근은 시간복잡도가 O(1) 이기 때문에, 이 방식은 딱 두번만 순회하면 되므로 시간복잡도는 O(n) 이 된다.

```py
def twoSum(self, nums: List[int], target: int) -> List[int]:
    h = {x: i for i, x in enumerate(nums)}

    for i, x in enumerate(nums):
        y = target-x
        if y in h and h[y] != i:
            return h[y], i
```
{:.python}

첫 순회에서는 `{숫자: 인덱스, ...}` 형태의 저장소 h 를 만들고, 다음 순회에서 그 합이 target 이 되는 y 가 저장소 h 에 있는지를 탐색하고, 있다면 그 인덱스를 리턴한다.