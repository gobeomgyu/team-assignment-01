import { basePath } from './paths';
import { renderSectionNavigation } from './navigation';
import { products } from './products';
import { members } from './data';
import { renderProductFrame } from './product-art';
import { setupProductDetails } from './product-detail';
import { enableInterfaceSounds } from './sound';
import './store.css';

const app = document.querySelector<HTMLDivElement>('#app');

if (app) {
  const partnerId = new URLSearchParams(window.location.search).get('partner');
  const partner = members.find(member => member.id === Number(partnerId));
  const visibleProducts = partner ? products.filter(product => product.memberId === partner.id) : products;
  app.innerHTML = `
    <header class="site-header">
      <a class="brand" href="${basePath}" aria-label="김박사의 연구소, 처음으로">
        <span class="pokeball-mark" aria-hidden="true"></span>
        <span>김박사의 연구소<span class="brand-subtitle">PROFESSOR KIM'S LAB</span></span>
      </a>
      <div class="header-location"><span class="status-dot"></span> 코네마을 <span class="location-divider">/</span> CONE REGION</div>
    </header>
    ${renderSectionNavigation('store')}
    <main class="store-main" id="store-main" data-phase="catalog" aria-labelledby="store-title" aria-busy="false">
      <div class="store-page" id="store-catalog">
      <section class="store-intro">
        <div>
          <p class="eyebrow"><span></span> LITTLE THINGS, BIG ADVENTURES</p>
          <h1 id="store-title">${partner ? `${partner.pokemonName}의 <em>작은 컬렉션.</em>` : '우리의 모험을 <em>소장하는 방법.</em>'}</h1>
          <p class="store-description">좋아하는 파트너와 함께하는 일상.<br />한 장의 사진처럼 오래 간직하고 싶은 작은 물건들을 모았어요.</p>
        </div>
        <div class="store-stamp" aria-hidden="true"><span class="pokeball-mark"></span><span>PARTNER GOODS<small>COLLECTION / 2026</small></span></div>
      </section>
      <section class="store-collection" aria-labelledby="collection-title">
        <div class="store-collection-heading">
          <h2 id="collection-title">${partner ? `${partner.pokemonName} 상품` : '파트너 컬렉션'} <span>${String(visibleProducts.length).padStart(2, '0')}</span></h2>
          ${partner ? `<a class="store-all-link" href="${basePath}store.html">전체 상품 보기 <span aria-hidden="true">↗</span></a>` : '<p>세 명의 파트너, 아홉 가지 작은 추억</p>'}
        </div>
        <ul class="product-grid">
          ${visibleProducts.map((product, index) => `
            <li>
              <article class="product-card" style="--product-accent: ${product.color}; --product-background: ${product.background}">
                <a class="product-card-link" href="${basePath}store.html?${partner ? `partner=${partner.id}&` : ''}product=${product.id}" data-product-id="${product.id}" aria-label="${product.name} 상품 설명 보기">
                  ${renderProductFrame(product, index < 3)}
                </a>
              </article>
            </li>
          `).join('')}
        </ul>
        <p class="store-closing"><span class="tiny-ball" aria-hidden="true"></span> 오래도록 함께할 작은 추억들을 준비하고 있어요.</p>
      </section>
      </div>
      <section class="detail-view product-detail-view" id="product-detail" aria-labelledby="product-title" hidden inert>
        <div class="detail-backdrop" aria-hidden="true"></div>
        <div class="detail-topbar">
          <button class="back-button" id="product-back" type="button"><span aria-hidden="true">←</span> 상품 목록으로</button>
          <span class="detail-topbar-title">PARTNER GOODS <span>상품 이야기</span></span>
          <span class="detail-counter" id="product-counter"></span>
        </div>
        <div class="pokedex-card product-detail-card">
          <div class="card-surface" aria-hidden="true"></div>
          <div class="product-detail-visual">
            <div class="product-card product-detail-photo" id="product-detail-photo"></div>
          </div>
          <article class="detail-info product-detail-info">
            <div class="detail-title product-detail-line">
              <p class="member-no" id="product-collection"></p>
              <h1 id="product-title" tabindex="-1"></h1>
              <p class="product-detail-tagline" id="product-tagline"></p>
            </div>
            <div class="product-detail-line product-story">
              <h2>상품 설명</h2>
              <p id="product-description"></p>
            </div>
            <dl class="product-specs product-detail-line" id="product-specs"></dl>
            <p class="product-detail-note product-detail-line"><span class="status-dot"></span> 파트너와 함께할 작은 추억을 준비하고 있어요.</p>
            <button class="action-button product-detail-line" id="product-back-bottom" type="button">상품 목록으로 돌아가기 <span aria-hidden="true">→</span></button>
            <a class="product-dex-link product-detail-line" id="product-dex-link"></a>
          </article>
        </div>
      </section>
    </main>
    <footer class="site-footer"><span>작은 만남에서 시작되는, 우리의 이야기.</span><span>GCS <span class="footer-cross">×</span> POKÉMON <span class="footer-year">2026</span></span></footer>
    <p class="sr-only" id="store-announcement" role="status" aria-live="polite"></p>
  `;

  enableInterfaceSounds(app);
  setupProductDetails(app);
}
