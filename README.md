# team-assignment-01

## [👉 팀원 소개 페이지 바로가기](https://hanyoungmin13.github.io/tut01/)

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

## 팀원이 코드 가져와서 실행하기

이 저장소에는 사이트를 실행하는 실제 소스 코드가 모두 포함되어 있습니다. Visual Studio Code 터미널에서 아래 명령어를 순서대로 실행하면 됩니다.

```bash
git clone https://github.com/gobeomgyu/team-assignment-01.git
cd team-assignment-01
npm install
npm run dev
```

Windows PowerShell에서 실행 정책 오류가 나면 `npm.cmd install`, `npm.cmd run dev`를 사용하세요. 현재 Vite 기본 경로는 `/team-assignment-01/`이며 터미널에 표시되는 전체 주소로 접속하면 됩니다.

## 랜딩 페이지 동작과 검증

포켓볼은 왼쪽부터 **파이리 → 이상해씨 → 꼬부기**입니다. 클릭하면 포켓볼이 열리고 포켓몬이 튀어나와 왼쪽으로 이동하며, 도감 배경과 정보는 오른쪽에서 들어옵니다. 휴대폰에서는 포켓몬 아래에 정보를 배치합니다.

도감에서는 이전·다음 포켓몬, 다시 선택하기, 특성 설명을 사용할 수 있습니다. 키보드 Enter·Space로 선택하고 Escape로 돌아갈 수 있으며, 기기의 동작 줄이기 설정을 따릅니다.

`src/data.ts`에서 포켓몬 정보와 팀원 이름을 수정하고, `src/app.ts`에서 애니메이션을 조정합니다. 이미지는 `public/images/`에 있고 `src/paths.ts`가 Vite의 배포 경로에 맞게 연결합니다.

- `npm run build`: 페이지, Vite·Playwright 설정, 테스트의 TypeScript 검사 후 프로덕션 빌드
- `npm run test:e2e`: 프로덕션 빌드 후 Chrome에서 데스크톱·모바일 동작 검증 (Chrome 설치 필요)

브라우저 테스트 캡처와 실패 추적은 `test-results/`에 저장됩니다.

터미널에 표시되는 주소를 `Ctrl`을 누른 채 클릭하면 사이트가 열립니다. `127.0.0.1` 주소는 실행한 사람의 컴퓨터에서만 열립니다.

Git을 사용하지 않는 경우에는 GitHub의 초록색 **Code** 버튼을 누른 뒤 **Download ZIP**을 선택하고, 압축을 푼 폴더를 Visual Studio Code에서 열면 됩니다. 그다음 터미널에서 아래 명령어를 실행합니다.

```bash
npm install
npm run dev
```
