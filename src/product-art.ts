import { products, type Product } from './products';

export function renderProductFrame(product: Product, eager = false) {
  const index = products.indexOf(product);
  const [imageWidth, imageHeight] = product.imageSize;
  const [x, y, width, height] = product.imageCrop;
  return `
    <span class="photo-tape" aria-hidden="true"></span>
    <div class="product-scene product-scene--${product.kind}">
      <span class="product-scene-number" aria-hidden="true">${String(index + 1).padStart(2, '0')} / ${String(products.length).padStart(2, '0')}</span>
      <div class="product-image-window" style="aspect-ratio: ${width} / ${height}">
        <img class="product-image" src="${product.image}" alt="${product.name} 상품 이미지" loading="${eager ? 'eager' : 'lazy'}" decoding="async" width="${imageWidth}" height="${imageHeight}" style="width: ${imageWidth / width * 100}%; height: ${imageHeight / height * 100}%; left: ${-x / width * 100}%; top: ${-y / height * 100}%" />
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
