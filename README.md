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

## 주요 코드

아래 항목을 펼치면 사이트의 핵심 코드를 README에서 바로 확인할 수 있습니다.

<details open>
<summary><strong>포켓몬볼 영상 재생 및 페이지 이동 — src/main.ts</strong></summary>

```ts
import { members } from './data';

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('pokeballs-container');
  if (!container) return;

  members.forEach(member => {
    const wrapper = document.createElement('div');
    wrapper.className = 'pokeball-wrapper';
    wrapper.setAttribute('role', 'button');
    wrapper.setAttribute('tabindex', '0');
    wrapper.setAttribute('aria-label', `${member.name} 도감 열기`);

    const pokeball = document.createElement('div');
    pokeball.className = 'pokeball-image';

    const video = document.createElement('video');
    video.className = 'pokeball-video';
    video.src = `${import.meta.env.BASE_URL}videos/pokeball-opening.mp4`;
    video.muted = true;
    video.playsInline = true;
    video.preload = 'auto';
    video.setAttribute('aria-hidden', 'true');

    let isPlaying = false;

    const openMember = () => {
      window.location.href = `${import.meta.env.BASE_URL}member.html?id=${member.id}`;
    };

    const playOpeningVideo = () => {
      if (isPlaying) return;

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        openMember();
        return;
      }

      isPlaying = true;
      wrapper.classList.add('is-playing');
      wrapper.setAttribute('aria-busy', 'true');
      video.currentTime = 0;

      void video.play().catch(() => {
        isPlaying = false;
        wrapper.classList.remove('is-playing');
        wrapper.removeAttribute('aria-busy');
        openMember();
      });
    };

    video.addEventListener('ended', openMember);
    wrapper.onclick = playOpeningVideo;
    wrapper.onkeydown = event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        playOpeningVideo();
      }
    };

    pokeball.appendChild(video);

    const label = document.createElement('div');
    label.className = 'member-label';
    label.textContent = member.name;

    wrapper.appendChild(pokeball);
    wrapper.appendChild(label);
    container.appendChild(wrapper);
  });
});
```

</details>

<details>
<summary><strong>팀원 정보 — src/data.ts</strong></summary>

```ts
export interface Member {
  id: number;
  name: string;
  pokemonName: string;
  no: string;
  desc: string;
  types: string[];
  height: string;
  category: string;
  genders: ('M' | 'F')[];
  weight: string;
  ability: string;
  image: string;
}

export const members: Member[] = [
  {
    id: 1,
    name: '고범규',
    pokemonName: '규이리',
    no: 'No. 0001',
    desc: '태어났을 때부터 등에 이상한 씨앗이 심어져 있으며 몸과 함께 자란다고 한다. (더미 설명)',
    types: ['grass', 'poison'],
    height: '0.7m',
    category: '씨앗포켓몬',
    genders: ['M'],
    weight: '6.9kg',
    ability: '심록',
    image: '/images/avatar1.png'
  },
  {
    id: 2,
    name: '한영민',
    pokemonName: '민부기',
    no: 'No. 0002',
    desc: '꼬리의 불꽃은 기분을 나타낸다. 즐거우면 흔들리고 화가 나면 맹렬히 불타오른다. (더미 설명)',
    types: ['fire'],
    height: '0.6m',
    category: '도롱뇽포켓몬',
    genders: ['M'],
    weight: '8.5kg',
    ability: '맹화',
    image: '/images/avatar2.png'
  },
  {
    id: 3,
    name: '최익준',
    pokemonName: '익상해씨',
    no: 'No. 0003',
    desc: '위험해지면 등껍질에 숨어 몸을 보호한다. 입에서 물을 뿜어 공격한다. (더미 설명)',
    types: ['water'],
    height: '0.5m',
    category: '꼬마거북포켓몬',
    genders: ['M'],
    weight: '9.0kg',
    ability: '급류',
    image: '/images/avatar3.png'
  }
];
```

</details>

<details>
<summary><strong>포켓몬볼 영상과 반복 배경 — src/style.css</strong></summary>

```css
.pokeball-image {
  width: 160px;
  height: 160px;
  position: relative;
  background-image: url('/images/pokeball_closed.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  overflow: hidden;
}

.pokeball-video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.12s ease;
}

.pokeball-wrapper.is-playing .pokeball-image {
  background-image: none;
}

.pokeball-wrapper.is-playing .pokeball-video {
  opacity: 1;
}

.pokedex-main::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  background-image: url('/images/pokeball_closed.png');
  background-size: 130px auto;
  background-repeat: repeat;
  background-position: center;
  opacity: 0.055;
}
```

</details>

전체 코드는 [index.html](./index.html), [member.html](./member.html), [src/main.ts](./src/main.ts), [src/member.ts](./src/member.ts), [src/data.ts](./src/data.ts), [src/style.css](./src/style.css)에서 확인할 수 있습니다.

