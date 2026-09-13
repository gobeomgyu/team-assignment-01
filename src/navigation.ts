import { basePath } from './paths';

export function renderSectionNavigation(current: 'store' | 'pokedex') {
  return `
    <nav class="section-nav" aria-label="주 메뉴">
      <div class="section-nav-inner">
        <div class="section-nav-links">
          <a class="section-nav-link" href="${basePath}store.html" ${current === 'store' ? 'aria-current="page"' : ''}>스토어</a>
          <a class="section-nav-link" href="${basePath}pokedex.html" ${current === 'pokedex' ? 'aria-current="page"' : ''}>도감</a>
        </div>
        <span class="section-nav-caption"><span class="tiny-ball" aria-hidden="true"></span> OUR LITTLE WORLD</span>
      </div>
    </nav>
  `;
}
