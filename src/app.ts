import { members, typeLabels, type Member } from './data';
import { basePath, imagePath } from './paths';

const HOME_TITLE = '오박사의 연구소 | 첫 번째 파트너';
const OPEN_BALL_IMAGE = imagePath('pokeball_open.png');

export function setupApp(startWithDetail = false) {
  const app = document.querySelector<HTMLDivElement>('#app');
  if (!app) return;

  app.innerHTML = `
    <header class="site-header">
      <a class="brand" href="${basePath}" aria-label="오박사의 연구소, 처음으로">
        <span class="pokeball-mark" aria-hidden="true"></span>
        <span>오박사의 연구소<span class="brand-subtitle">PROFESSOR OAK'S LAB</span></span>
      </a>
      <div class="header-location"><span class="status-dot"></span> 태초마을 <span class="location-divider">/</span> KANTO REGION</div>
    </header>
    <main class="scene" id="scene" data-phase="selection">
      <section class="landing" id="landing" aria-labelledby="welcome-title">
        <div class="welcome">
          <div class="professor">
            <div class="oak-frame">
              <img class="oak-image professor-normal" src="${imagePath('professor.png')}" alt="연구소에서 반갑게 맞아주는 오박사" fetchpriority="high" />
              <img class="oak-image professor-hover" src="${imagePath('professor real.png')}" alt="연구소에서 반갑게 맞아주는 오박사" fetchpriority="high" />
            </div>
            <span class="professor-caption"><span class="status-dot"></span> 오박사 <span>포켓몬 연구가</span></span>
          </div>
          <div class="welcome-copy">
            <p class="eyebrow"><span></span> EVERY ADVENTURE STARTS WITH A FRIEND</p>
            <h1 id="welcome-title">너의 첫 번째 <em>파트너</em>를<br />만날 시간이란다!</h1>
            <p class="welcome-description">이곳에 세 마리의 포켓몬이 기다리고 있단다.<br />마음에 드는 포켓볼을 열어, 새로운 친구를 만나보렴.</p>
            <span class="professor-signature">— 오박사</span>
          </div>
        </div>
        <div class="selection-heading"><span>CHOOSE YOUR PARTNER</span><span>세 개의 포켓볼, 새로운 모험의 시작</span></div>
        <div class="pokeballs-container" id="pokeballs-container">
          ${members.map((member, index) => `
            <button class="pokeball-choice" type="button" data-member-id="${member.id}" style="--accent: ${member.color}; --accent-soft: ${member.softColor}" aria-label="${index + 1}번째 포켓볼 열기: ${member.pokemonName}">
              <span class="choice-number">0${index + 1}<span>${member.no}</span></span>
              <span class="ball-stage">
                <span class="ball-halo"></span>
                <img class="ball-closed" src="${imagePath('pokeball_closed.png')}" alt="닫힌 포켓볼" draggable="false" />
                <img class="ball-open" src="${OPEN_BALL_IMAGE}" alt="" aria-hidden="true" draggable="false" />
                <span class="ball-flash" aria-hidden="true"></span>
              </span>
              <span class="choice-copy"><span><span class="choice-name">${member.pokemonName}</span><span class="choice-english">${member.englishName}</span></span><span class="choice-arrow" aria-hidden="true">↗</span></span>
              <span class="choice-hint"><span class="type-dot"></span>${member.introduction}</span>
            </button>
          `).join('')}
        </div>
        <p class="selection-tip"><span class="tiny-ball" aria-hidden="true"></span> 포켓볼을 클릭하면 파트너가 나타나요</p>
      </section>
      <section class="detail-view" id="detail-view" aria-label="파트너 도감" hidden inert>
        <div class="detail-backdrop" aria-hidden="true"></div>
        <div class="detail-topbar">
          <button class="back-button" id="back-button" type="button"><span aria-hidden="true">←</span> 다시 선택하기</button>
          <span class="detail-topbar-title">PARTNER POKÉDEX <span>관동지방 도감</span></span>
          <span class="detail-counter" id="detail-counter"></span>
        </div>
        <div class="pokedex-card">
          <div class="card-surface" aria-hidden="true"></div>
          <div class="pokemon-visual">
            <div class="art-decoration" aria-hidden="true"><span class="art-orbit"></span><span class="art-number" id="art-number"></span></div>
            <img id="member-image" class="pokemon-image" alt="" draggable="false" />
            <p class="art-caption"><span class="status-dot"></span><span id="art-caption"></span></p>
          </div>
          <article class="detail-info" aria-labelledby="member-name">
            <div class="detail-title detail-line"><span class="member-no" id="member-no"></span><h1 id="member-name" tabindex="-1"></h1><span class="member-english" id="member-english"></span></div>
            <div class="detail-line"><span class="region-badge"><span aria-hidden="true">✓</span> 관동지방 · 첫 파트너 포켓몬</span><p class="member-desc" id="member-desc"></p></div>
            <dl class="member-info-grid detail-line">
              <div class="info-item"><dt>타입</dt><dd class="types" id="member-types"></dd></div>
              <div class="info-item"><dt>키</dt><dd id="member-height"></dd></div>
              <div class="info-item"><dt>분류</dt><dd id="member-category"></dd></div>
              <div class="info-item"><dt>성별</dt><dd class="genders" id="member-genders"></dd></div>
              <div class="info-item"><dt>몸무게</dt><dd id="member-weight"></dd></div>
              <div class="info-item"><dt>특성</dt><dd><span id="member-ability"></span><button class="help-icon" id="ability-help" type="button" aria-expanded="false" aria-controls="ability-description" aria-label="특성 설명 보기">?</button></dd></div>
              <div class="info-item"><dt>추가 정보 1</dt><dd>더미 데이터</dd></div>
              <div class="info-item"><dt>추가 정보 2</dt><dd>더미 데이터</dd></div>
              <div class="info-item"><dt>추가 정보 3</dt><dd>더미 데이터</dd></div>
            </dl>
            <p class="ability-description" id="ability-description" hidden></p>

            <button class="action-button detail-line" id="choose-again" style="margin-top: 10px;" type="button">다른 파트너도 만나보기 <span aria-hidden="true">→</span></button>
          </article>
        </div>
        <nav class="detail-navigation" aria-label="다른 포켓몬 보기">
          <button class="nav-button" id="prev-btn" type="button"><span aria-hidden="true">←</span><span><small id="prev-no"></small><strong id="prev-name"></strong></span></button>
          <div class="dex-pagination" id="dex-pagination"></div>
          <button class="nav-button next-button" id="next-btn" type="button"><span><small id="next-no"></small><strong id="next-name"></strong></span><span aria-hidden="true">→</span></button>
        </nav>
      </section>
    </main>
    <footer class="site-footer"><span>작은 만남에서 시작되는, 우리의 이야기.</span><span>GCS <span class="footer-cross">×</span> POKÉMON <span class="footer-year">2026</span></span></footer>
    <p class="sr-only" id="announcement" role="status" aria-live="polite"></p>
  `;

  const get = <T extends HTMLElement = HTMLElement>(id: string) => document.getElementById(id) as T;
  const scene = get('scene');
  const landing = get('landing');
  const detail = get('detail-view');
  const pokemonImage = get<HTMLImageElement>('member-image');
  const choices = [...document.querySelectorAll<HTMLButtonElement>('.pokeball-choice')];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const animations = new Set<Animation>();
  const imageCache = new Map<string, Promise<void>>();
  let current: Member | undefined;
  let busy = false;
  let sequence = 0;
  let lastChoice = choices[0];
  let flyer: HTMLImageElement | undefined;

  function preload(src: string): Promise<void> {
    const cached = imageCache.get(src);
    if (cached) return cached;
    const image = new Image();
    image.src = src;
    const ready = image.decode().catch(() => {
      imageCache.delete(src);
      throw new Error(`Image unavailable: ${src}`);
    });
    imageCache.set(src, ready);
    return ready;
  }

  // Decode before release so the first animation has no missing-image frame.
  for (const src of [OPEN_BALL_IMAGE, ...members.map(member => member.image)]) {
    void preload(src).catch(() => { });
  }

  async function animate(element: Element, keyframes: Keyframe[], duration: number, delay = 0) {
    const animation = element.animate(keyframes, {
      duration: reducedMotion.matches ? 1 : duration,
      delay: reducedMotion.matches ? 0 : delay,
      easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
      fill: 'both',
    });
    animations.add(animation);
    // Back/forward and Escape can cancel a running transition.
    await animation.finished.catch(() => { });
  }

  function cancelAnimations() {
    sequence++;
    animations.forEach(animation => animation.cancel());
    animations.clear();
    flyer?.remove();
    flyer = undefined;
  }

  function setBusy(value: boolean) {
    busy = value;
    scene.setAttribute('aria-busy', String(value));
    choices.forEach(button => { button.disabled = value; });
    detail.querySelectorAll<HTMLButtonElement>('.nav-button, .dex-dot').forEach(button => { button.disabled = value; });
  }

  function updateUrl(member?: Member) {
    const url = new URL(window.location.href);
    if (member) url.searchParams.set('id', String(member.id));
    else {
      url.pathname = basePath;
      url.searchParams.delete('id');
    }
    if (url.href !== window.location.href) window.history.pushState({}, '', url);
  }

  function renderMember(member: Member) {
    current = member;
    scene.style.setProperty('--accent', member.color);
    scene.style.setProperty('--accent-soft', member.softColor);
    document.title = `${member.pokemonName} | 파트너 도감`;
    const values: Record<string, string> = {
      'member-no': member.no, 'member-name': member.pokemonName,
      'member-english': member.englishName, 'member-desc': member.desc,
      'member-height': member.height, 'member-category': member.category,
      'member-weight': member.weight, 'member-ability': member.ability,
      'ability-description': member.abilityDescription,
      'art-number': member.no.replace('No. ', ''), 'art-caption': member.introduction,
    };
    Object.entries(values).forEach(([id, value]) => { get(id).textContent = value; });
    pokemonImage.width = member.imageSize[0];
    pokemonImage.height = member.imageSize[1];
    pokemonImage.style.setProperty('--art-ratio', String(member.imageSize[0] / member.imageSize[1]));
    pokemonImage.dataset.pokemon = member.englishName.toLowerCase();
    pokemonImage.src = member.image;
    pokemonImage.alt = member.pokemonName;
    get('member-types').innerHTML = member.types.map(type => `<span class="type-badge type-${type}">${typeLabels[type]}</span>`).join('');
    get('member-genders').innerHTML = member.genders.map(gender => `<span class="gender-${gender.toLowerCase()}" aria-label="${gender === 'M' ? '수컷' : '암컷'}">${gender === 'M' ? '♂' : '♀'}</span>`).join('');
    get('ability-description').hidden = true;
    get('ability-help').setAttribute('aria-expanded', 'false');
    const index = members.indexOf(member);
    const previous = members[(index + members.length - 1) % members.length];
    const next = members[(index + 1) % members.length];
    get('prev-no').textContent = previous.no;
    get('prev-name').textContent = previous.pokemonName;
    get('next-no').textContent = next.no;
    get('next-name').textContent = next.pokemonName;
    get('detail-counter').textContent = `0${index + 1} / 03`;
    get('dex-pagination').innerHTML = members.map(item => `<button class="dex-dot ${item.id === member.id ? 'is-current' : ''}" type="button" data-id="${item.id}" aria-label="${item.pokemonName} 도감 보기" ${item.id === member.id ? 'aria-current="true"' : ''}></button>`).join('');
  }

  function showSelection(focus = true, pushHistory = true) {
    cancelAnimations();
    current = undefined;
    detail.hidden = true;
    detail.inert = true;
    detail.classList.remove('is-staged');
    landing.hidden = false;
    landing.inert = false;
    choices.forEach(button => button.classList.remove('is-selected'));
    scene.dataset.phase = 'selection';
    scene.style.removeProperty('--accent');
    scene.style.removeProperty('--accent-soft');
    document.title = HOME_TITLE;
    setBusy(false);
    if (pushHistory) updateUrl();
    if (focus) lastChoice.focus({ preventScroll: true });
    get('announcement').textContent = '포켓볼을 골라 다른 파트너를 만나보세요.';
  }

  function finishDetail(member: Member, focus = true) {
    landing.hidden = true;
    landing.inert = true;
    detail.hidden = false;
    detail.inert = false;
    detail.classList.remove('is-staged');
    scene.dataset.phase = 'detail';
    cancelAnimations();
    setBusy(false);
    if (focus) get('member-name').focus({ preventScroll: true });
    get('announcement').textContent = `${member.pokemonName} 등장! ${member.types.map(type => typeLabels[type]).join(', ')} 타입의 ${member.category}입니다.`;
  }

  function slideIn(element: Element, duration: number, delay = 0, distance = '110vw') {
    return animate(element, [
      { transform: `translateX(${distance})`, opacity: 0 },
      { transform: 'translateX(0)', opacity: 1 },
    ], duration, delay);
  }

  async function openBall(member: Member, button: HTMLButtonElement) {
    if (busy) return;
    cancelAnimations();
    const run = sequence;
    lastChoice = button;
    setBusy(true);
    scene.dataset.phase = 'opening';
    get('announcement').textContent = `${member.pokemonName}의 포켓볼을 열고 있어요.`;
    try {
      await Promise.all([preload(member.image), preload(OPEN_BALL_IMAGE)]);
    } catch {
      if (run !== sequence) return;
      showSelection();
      get('announcement').textContent = '이미지를 불러오지 못했어요. 포켓볼을 다시 눌러 주세요.';
      return;
    }
    if (run !== sequence) return;
    button.classList.add('is-selected');
    const closed = button.querySelector<HTMLImageElement>('.ball-closed')!;
    const opened = button.querySelector<HTMLImageElement>('.ball-open')!;
    const flash = button.querySelector<HTMLElement>('.ball-flash')!;
    await animate(closed, [
      { transform: 'rotate(0deg)' }, { transform: 'rotate(-14deg)', offset: 0.2 },
      { transform: 'rotate(12deg)', offset: 0.4 }, { transform: 'rotate(-9deg)', offset: 0.6 },
      { transform: 'rotate(7deg)', offset: 0.8 }, { transform: 'rotate(0deg)' },
    ], 420);
    if (run !== sequence) return;
    await Promise.all([
      animate(closed, [{ opacity: 1, transform: 'scale(1)' }, { opacity: 0, transform: 'translateY(-14px) scale(0.78)' }], 240),
      animate(opened, [{ opacity: 0, transform: 'translateY(12px) scale(0.8)' }, { opacity: 1, transform: 'translateY(-12px) scale(1.12)' }], 360),
      animate(flash, [{ opacity: 0, transform: 'scale(0.15)' }, { opacity: 0.85, offset: 0.4 }, { opacity: 0, transform: 'scale(2.8)' }], 640, 120),
    ]);
    if (run !== sequence) return;
    renderMember(member);
    detail.classList.add('is-staged');
    detail.hidden = false;
    landing.inert = true;
    scene.dataset.phase = 'revealing';

    if (reducedMotion.matches) {
      updateUrl(member);
      finishDetail(member);
      return;
    }

    // Measure after opening, since the viewport may have changed during the shake.
    const ballRect = button.querySelector<HTMLElement>('.ball-stage')!.getBoundingClientRect();
    const target = pokemonImage.getBoundingClientRect();
    const startX = ballRect.left + ballRect.width / 2 - target.left - target.width / 2;
    const startY = ballRect.top + ballRect.height / 2 - target.top - target.height / 2;
    const middleX = window.innerWidth / 2 - target.left - target.width / 2;
    const middleY = Math.min(window.innerHeight * 0.4, 360) - target.top - target.height / 2;
    flyer = pokemonImage.cloneNode() as HTMLImageElement;
    flyer.removeAttribute('id');
    flyer.className = 'pokemon-flyer';
    flyer.alt = '';
    flyer.setAttribute('aria-hidden', 'true');
    Object.assign(flyer.style, { left: `${target.left}px`, top: `${target.top}px`, width: `${target.width}px`, height: `${target.height}px` });
    document.body.appendChild(flyer);

    // Jump out of the chosen ball, pause at center, then travel to the left.
    // The background and text enter from the right on independent layers.
    await Promise.all([
      animate(flyer, [
        { transform: `translate(${startX}px, ${startY}px) scale(0.08) rotate(-12deg)`, opacity: 0 },
        { transform: `translate(${middleX}px, ${middleY - 30}px) scale(1.08) rotate(5deg)`, opacity: 1, offset: 0.36 },
        { transform: `translate(${middleX}px, ${middleY}px) scale(1) rotate(0deg)`, opacity: 1, offset: 0.53 },
        { transform: 'translate(0, 0) scale(1)', opacity: 1 },
      ], 1400),
      animate(landing, [{ opacity: 1 }, { opacity: 0 }], 300),
      slideIn(detail.querySelector('.detail-backdrop')!, 820, 420),
      slideIn(detail.querySelector('.card-surface')!, 900, 480),
      slideIn(detail.querySelector('.detail-topbar')!, 750, 650),
      slideIn(detail.querySelector('.detail-info')!, 950, 660),
      ...[...detail.querySelectorAll('.detail-line')].map((element, index) => slideIn(element, 600, 760 + index * 65, '90px')),
      animate(detail.querySelector('.art-decoration')!, [{ opacity: 0, transform: 'scale(0.8)' }, { opacity: 1, transform: 'scale(1)' }], 700, 900),
      animate(detail.querySelector('.art-caption')!, [{ opacity: 0 }, { opacity: 1 }], 450, 1150),
      slideIn(detail.querySelector('.detail-navigation')!, 650, 980),
    ]);
    if (run !== sequence) return;
    updateUrl(member);
    finishDetail(member);
  }

  async function switchMember(member: Member) {
    if (busy || current?.id === member.id) return;
    cancelAnimations();
    const run = sequence;
    setBusy(true);
    try {
      await preload(member.image);
    } catch {
      if (run === sequence) {
        setBusy(false);
        get('announcement').textContent = '이미지를 불러오지 못했어요. 다시 시도해 주세요.';
      }
      return;
    }
    if (run !== sequence) return;
    await Promise.all([
      animate(pokemonImage, [{ opacity: 1, transform: 'translateX(0)' }, { opacity: 0, transform: 'translateX(-35px)' }], 180),
      animate(detail.querySelector('.detail-info')!, [{ opacity: 1 }, { opacity: 0 }], 180),
    ]);
    if (run !== sequence) return;
    renderMember(member);
    setBusy(true);
    await Promise.all([
      animate(pokemonImage, [{ opacity: 0, transform: 'translateX(60px) scale(0.9)' }, { opacity: 1, transform: 'translateX(0) scale(1)' }], 600),
      slideIn(detail.querySelector('.detail-info')!, 650, 60),
    ]);
    if (run !== sequence) return;
    updateUrl(member);
    finishDetail(member);
  }

  choices.forEach(button => {
    button.addEventListener('click', () => {
      const member = members.find(item => item.id === Number(button.dataset.memberId))!;
      void openBall(member, button);
    });
  });
  get('back-button').addEventListener('click', () => showSelection());
  get('choose-again').addEventListener('click', () => showSelection());
  document.querySelector<HTMLAnchorElement>('.brand')!.addEventListener('click', event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    showSelection(false);
  });
  get('prev-btn').addEventListener('click', () => {
    if (current) void switchMember(members[(members.indexOf(current) + members.length - 1) % members.length]);
  });
  get('next-btn').addEventListener('click', () => {
    if (current) void switchMember(members[(members.indexOf(current) + 1) % members.length]);
  });
  get('dex-pagination').addEventListener('click', event => {
    const button = (event.target as HTMLElement).closest<HTMLButtonElement>('[data-id]');
    const member = members.find(item => item.id === Number(button?.dataset.id));
    if (member) void switchMember(member);
  });
  get('ability-help').addEventListener('click', () => {
    const description = get('ability-description');
    description.hidden = !description.hidden;
    get('ability-help').setAttribute('aria-expanded', String(!description.hidden));
  });
  window.addEventListener('keydown', event => {
    if (event.key === 'Escape' && (current || busy)) showSelection();
  });

  function restoreFromUrl(initial = false) {
    cancelAnimations();
    const id = new URLSearchParams(window.location.search).get('id');
    const member = members.find(item => item.id === Number(id));
    if (member || (initial && startWithDetail)) {
      const selected = member ?? members[0];
      if (!member) {
        const url = new URL(window.location.href);
        url.searchParams.set('id', String(selected.id));
        window.history.replaceState({}, '', url);
      }
      lastChoice = choices[members.indexOf(selected)];
      renderMember(selected);
      finishDetail(selected, !initial);
    } else showSelection(!initial, false);
  }
  window.addEventListener('popstate', () => restoreFromUrl());
  // Complete against the new layout if the viewport changes during a release.
  window.addEventListener('resize', () => {
    if (busy && current && scene.dataset.phase === 'revealing') {
      updateUrl(current);
      finishDetail(current);
    }
  });
  restoreFromUrl(true);
}
