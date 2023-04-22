---
layout: post
title: "오라클 클라우드, 우분투, VSCode, 도커 설치 및 세팅"
updated: 2022-03-13
categories: [dev]
tags: [dev,web]
---

## 이 포스팅은...

이 포스팅은 언젠가 다시 참고해볼 수 있도록, 개인 서버를 구축해본 경험을 바탕으로, 기업이 제공하는 클라우드 서비스를 가입하고, 세팅 및 초기화를 기록해 놓은 포스팅이다.

현재 기준으로 "평생 무료" 서버를 제공하는 [Oracle Cloud](https://www.oracle.com/kr/cloud/)에서 Ubuntu 가상 컴퓨터를 얻고, [VSCode](https://code.visualstudio.com/) 를 사용하여, 서버에 [Docker](https://www.docker.com/)까지 설치해보는 과정을 기록했다.

## Oracle Cloud 세팅

회원가입하고, 가상컴퓨터 생성하고, 기본적으로 세팅하는 내용은 [Technology & Finance 티스토리 블로그](https://technfin.tistory.com/category/%EC%BD%94%EB%94%A9%EC%8A%A4%ED%86%A0%EB%A6%AC/%ED%81%B4%EB%9D%BC%EC%9A%B0%EB%93%9C%20%EC%84%9C%EB%B2%84) 를 참고하면 된다. 어느 친절한 분이 상세하고 자세하게 포스팅한 걸 굳이 다시 정리할 필요는 없어보인다.

개인적으로는 위 블로그에서 설명한 과정과 유사하게 구성하되, 몇가지를 다르게 설정했다.

### 1. 운영체제

운영체제는 가장 많이 사용하는 Ubuntu 를 사용했다. 현재 시점에서 사용하기 가장 무난한 버전은 20.04 LTS 다.

### 2. SSH Key Gen

별도 프로그램을 다운 받기 귀찮아서, Windows 명령 프롬프트에서 Key 를 생성했다. [phoenixnap 사이트](https://phoenixnap.com/kb/generate-ssh-key-windows-10)(영문)를 참고했다.

### 3. 오라클 클라우드 포트 개방

![그림00]({{ '/img/dev/dev-0040-00.png' | relative_url }})

위와 같이 입력후, `수신 규칙 추가` 를 클릭한다. 그리고, 나머지 규칙들을 다 삭제한다. 아래와 같은 결과만 남겼다.

![그림01]({{ '/img/dev/dev-0040-01.png' | relative_url }})

*4. 생성한 VM 접속*

블로그에서 소개한 Putty 프로그램이 아니더라도 Windows 명령 프롬프트에서 아래와 같이 입력하면 접속 할 수 있다.

```bash
ssh -i [Private 키 경로,이름] ubuntu@[VM 의 공용 IP]
```
{:.명령_프롬프트}

예를들어, `ssh -i C:\Users\XXX\Downloads\my_key.key ubuntu@123.123.123.123` 과 같은 형태다.

## VSCode 세팅

다운을 받고 설치를 한다. [VSCode](https://code.visualstudio.com/download) 사이트에 접속하면 된다.

실행 후, <kdb>Ctrl + Shift + X</kdb> 키를 눌러 Extensions 창을 연다.

창에서 "remote development" 를 검색한 다음, 설치한다. 아이콘 모양이 다소 어긋난 >< 와 같이 생겼다.

설치 후, <kbd>F1</kbd> 키를 누른다. 위쪽에 작은 창이 `>` 프롬프트와 같이 생성이 된다. 그 안에 "ssh config" 를 넣으면 "Remote-SSH: Open SSH Configuration file..." 이 자동완성으로 활성화되는데, 이를 선택하자.

다시 다른 자동완성이 나오는데 "C:\Users\[사용자명]\.ssh\config" 를 선택하자.

아무것도 없는 빈 화면이 나오는데 아래와 같이 입력하고 저장한다.

```yaml
Host [원하는이름]
    User ubuntu
    HostName [VM 의 공용 IP]
    IdentityFile "[Private 키 경로,이름]"
```
{:.config}

이제 아래 그림에서 보듯, 왼쪽 아래에 보이는 "원격 탐색기" 버튼을 누르고, 왼쪽 위에 보이는 메뉴 창에서 "SSH Targets" 를 선택한다.

![그림02]({{ '/img/dev/dev-0040-02.png' | relative_url }})

다시 왼쪽에 config 파일에서 설정한 `[원하는이름]` 이 나오는데, 이 이름 위에 마우스 커서를 두고 오른쪽 버튼을 눌러 실행시킨다.

다시금 가운데 위쪽에 다시 작은 창이 열리는데 "Linux" 를 선택한다.

이제 원격 접속이 되었다. 최종적으로는 아래와 같다.

![그림03]({{ '/img/dev/dev-0040-03.png' | relative_url }})

왼쪽 아래에 보면 녹색 창으로 어디에 원격접속이 되어있는지를 확인할 수 있다.

## Ubuntu 세팅 및 Docker 설치

왜인지는 모르겠는데, 개인적으로는 자꾸 방화벽 프로그램이 말썽을 부렸다. 그래서 그냥 다 삭제해버렸다. 터미널 화면에서 아래와 같이 실행한다.

```bash
sudo -s
apt purge ufw
apt purge iptables
```
{:.bash}

다음으로 docker 를 설치하였다. [Docker 도움말(영문)](https://docs.docker.com/engine/install/ubuntu/) 을 참고하여 설치하면 된다.

설치 후에는 아래와 같이 권한을 설정해준다.

```bash
chmod 777 /var/run/docker.sock
```
{:.bash}

VSCode 에서 원격으로 접속한 뒤, 위 그림에서 보인 "원격 탐색기" 화면에서 "SSH Target" 대신 "Containers" 를 선택하면, 컨테이너들을 볼 수 있고, Attach 할 수도 있다.

## 참고할 사항

터미널에서 docker 관련 명령어를 썼는데 아래와 같은 에러가 나올 수 있다.

```plaintext
Cannot connect to the Docker daemon at unix:///var/run/docker.sock. Is the docker daemon running?
```
{:.bash}

구글링 등을 하면 나오는 일반적인 방법으로는 잘 안되었다. 아래와 같이 해결할 수 있었다.

```bash
ps -ef | grep dockerd
```
{:.bash}

PID 번호를 확인한 뒤,

```bash
kill -9 [PID번호]
service docker start
```
{:.bash}