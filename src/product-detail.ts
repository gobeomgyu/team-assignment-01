import { basePath } from './paths';
import { products, type Product } from './products';
import { renderProductFrame } from './product-art';
import { playSound } from './sound';

export function setupProductDetails(app: HTMLElement) {
  const get = <T extends HTMLElement = HTMLElement>(id: string) => app.querySelector<T>(`#${id}`)!;
  const main = get('store-main');
  const catalog = get('store-catalog');
  const detail = get('product-detail');
  const photo = get('product-detail-photo');
  const title = get('product-title');
  const links = [...catalog.querySelectorAll<HTMLAnchorElement>('.product-card-link')];
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const animations = new Set<Animation>();
  let current: Product | undefined;
  let lastLink = links[0];
  let catalogScrollY = Number(window.history.state?.catalogScrollY) || 0;
  let busy = false;
  let sequence = 0;
  let flyer: HTMLElement | undefined;
  let overlay: HTMLElement | undefined;

  // Each catalog history entry remembers where its product was opened.
  window.history.scrollRestoration = 'manual';

  function cancelAnimations() {
    sequence++;
    animations.forEach(animation => animation.cancel());
    animations.clear();
    flyer?.remove();
    overlay?.remove();
    flyer = overlay = undefined;
  }

  function setBusy(value: boolean) {
    busy = value;
    main.setAttribute('aria-busy', String(value));
    links.forEach(link => {
      if (value) link.setAttribute('aria-disabled', 'true');
      else link.removeAttribute('aria-disabled');
    });
  }

  function updateUrl(product?: Product) {
    const url = new URL(window.location.href);
    if (product) url.searchParams.set('product', product.id);
    else url.searchParams.delete('product');
    if (url.href !== window.location.href) window.history.pushState({ catalogScrollY }, '', url);
  }

  function renderProduct(product: Product) {
    current = product;
    main.style.setProperty('--accent', product.color);
    main.style.setProperty('--accent-soft', product.background);
    photo.style.setProperty('--product-accent', product.color);
    photo.style.setProperty('--product-background', product.background);
    photo.innerHTML = renderProductFrame(product, true);
    title.textContent = product.name;
    get('product-collection').textContent = product.collection;
    get('product-tagline').textContent = product.description;
    get('product-description').textContent = product.detailDescription;
    get('product-specs').innerHTML = product.details.map(item => `<div><dt>${item.label}</dt><dd>${item.value}</dd></div>`).join('');
    get('product-counter').textContent = `${String(products.indexOf(product) + 1).padStart(2, '0')} / 09`;
    const dexLink = get<HTMLAnchorElement>('product-dex-link');
    dexLink.href = `${basePath}member.html?id=${product.memberId}`;
    dexLink.textContent = `${product.character} 도감 보기 ↗`;
    document.title = `${product.name} | 스토어`;
    main.setAttribute('aria-labelledby', 'product-title');
  }

  function finishDetail(focus = true) {
    cancelAnimations();
    catalog.hidden = true;
    catalog.inert = true;
    detail.hidden = false;
    detail.inert = false;
    detail.classList.remove('is-entering');
    main.dataset.phase = 'detail';
    setBusy(false);
    if (focus) title.focus({ preventScroll: true });
    get('store-announcement').textContent = `${current?.name} 상품 설명을 보고 있어요.`;
  }

  function showCatalog(pushHistory = true, focus = true) {
    cancelAnimations();
    current = undefined;
    detail.hidden = true;
    detail.inert = true;
    detail.classList.remove('is-entering');
    catalog.hidden = false;
    catalog.inert = false;
    main.dataset.phase = 'catalog';
    main.setAttribute('aria-labelledby', 'store-title');
    main.style.removeProperty('--accent');
    main.style.removeProperty('--accent-soft');
    document.title = '스토어 | 김박사의 연구소';
    setBusy(false);
    if (pushHistory) updateUrl();
    window.scrollTo({ top: catalogScrollY, behavior: 'instant' });
    if (focus) lastLink?.focus({ preventScroll: true });
    get('store-announcement').textContent = '상품 목록으로 돌아왔어요.';
  }

  async function animate(element: Element, frames: Keyframe[], duration: number, delay = 0) {
    const animation = element.animate(frames, {
      duration, delay, easing: 'cubic-bezier(.22, 1, .36, 1)', fill: 'both',
    });
    animations.add(animation);
    await animation.finished.catch(() => { /* Escape and browser history cancel the transition. */ });
  }

  function slideIn(element: Element, duration: number, delay: number, distance = '110vw') {
    return animate(element, [
      { transform: `translateX(${distance})`, opacity: 0 },
      { transform: 'translateX(0)', opacity: 1 },
    ], duration, delay);
  }

  async function openProduct(product: Product, link: HTMLAnchorElement) {
    if (busy) return;
    cancelAnimations();
    const run = sequence;
    lastLink = link;
    catalogScrollY = window.scrollY;
    setBusy(true);
    main.dataset.phase = 'loading';
    try {
      const image = new Image();
      image.src = product.image;
      await image.decode();
    } catch {
      if (run !== sequence) return;
      main.dataset.phase = 'catalog';
      setBusy(false);
      get('store-announcement').textContent = '상품 이미지를 불러오지 못했어요. 상품을 다시 눌러 주세요.';
      return;
    }
    if (run !== sequence) return;

    // Measure the clicked frame before changing the document's scroll position.
    const source = link.closest<HTMLElement>('.product-card')!.getBoundingClientRect();
    catalogScrollY = window.scrollY;
    window.history.replaceState({ ...window.history.state, catalogScrollY }, '', window.location.href);
    if (!motion.matches) {
      const bounds = catalog.getBoundingClientRect();
      overlay = catalog.cloneNode(true) as HTMLElement;
      overlay.removeAttribute('id');
      overlay.querySelectorAll('[id]').forEach(element => element.removeAttribute('id'));
      overlay.classList.add('store-transition-overlay');
      overlay.inert = true;
      overlay.setAttribute('aria-hidden', 'true');
      Object.assign(overlay.style, { left: `${bounds.left}px`, top: `${bounds.top}px`, width: `${bounds.width}px` });
      document.body.appendChild(overlay);
    }
    renderProduct(product);
    updateUrl(product);
    catalog.hidden = true;
    catalog.inert = true;
    detail.hidden = false;
    detail.classList.add('is-entering');
    main.dataset.phase = 'revealing';
    window.scrollTo({ top: 0, behavior: 'instant' });
    playSound('appear');

    if (motion.matches) {
      finishDetail();
      return;
    }

    const target = photo.getBoundingClientRect();
    const fromX = source.left + source.width / 2 - target.left - target.width / 2;
    const fromY = source.top + source.height / 2 - target.top - target.height / 2;
    const centerX = innerWidth / 2 - target.left - target.width / 2;
    const centerY = Math.min(innerHeight * 0.48, 420) - target.top - target.height / 2;
    flyer = photo.cloneNode(true) as HTMLElement;
    flyer.removeAttribute('id');
    flyer.classList.add('product-flyer');
    flyer.setAttribute('aria-hidden', 'true');
    Object.assign(flyer.style, { left: `${target.left}px`, top: `${target.top}px`, width: `${target.width}px`, height: `${target.height}px` });
    document.body.appendChild(flyer);

    await Promise.all([
      animate(flyer, [
        { transform: `translate(${fromX}px, ${fromY}px) scale(${source.width / target.width}, ${source.height / target.height}) rotate(-1deg)` },
        { transform: `translate(${centerX}px, ${centerY}px) scale(1.02) rotate(3deg)`, offset: 0.38 },
        { transform: `translate(${centerX}px, ${centerY}px) scale(1) rotate(0deg)`, offset: 0.52 },
        { transform: 'translate(0, 0) scale(1)' },
      ], 1300),
      animate(overlay!, [{ opacity: 1 }, { opacity: 0 }], 320),
      slideIn(detail.querySelector('.detail-backdrop')!, 850, 150),
      slideIn(detail.querySelector('.card-surface')!, 850, 200),
      slideIn(detail.querySelector('.detail-topbar')!, 750, 250),
      slideIn(detail.querySelector('.product-detail-info')!, 950, 300),
      ...[...detail.querySelectorAll('.product-detail-line')].map((element, index) => slideIn(element, 650, 450 + index * 55, '80px')),
    ]);
    if (run === sequence) finishDetail();
  }

  links.forEach(link => link.addEventListener('click', event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;
    event.preventDefault();
    const product = products.find(item => item.id === link.dataset.productId);
    if (product) void openProduct(product, link);
  }));
  get('product-back').addEventListener('click', () => showCatalog());
  get('product-back-bottom').addEventListener('click', () => showCatalog());
  window.addEventListener('keydown', event => {
    if (event.key === 'Escape' && (current || busy)) showCatalog();
  });

  function restoreFromUrl(initial = false) {
    cancelAnimations();
    catalogScrollY = Number(window.history.state?.catalogScrollY) || 0;
    const url = new URL(window.location.href);
    const product = products.find(item => item.id === url.searchParams.get('product'));
    if (product) {
      lastLink = links.find(link => link.dataset.productId === product.id) ?? links[0];
      renderProduct(product);
      finishDetail(!initial);
      window.scrollTo({ top: 0, behavior: 'instant' });
    } else {
      if (url.searchParams.has('product')) {
        url.searchParams.delete('product');
        window.history.replaceState({ catalogScrollY }, '', url);
      }
      showCatalog(false, !initial);
    }
  }
  window.addEventListener('popstate', () => restoreFromUrl());
  window.addEventListener('resize', () => {
    if (current && busy) finishDetail();
  });
  motion.addEventListener('change', () => {
    if (motion.matches && current && busy) finishDetail();
  });
  restoreFromUrl(true);
}
