import { expect, test, type Page } from '@playwright/test';

async function settled(page: Page, phase = 'detail') {
  await expect(page.locator('#store-main')).toHaveAttribute('data-phase', phase);
  await expect(page.locator('#store-main')).toHaveAttribute('aria-busy', 'false');
}

test('the partner invitation rises from below the screen while the professor stays in place', async ({ page }, testInfo) => {
  await page.goto('./');
  const photo = page.locator('.intro-professor');
  await expect(photo).toHaveCSS('opacity', '1');
  await expect(photo).toBeInViewport();
  const professorTransform = await photo.evaluate(element => getComputedStyle(element).transform);
  const invitation = page.locator('.partners-reveal');
  await expect(invitation).toHaveCSS('opacity', '0');
  await page.evaluate(() => document.getElementById('meet-partners')!.scrollIntoView({ block: 'start' }));
  await expect(invitation).not.toHaveClass(/is-waiting/);
  await expect.poll(() => invitation.evaluate(element => element.getAnimations().length)).toBe(0);
  await expect(invitation).toHaveCSS('opacity', '1');
  await expect(page.locator('.partner-silhouette').first()).toBeInViewport();
  await expect(page.locator('.pokedex-link')).toBeInViewport();
  await expect(photo).toHaveCSS('transform', professorTransform);
  expect(await photo.evaluate(element => element.getAnimations().length)).toBe(0);
  await page.screenshot({ path: testInfo.outputPath('partners-revealed.png') });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('./');
  await expect(photo).toHaveCSS('opacity', '1');
  await expect(photo).toBeInViewport();
  await expect(invitation).toHaveCSS('opacity', '1');
});

test('red menus scroll out of view on the Pokédex and store', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 460 });
  for (const url of ['pokedex.html', 'store.html']) {
    await page.goto(url);
    const menu = page.getByRole('navigation', { name: '주 메뉴' });
    await expect(menu).toBeInViewport();
    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
    await expect(menu).not.toBeInViewport();
    await page.evaluate(() => window.scrollTo(0, 0));
    await expect(menu).toBeInViewport();
  }
});

test('a product flies left while its story enters from the right, then restores the catalog position', async ({ page }, testInfo) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('store.html');
  const link = page.locator('.product-card-link').last();
  await link.scrollIntoViewIfNeeded();
  const scrollY = await page.evaluate(() => window.scrollY);
  // Sample in the browser so slow test-runner round trips cannot miss the animation.
  await page.evaluate(() => {
    const frames: { left: number; infoX: number }[] = [];
    Object.assign(window, { productMotionFrames: frames });
    const deadline = performance.now() + 10000;
    const sample = () => {
      const frame = document.querySelector('.product-flyer')?.getBoundingClientRect();
      const info = document.querySelector('.product-detail-info');
      if (frame && info) frames.push({ left: frame.left, infoX: new DOMMatrixReadOnly(getComputedStyle(info).transform).m41 });
      if (performance.now() < deadline && !(frames.length && document.querySelector('#store-main')?.getAttribute('data-phase') === 'detail')) requestAnimationFrame(sample);
    };
    requestAnimationFrame(sample);
  });
  await link.click();
  await expect(page.locator('.product-flyer')).toBeVisible();
  await settled(page);
  if (testInfo.project.name === 'desktop') {
    const frames = await page.evaluate(() => (window as typeof window & { productMotionFrames: { left: number; infoX: number }[] }).productMotionFrames);
    const final = await page.locator('#product-detail-photo').boundingBox();
    const info = await page.locator('.product-detail-info').boundingBox();
    expect(frames.some(frame => frame.left > final!.x + 80)).toBe(true);
    expect(frames.some(frame => frame.infoX > page.viewportSize()!.width * 0.25)).toBe(true);
    expect(final!.x + final!.width).toBeLessThan(info!.x);
  }
  await expect(page.locator('#product-title')).toHaveText('영부기 그립톡');
  await expect(page.locator('#product-counter')).toHaveText('06 / 06');
  await expect(page.locator('#product-title')).toBeFocused();
  await expect(page.locator('#product-detail')).not.toContainText('더미 데이터');
  await expect(page.locator('#product-description')).not.toBeEmpty();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.screenshot({ path: testInfo.outputPath('product-detail.png'), fullPage: true });
  await page.locator('#product-back').click();
  await settled(page, 'catalog');
  await expect(link).toBeFocused();
  expect(Math.abs(await page.evaluate(() => window.scrollY) - scrollY)).toBeLessThan(5);
  await page.goBack();
  await settled(page);
  await expect(page.locator('#product-title')).toHaveText('영부기 그립톡');
  await page.reload();
  await settled(page);
  await expect(page.locator('#product-title')).toHaveText('영부기 그립톡');
  expect(errors).toEqual([]);
});

test('every partner links to their own two products, which support keyboard and reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const [id, name] of [[2, '규이리'], [1, '익상해씨'], [3, '영부기']] as const) {
    await page.goto(`member.html?id=${id}`);
    await page.getByRole('link', { name: `${name} 상품 보러가기`, exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`store\\.html\\?partner=${id}$`));
    const links = page.locator('.product-card-link');
    await expect(links).toHaveCount(2);
    for (let index = 0; index < 2; index++) {
      await links.nth(index).focus();
      await page.keyboard.press('Enter');
      await settled(page);
      await expect(page.locator('#product-title')).toHaveText(`${name} ${index === 0 ? '체인 배지' : '그립톡'}`);
      await expect(page.locator('.product-flyer')).toHaveCount(0);
      await expect(page.locator('#product-dex-link')).toHaveAttribute('href', new RegExp(`member\\.html\\?id=${id}$`));
      await page.keyboard.press('Escape');
      await settled(page, 'catalog');
      await expect(links.nth(index)).toBeFocused();
    }
    await page.getByRole('link', { name: '전체 상품 보기' }).click();
    await expect(page.locator('.product-card-link')).toHaveCount(6);
  }
});

test('Escape, browser Back and resizing during product transitions leave a usable page', async ({ page }) => {
  await page.goto('store.html');
  await page.locator('.product-card-link').first().click();
  await expect(page.locator('.product-flyer')).toBeVisible();
  await page.keyboard.press('Escape');
  await settled(page, 'catalog');
  await expect(page.locator('.product-flyer')).toHaveCount(0);
  await page.locator('.product-card-link').nth(1).click();
  await expect(page.locator('.product-flyer')).toBeVisible();
  await page.goBack();
  await settled(page, 'catalog');
  await page.locator('.product-card-link').nth(2).click();
  await expect(page.locator('.product-flyer')).toBeVisible();
  await page.setViewportSize({ width: 320, height: 740 });
  await settled(page);
  await expect(page.locator('.product-flyer, .store-transition-overlay')).toHaveCount(0);
  await expect(page.locator('#product-title')).toHaveText('영부기 체인 배지');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test('missing product images can be retried, and invalid product links return to the catalog', async ({ page }) => {
  await page.route('**/images/products/chain-badges.png', route => route.abort());
  await page.goto('store.html?product=invalid');
  await settled(page, 'catalog');
  await expect(page).toHaveURL(/store\.html$/);
  await page.locator('.product-card-link').nth(1).click();
  await settled(page, 'catalog');
  await expect(page.locator('#store-announcement')).toContainText('상품 이미지를 불러오지 못했어요');
  await page.unroute('**/images/products/chain-badges.png');
  await page.locator('.product-card-link').nth(1).click();
  await settled(page);
  await expect(page.locator('#product-title')).toHaveText('익상해씨 체인 배지');
});
