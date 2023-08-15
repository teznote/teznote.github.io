---
layout: post
title: "이진 탐색 (Binary Search)"
updated: 2023-05-14
tags: [algorithm]
---

## 이진 탐색

어떤 자료목록 더미가 있고 그 안에서 특정 자료 A 를 탐색한다면, 가장 쉽게 탐색하는 방법은 A 를 찾을 때까지 자료목록을 처음부터 순서대로 뒤져가는 것이다. 자료목록 더미가 10 만개라면 최악의 경우 10 만번 뒤져야 할 수도 있다.

그러나 자료목록 안의 자료들이 일정한 기준으로 정렬이나 색인이 되어있다면 탐색 횟수를 획기적으로 줄일 수 있다. 자료들이 오름차순으로 정렬되어 있다면 자료목록의 중간에 있는 자료가 무엇인지를 보고, 찾고자 하는 자료가 보다 앞에 있을지, 아니면 뒤에 있을지 판단할 수 있다. 이런식으로 접근하는 것이 이진 탐색이다. [나무위키](https://namu.wiki/w/%EC%9D%B4%EC%A7%84%20%ED%83%90%EC%83%89) 안의 그림을 보면 쉽게 이해가 된다.

## 코드 구현

[leetcode](https://leetcode.com/problems/binary-search/) 에서 이진 탐색을 구현하라는 문제를 찾을 수 있다. 오름차순 정렬된 nums 숫자배열과, target 숫자가 주어지면, nums 안에서 target 숫자의 위치 (인덱스) 를 찾는 문제다. 찾으면 그 위치를, 못 찾으면 -1 을 리턴해야 한다.

아래와 같은 Two Pointer 를 사용하여 이진 탐색 코드를 구현할 수 있다.

```python
def search(self, nums: List[int], target: int) -> int:
    i = 0; j = len(nums)

    while i < j:
        m = i + (j - i) // 2

        if nums[m] < target:
            i = m + 1
        else:
            j = m

    return i if i < len(nums) and nums[i] == target else -1
```
{:.python}

초기값으로 i 는 nums 의 왼쪽 끝 인덱스를, j 는 nums 의 오른쪽 끝 + 1 인덱스를 가리킨다. i 와 j 는 각각 왼쪽 한계와 오른쪽 한계를 뜻하는데, Python 의 범위 규칙과 유사하게 i 이상 j 미만 으로 이해하면 된다.

while 반복문에 들어서면, i 와 j 의 중간에 위치한 인덱스 m 을 구한다. 그리고 `nums[m] < target` 이라면 m 의 왼쪽에 위치한 인덱스들은 어차피 모두 target 보다 작은 숫자이므로 앞으로 탐색할 필요가 없다. 그래서 `i = m + 1` 구문으로 왼쪽 한계인 i 를 m 의 다음 위치로 끌어올린다.

만일 반대라면, m 의 오른쪽에 위치한 인덱스들은 모두 target 보다 모두 큰 숫자가 되므로, 탐색할 필요가 없다. `j = m` 구문으로 j 를 m 위치까지 끌어내린다.

i 와 j 의 조정을 계속 이와 같이 하다보면 반드시 i == j 인 순간이 나타나는데 아래를 보고 이해해보자. 그록 이 때 while 반복문을 빠져나오게 된다.

```pseudo
# 만일 아래와 같은 상황이라면,
# 중간 인덱스 m 은 계산식에 따라 i 와 같은 위치가 된다.

       i  j
       |  |
       ṿ  ṿ
[...., x, y, ......]
       ^
       |
       m
       
# m 이 가리키는 x 와 target 을 비교하여,
# x < target 일 때, i 는 m+1, 반대일 때, j 는 m 이 되어야만 마지막에 i == j 가 된다.
```
{:.pseudo}

반복문을 빠져나왔다면, i 이든 j 이든 이 인덱스가, target 이 삽입되더라도 계속 오름차순이 유지되는 인덱스가 된다.

마지막에는 이 인덱스가 가리키는 nums 의 값이 target 과 일치하는지만 판단하여 문제가 요구하는 답을 리턴하기만 하면 된다.

하나만 더 참고하자면, `nums[m] < target` 일 때는 i 를 조정하고, 아닐 때는 j 를 조정한다고 했다. 만일 nums 가 [2, 2, 2, 2, 2], target 이 2 와 같이 주어진다면 위 알고리즘은 어떻게 동작할까? (물론 문제에서는 nums 안의 숫자들은 모두 유일하다고 했기 때문에 이런 케이스가 주어지지는 않는다.)

`nums[m] == target` 인 상황이 오면, if 규칙에 따라 j 를 조정한다. 그리고 `i < j` 인 상황이 유지되는한 while 반복문은 계속 실행된다. 즉, i == j 가 될 때까지 j 가 계속 조정되며, i 와 j 는 연속된 2 의 가장 왼쪽 인덱스를 가리키게 된다.

## Recursive 코드

위 Leetcode 문제를 재귀적 방식으로 바꿔 본 풀이다. 핵심적인 부분이 fn 재귀함수로 구현되었고, 기본적인 이진탐색 로직은 동일하다.

```py
def search(self, nums: List[int], target: int) -> int:

    def fn(A, t, i=0, j=None):
        if j is None:
            j = len(A)

        if i == j: return i

        m = i + (j - i) // 2
        if A[m] < t:
            return fn(A, t, m+1, j)
        else:
            return fn(A, t, i, m)

    res = fn(nums, target)
    return res if res < len(nums) and nums[res] == target else -1
```
{:.python}

## Python 의 bisect 모듈

Python 에는 이진탐색 알고리즘을 이미 구현한 bisect 모듈을 제공한다. 모듈 안에는 대표적인 2 개 함수가 있는데, bisect_left 와 bisect_right 이다.

두 함수 모두, 위에서 구현한 코드와 같이, 오름차순으로 주어진 리스트 안에서, 특정 target 이 들어갈 수 있는 인덱스를 찾아준다. 다만 차이가 있다면, 동일한 값이 연속으로 있는 구간에서는 bisect_left 는 동일값 연속 구간의 가장 왼쪽 인덱스를, bisect_right 는 동일값 연속 구간의 가장 오른쪽 인덱스 + 1 을 리턴한다는 점이다.

위 문제를 bisect 모듈로도 풀 수 있다.

```py
def search(self, nums: List[int], target: int) -> int:
    from bisect import bisect_left

    i = bisect_left(nums, target)
    return i if i < len(nums) and nums[i] == target else -1
```
{:.python}