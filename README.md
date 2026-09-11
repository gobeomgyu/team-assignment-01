# team-assignment-01

포켓몬 도감 컨셉의 GCS 9기 팀원 소개 랜딩 페이지입니다. 포켓볼을 클릭해 포켓몬 애니메이션과 함께 팀원 정보를 확인할 수 있으며, 모바일과 데스크톱 환경을 모두 지원하는 정적 웹사이트입니다.

## 대상
- **웹사이트**: [https://hanyoungmin13.github.io/tut01/](https://hanyoungmin13.github.io/tut01/)
- **저장소**: [https://github.com/gobeomgyu/team-assignment-01](https://github.com/gobeomgyu/team-assignment-01)
- **데이터 관리**: `src/data.ts` (포켓몬 정보 및 팀원 이름)

## 최초 설정
Visual Studio Code 터미널 등에서 저장소를 클론하고 패키지를 설치합니다. Git을 사용하지 않는 경우 GitHub의 **Code** 버튼을 눌러 **Download ZIP**으로 코드를 다운로드한 후 터미널에서 진행할 수 있습니다.

```bash
git clone https://github.com/gobeomgyu/team-assignment-01.git
cd team-assignment-01
npm install
```
*(Windows PowerShell에서 실행 정책 오류 시 `npm.cmd install` 사용)*

## 로컬 실행
```bash
npm run dev
```
*(Windows PowerShell에서 실행 정책 오류 시 `npm.cmd run dev` 사용)*

현재 Vite 기본 경로는 `/team-assignment-01/`이며, 터미널에 표시되는 로컬 주소를 `Ctrl`을 누른 채 클릭하여 접속하면 사이트를 확인할 수 있습니다. (`127.0.0.1` 주소는 실행한 컴퓨터에서만 열립니다.)

## 관리
포켓몬 정보 및 팀원 데이터는 `src/data.ts`에서 수정하고, 포켓몬 이동 및 도감 표시 등 애니메이션 동작은 `src/app.ts`에서 제어합니다. 이미지는 `public/images/`에 위치하며 `src/paths.ts`가 Vite 배포 경로에 맞게 연결합니다. 키보드(Enter, Space, Escape)로도 도감을 조작할 수 있으며 기기의 동작 줄이기 설정을 따릅니다.

## 검증
```bash
npm run build
npm run test:e2e
```
- `npm run build`: 페이지, Vite·Playwright 설정, 테스트의 TypeScript 검사 후 프로덕션 빌드를 수행합니다.
- `npm run test:e2e`: 프로덕션 빌드 후 Chrome 환경에서 데스크톱 및 모바일 동작을 검증합니다.
- 브라우저 테스트 캡처와 실패 추적 결과는 `test-results/` 폴더에 저장됩니다.

---

## [👉 팀원 소개 페이지 바로가기](https://hanyoungmin13.github.io/tut01/)

<<<<<<< HEAD
=======

## 팀원이 코드 가져와서 실행하기

이 저장소에는 사이트를 실행하는 실제 소스 코드가 모두 포함되어 있습니다. Visual Studio Code 터미널에서 아래 명령어를 순서대로 실행하면 됩니다.
>>>>>>> 2720dabd6f0b9c2641422082e5d4c4d9deb57dcb

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
