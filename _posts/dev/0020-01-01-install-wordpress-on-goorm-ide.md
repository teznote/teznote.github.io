---
layout: default
title: "구름 IDE 에 워드프레스 설치하고 사용하기"
updated: 2022-01-03
categories: dev
---

## 2022-01-03 Update

오늘 살펴보니, 구름 IDE 에서 이제 Wordpress 개발 템플릿을 21년 12월부터 제공하기 시작했다고 한다. [goormIDE 릴리즈노트](https://blog.goorm.io/goormide-release-note-december-2021/) 를 참고하자. 아래 글은 이제 필요 없을 듯~

## 구름 IDE

지금은 깃허브 페이지에서 블로그를 운영하고 있지만 한때는 워드프레스를 직접 설치해보기도 했었다. 나만의 커스텀 테마 제작 욕구에 어설픈 지식과 실력으로 제작을 해본 적도 있다.

코딩도 편하게 하면서, 워드프레스를 직접 설치해서 돌려보는데는 클라우드 IDE 만한게 없었다. 처음에는 Cloud 9 IDE 를 사용했지만 19년 여름에 완전히 [아마존 AWS](https://aws.amazon.com/ko/cloud9/)에 흡수가 되었는지 사용하기가 껄끄러워져서, 대안으로 찾은 것이 [구름 IDE](https://ide.goorm.io/)였다.

다만 아쉬운 점은 구름 IDE 는 워드프레스 개발을 위한 템플릿을 제공하지 않는다. 어쩔 수 없이 이런저런 설정을 직접 해가면서 설치할 수밖에 없다. 구글링도 하면서 오랜 시간 삽질 끝에 워드프레스 설치를 할 수 있었고 나중에 다시 필요할 수도 있기에 포스팅을 해 둔다.

이 글을 읽는 독자들께 우선 알려드리고 싶은 것은, **본인은 클라우드나 서버 혹은 웹개발 전문가도 아니고 하물며 관렵 업계 종사자도 아니다. 따라서 아래 내용들에 대한 정확성이나 안정성을 보장하지는 못한다.** 바꿔 말하자면 뭔가 이상해서 이런저런 것들을 본인에게 질문해도 제대로 대답조차 못할테니 미리 양해를 구하는 바이다.

## 구름 IDE 가입 및 컨테이너 생성

위 구름 IDE 링크를 타고 들어가서 회원가입을 한다. 이 부분은 굳이 설명하지 않는다.

회원가입 후 대시보드로 들어가면 우선 `새 컨테이너 생성`을 클릭한다. 그러면 어떤 프로젝트를 위한 컨테이너를 생성할 것인지를 묻는데 다른 사항들은 건들지 않고 아래 사항만 설정한다.

- 이름: 원하는 이름, 본인은 워드프레스의 약자인 'wp' 라고 기입
- 소프트웨어 스택: 그림들 중 'php' 선택, template 은 'PHP 프로젝트', OS 는 'Ubuntu 18.04 LTS' 선택
- 추가 모듈/패키지: 다른 옵션들은 모두 비워두고 'MySQL 설치' 만 체크

이제 오른쪽 위에 보이는 `생성(CTRL+M)` 버튼을 클릭한다. 잠시 기다리면 설치 완료가 되고, `컨테이너 실행`을 클릭하면 아래와 같은 화면이 나타난다.

![그림00]({{ '/img/web/web-0000.png' | relative_url }})

## 설정 및 설치

지금까지는 워드프레스 설치를 위한 php 서버가 준비되었을 뿐이다. IDE 내부를 보면 아래처럼 터미널 화면이 보이는데 여기에 이것저것 명령어를 순차적으로 입력해야 한다.

![그림01]({{ '/img/web/web-0001.png' | relative_url }})

터미널에 포커싱을 두고 아래 명령어들을 순서대로 입력한다. 명령어들을 입력할 때마다 뭔가 작업을 한다. 각 명령어들이 무엇을 의미하는지는 이 포스팅이 전달하고자 하는 정보수준을 넘어서니 별도로 찾아보기를 권한다.

```bash
apt update
service mysql start
mysql -u root -p
```
{:.bash}

여기까지 진행하면 패스워드를 입력하라고 하는데 아무 입력없이 그냥 엔터키만 눌러준다. 그러면 프롬프트가 `mysql>`로 바뀐다. 다시 아래 명령어들을 입력해주자. 세미콜론까지 정확하게 입력해야 한다.

```bash
create database wordpress;
exit
```
{:.bash}

다시 원래의 프롬프트로 돌아오는데, 아래명령어를 입력하여 php 버전을 확인한다.

```bash
php -v
```
{:.bash}

아래와 같이 표시가 된다.

![그림02]({{ '/img/web/web-0002.png' | relative_url }})

7.3.24 버전으로 표시되어 있다. x.x 까지만 아래처럼 입력하자.

```bash
apt install php7.3-mysql
```
{:.bash}

중간에 계속 진행하겠느냐는 물음이 나오는데 그냥 엔터를 누르면 된다. 이제 워드프레스를 설치할 차례다. 아래 명령어를 계속 수행한다.

```bash
wget https://ko.wordpress.org/latest-ko_KR.tar.gz
tar -zxvf latest-ko_KR.tar.gz &#45;&#45;strip-components=1
```
{:.bash}

## 구름 IDE 환경설정

이제 구름 IDE 설정을 일부 해야 한다. IDE 화면 왼쪽 아래에 보면 기어 모양의 아이콘이 있는데, 이를 클릭한다. 아래와 같은 화면이 나온다.

![그림03]({{ '/img/web/web-0003.png' | relative_url }})

`터미널` > `프로필` 메뉴를 선택하면, 오른쪽에 이런저런 코딩이 나오는데, 코딩 부분 제일 아래에 위와 같이 `service mysql start` 을 입력하고, `적용 후 닫기` 를 클릭한다.

위 코드는 컨테이너를 열거나, 터미널을 새로고침할 때 자동으로 실행되는 코드로, 여기에 MySQL 데이터베이스를 작동시키도록 하는 코드를 추가로 삽입한 것이다.

위 코드가 없다면 워드프레스를 돌릴 때, 데이터베이스에 접근할 수 없다는 에러를 출력하게 된다. 즉 나중에 에러가 나온다면, 터미널을 새로고침하든가, 터미널 화면에서 `service mysql start` 를 직접 실행해주든가 하면 된다.

## 워드프레스 실행 및 추가 작업

이제 IDE 화면 위쪽에 보이는 `프로젝트` 메뉴의 `실행` 을 클릭하든가 아니면 `SHIFT+F5` 키를 눌러주자. 아래와 같은 화면이 나온다.

![그림04]({{ '/img/web/web-0004.png' | relative_url }})

위 화면 오른쪽 아래에 뭔가 인터넷 주소같은 것이 보인다. 이 주소가 바로 클라우드에 설치된 워드프레스 주소가 된다.

주소 위에 커서를 대고 클릭을 한다. 자동으로 브라우저 새 탭에 워드프레스가 띄워진다. 일단은 성공적이지만 아직 끝나지 않았다. 우선 이런저런 초기화를 해주자.

그러다가 아래와 같은 화면을 만나면 아래에 표시된 대로 입력을 해주자.

![그림05]({{ '/img/web/web-0005.png' | relative_url }})

이후의 워드프레스 설정도 알아서 진행하면 된다.

워드프레스 초기 대시보드까지 나타났다면, 이제 다시 구름 IDE 창으로 돌아가보자. 아래 그림과 같이, 파일 목록에 `wp-config.php` 파일이 생성이 돼있을 것이다.

![그림06]({{ '/img/web/web-0006.png' | relative_url }})

이 파일을 더블클릭해서 열어보자. 제일 아래에 아래와 같은 코드를 삽입하고 `ctrl-s` 눌러 저장을 해준다.

```php
define('FS_METHOD', 'direct');
```
{:.php}

이 코드를 삽입하지 않으면, 워드프레스에서 플러그인을 설치하거나 업데이트를 할 때 아래와 같은 메시지가 나오며 작동을 하지 않는다.

![그림07]({{ '/img/web/web-0007.png' | relative_url }})

## 세팅 끝

짝짝짝! 👏👏👏 이제 자유껏 워드프레스 개발 이나 테스트를 즐기면 된다.