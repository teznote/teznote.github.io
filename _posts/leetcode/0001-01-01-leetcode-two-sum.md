---
layout: default
title: "1. Two Sum"
updated: 2022-09-24
tags: [leetcode,seq]
---

## 문제

[https://leetcode.com/problems/two-sum/](https://leetcode.com/problems/two-sum/)

숫자들을 요소로 가진 배열 nums 가 주어지고, nums 의 임의의 두 요소의 합이 target 이 되는 경우가 반드시 유일하게 존재한다고 할 때, 두 요소의 인덱스를 리턴하는 문제다.

## Brute Force

```js
var twoSum = function(nums, target) {
    for (let i = 0; i < nums.length - 1; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[i] + nums[j] === target) {
                return [i, j];
            }
        }
    }
};

# 수행시간: 128 ms
```
{:.javascript}

이중루프로 구현할 수 있다.

## Hash Table

```js
var twoSum = function(nums, target) {
    let h = new Map();
    
    for (let i = 0; i < nums.length; i++) {
        let j = h.get(target - nums[i]);
        
        if (j === undefined) {
            h.set(nums[i], i);
        } else {
            return [j, i];
        }
    }
};

# 수행시간: 54 ms            
```
{:.javascript}

h 맵을 해시 테이블로 삼았다. 해시 테이블의 값 접근은 이론적으로 O(1) 의 시간복잡도를 지니므로, 1 번의 루프만으로 문제를 해결할 수 있다.

nums 길이만큼 i 로 순회하면서, target - num[i] 가 h 안에 있는지를 탐색한다. 없다면 h 에 저장을 해두고, 있다면 즉시 리턴하는 구조다.