---
layout: default
title: "35. Search Insert Position"
updated: 2022-04-01
tags: [leetcode,seq]
---

## 문제

[https://leetcode.com/problems/search-insert-position/](https://leetcode.com/problems/search-insert-position/)

오름차순으로 정렬이 되어있는 nums 배열이 주어졌을 때, 오름차순을 해치지 않고 target 이 삽입될 위치(인덱스)를 묻는 문제다.

O(log n) 시간복잡도로 해결하라고 되어 있으므로, [이진탐색](https://namu.wiki/w/%EC%9D%B4%EC%A7%84%20%ED%83%90%EC%83%89) 알고리즘을 적용해야 한다.

## Binary Search

```js
var searchInsert = function(nums, target) {
    var i = 0, j = nums.length;
    
    while (i < j) {
        var m = i + ~~((j - i) / 2);
        if (nums[m] < target) {
            i = m + 1;
        } else {
            j = m;
        }
    }
    
    return i;
};

// 수행시간: 74 ms
```
{:.javascript}

위 이진탐색 링크를 참고해보면, 이진탐색이 무엇인지는 쉽게 알 수 있다. 다만 이 로직을 프로그래밍으로 구현하다보면 의외로 까다로운데 아래와 같이 작동하도록 로직을 구성하는 것이 좋다.

i 를 왼쪽 한계위치, j 를 오른쪽 한계위치, m 을 중간 위치라 하자.

```pseudo
1. 초기값으로 왼쪽 한계위치는 가장 왼쪽 요소를 (0 번 인덱스), 오른쪽 한계위치는 가장 오른쪽 요소보다 한칸 더 나아간 위치를 (마지막 인덱스 + 1) 가리키도록 한다.
2. i < j 이라면 아래 로직을 계속 수행한다.
3. 중간 위치 m 은 m = i + ~~((j - 1) / 2) 으로 구한다. ~ 는 NOT 비트연산자로 ~~ 처럼 적용하면 소수점 이하를 버리는 Math.trunc 함수와 동일한 작동을 한다.
4. nums[m] 이 target 보다 "작을" 경우 왼쪽 한계위치 i 를 m + 1 위치로 옮긴다.
5. nums[m] 이 target 보다 "크거나 같을" 경우 오른쪽 한계위치 j 를 m 위치로 옮긴다.
```
{:.pseudo}

위와 같이 로직을 구현하면, while 반복문의 결과는 반드시 i == j 가 되며, 그 위치에 target 이 들어가면 된다. 아래 그림으로 이해할 수 있다.

```pseudo
# while 반복문을 지속하다보면 아래와 같은 상황에 도달할 수 있다.

       i     j
       |     |
       ṿ     ṿ
[...., x, y, z, ......]
          ^
          |
          m

# 이 경우 m 은 y 를 가리키고, nums[m] < target 이라면, i 는 m + 1 의 위치인 z 를 가리키므로 i == j 가 되어 반복문을 종료한다.
# 만일 target <= nums[m] 이라면, j 는 m 위치인 y 를 가리키게 되고 아래와 같이 된다.

       i  j
       |  |
       ṿ  ṿ
[...., x, y, ......]
       ^
       |
       m

# 이 경우 m 은 x 를 가리키고, nums[m] < target 이라면, i 는 y 를 가리키고,
# target <= nums[m] 이라면, j 는 x 를 가리키게 되어 어떠한 경우든 i == j 가 되어 반복문을 종료한다.
```
{:.pseudo}

극단값에 대해서도 반복문은 항상 i == j 가 되는 지점에서 종료하며, target 이 들어갈 위치가 된다.

```pseudo
 i  j                          i  j
 |  |                          |  |
 ṿ  ṿ                          ṿ  ṿ
[x, y, ......]     [......, x, y]
 ^                             ^
 |                             |
 m                             m
```
{:.pseudo}
