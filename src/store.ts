import { basePath } from './paths';
import { renderSectionNavigation } from './navigation';
import { products } from './products';
import { enableInterfaceSounds } from './sound';
import './store.css';

const app = document.querySelector<HTMLDivElement>('#app');

if (app) {
  app.innerHTML = `
    <header class="site-header">
      <a class="brand" href="${basePath}" aria-label="김박사의 연구소, 처음으로">
        <span class="pokeball-mark" aria-hidden="true"></span>
        <span>김박사의 연구소<span class="brand-subtitle">PROFESSOR KIM'S LAB</span></span>
      </a>
      <div class="header-location"><span class="status-dot"></span> 태초마을 <span class="location-divider">/</span> KANTO REGION</div>
    </header>
    ${renderSectionNavigation('store')}
    <main class="store-page" aria-labelledby="store-title">
      <section class="store-intro">
        <div>
          <p class="eyebrow"><span></span> LITTLE THINGS, BIG ADVENTURES</p>
          <h1 id="store-title">우리의 모험을 <em>소장하는 방법.</em></h1>
          <p class="store-description">좋아하는 파트너와 함께하는 일상.<br />한 장의 사진처럼 오래 간직하고 싶은 작은 물건들을 모았어요.</p>
        </div>
        <div class="store-stamp" aria-hidden="true"><span class="pokeball-mark"></span><span>PARTNER GOODS<small>COLLECTION / 2026</small></span></div>
      </section>
      <section class="store-collection" aria-labelledby="collection-title">
        <div class="store-collection-heading">
          <h2 id="collection-title">파트너 컬렉션 <span>${String(products.length).padStart(2, '0')}</span></h2>
          <p>세 명의 파트너, 아홉 가지 작은 추억</p>
        </div>
        <ul class="product-grid">
          ${products.map((product, index) => `
            <li>
              <article class="product-card" aria-labelledby="product-${product.id}" style="--product-accent: ${product.color}; --product-background: ${product.background}">
                <span class="photo-tape" aria-hidden="true"></span>
                <div class="product-scene product-scene--${product.kind}">
                  <span class="product-scene-number" aria-hidden="true">${String(index + 1).padStart(2, '0')} / 09</span>
                  <div class="product-object">
                    <span class="product-print-label" aria-hidden="true">${product.no} · PARTNER COLLECTION</span>
                    <img class="product-image" src="${product.image}" alt="${product.name} 상품 이미지" loading="${index < 3 ? 'eager' : 'lazy'}" decoding="async" width="400" height="400" />
                    <span class="product-print-name" aria-hidden="true">${product.character}<small>always by your side.</small></span>
                  </div>
                </div>
                <div class="product-caption">
                  <p class="product-category">${product.collection}<span class="product-availability">준비 중</span></p>
                  <h3 id="product-${product.id}">${product.name}</h3>
                  <p class="product-description">${product.description}</p>
                  <span class="photo-signature" aria-hidden="true">with my little partner <span>♡</span></span>
                </div>
              </article>
            </li>
          `).join('')}
        </ul>
        <p class="store-closing"><span class="tiny-ball" aria-hidden="true"></span> 오래도록 함께할 작은 추억들을 준비하고 있어요.</p>
      </section>
    </main>
    <footer class="site-footer"><span>작은 만남에서 시작되는, 우리의 이야기.</span><span>GCS <span class="footer-cross">×</span> POKÉMON <span class="footer-year">2026</span></span></footer>
  `;

  enableInterfaceSounds(app);
}
