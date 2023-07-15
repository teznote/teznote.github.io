---
layout: post
title: "Python 유용하면서 짤막한 함수 표현식들"
updated: 2023-07-15
tags: [dev,python]
---

## 이 포스팅은...

Python 에서 뭔가 기막힌 표현식들이 있으면 이들을 정리해보는 포스팅이다. 남겨둘만한 내용들을 알게 될 때마다 업데이트 할 것이다.

## 2차원 List 1차원으로 변경

```python
# a가 2차원 List 일 때...
a = sum(a, [])
```
{:.python}

sum 함수는 [파이썬 도움말](https://docs.python.org/3/library/functions.html#sum) 보면 sum(iterable, /, start=0) 과 같은 형태로 되어 있다.

sum 함수로 List 간의 덧셈을 유도하여 평평하게 만드는 원리다.