import { products, type Product } from './products';

export function renderProductFrame(product: Product, eager = false) {
  const index = products.indexOf(product);
  return `
    <span class="photo-tape" aria-hidden="true"></span>
    <div class="product-scene product-scene--${product.kind}">
      <span class="product-scene-number" aria-hidden="true">${String(index + 1).padStart(2, '0')} / 09</span>
      <div class="product-object">
        <span class="product-print-label" aria-hidden="true">${product.no} · PARTNER COLLECTION</span>
        <img class="product-image" src="${product.image}" alt="${product.name} 상품 이미지" loading="${eager ? 'eager' : 'lazy'}" decoding="async" width="400" height="400" />
        <span class="product-print-name" aria-hidden="true">${product.character}<small>always by your side.</small></span>
      </div>
    </div>
    <div class="product-caption">
      <p class="product-category">${product.collection}<span class="product-availability">준비 중</span></p>
      <h3>${product.name}</h3>
      <p class="product-description">${product.description}</p>
      <span class="photo-signature" aria-hidden="true">with my little partner <span>♡</span></span>
    </div>
  `;
}
