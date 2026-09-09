# team-assignment-01

## 고범규 

### 자기소개

안녕하세요! 저는 GCS 9기 고범규입니다!

### 관심 분야

* 운동
* 음악감상
* 영화
* 게임
* 프로그래밍
* 스타트업

### 프로젝트 경험

1. 쏙식(Ssoksik) - AI 기반 당뇨 식단 관리 솔루션 앱 개발
2. jg_estate - 중장년층 공인중개사를 위한 맞춤형 부동산 ERP 솔루션 개발
3. beomgg. - Next.js 기반 개인 포트폴리오 및 기술 블로그 제작
4. Android Memory Game - 코틀린 기반 안드로이드 네이티브 메모리 게임 앱 제작
5. CheckProduct - 공공데이터를 활용한 식품 리콜 정보 조회 서비스 백엔드 시스템 구축

### 내가 좋아하는 명언

> "신발이 없음을 한탄하다가 거리에서 발이 없는 사람을 만났다."

## 프로젝트 실행 방법

```bash
npm install
npm run dev
```

터미널에 표시되는 로컬 주소를 브라우저에서 열면 됩니다.

## 팀원 작업 및 업로드 방법

처음 참여하는 팀원은 아래 명령어를 순서대로 실행합니다.

```bash
git clone https://github.com/gobeomgyu/team-assignment-01.git
cd team-assignment-01
npm install
git switch -c feature/본인이름
```

코드를 수정한 다음 아래 명령어로 업로드합니다.

```bash
git add .
git commit -m "feat: 변경 내용 설명"
git fetch origin
git rebase origin/main
git push -u origin HEAD
```

업로드가 끝나면 GitHub에서 `Compare & pull request`를 눌러 `main` 브랜치로 Pull Request를 만듭니다. 다른 팀원의 변경과 충돌하면 다음 명령어로 최신 `main`을 다시 반영합니다.

```bash
git fetch origin
git rebase origin/main
```

충돌이 표시된 파일에서 `<<<<<<<`, `=======`, `>>>>>>>` 부분을 정리한 뒤 계속 진행합니다.

```bash
git add .
git rebase --continue
git push --force-with-lease
```

`main`에 직접 올려야 하는 경우에는 반드시 먼저 최신 내용을 받아옵니다.

```bash
git switch main
git pull --rebase origin main
git add .
git commit -m "feat: 변경 내용 설명"
git push origin main
```

