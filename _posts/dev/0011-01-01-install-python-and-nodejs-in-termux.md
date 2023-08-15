---
layout: post
title: "Termux 에 Python, NodeJS 설치하기"
updated: 2023-08-15
tags: [dev]
---

## 본 포스팅은...

Termux 는 Ubuntu 와 유사하지만 완전히 같지는 않다. 개발 환경을 구축하는 방법이 다른 경우가 많아 기록을 해 둔다. (본 포스팅은 계속 Update 될 수 있다.)

[별도 포스팅](/posts/install-domestic-server-with-smarphone-or-tablet)에서 구축한 Termux 에 추가적으로 구축한 내용으로, 다른 방식으로 구축했다면 아래 내용이 작동안될 수도 있다. 

## 기본 설치

Termux 에 Python, NodeJS 개발 기본 환경을 구축하기 위해 아래와 같이 명령어를 입력한다.

```bash
pkg install build-essential binutils pkg-config python3 nodejs-lts
```
{:.bash}

## Numpy, Pandas 설치

```bash
pkg install python-pandas
```
{:.bash}

Pandas 만 설치하면 Numpy 도 자동으로 설치가 된다.
