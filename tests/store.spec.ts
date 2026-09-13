import { expect, test } from '@playwright/test';

test('the red menu connects the Pokédex and a nine-product instant-photo store', async ({ page }, testInfo) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('pokedex.html');
  const menu = page.getByRole('navigation', { name: '주 메뉴' });
  await expect(menu.getByRole('link', { name: '도감', exact: true })).toHaveAttribute('aria-current', 'page');
  await menu.getByRole('link', { name: '스토어', exact: true }).click();
  await expect(page).toHaveURL(/\/store\.html$/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('우리의 모험을 소장하는 방법.');
  await expect(menu.getByRole('link', { name: '스토어', exact: true })).toHaveAttribute('aria-current', 'page');
  await expect(menu.getByRole('link', { name: '도감', exact: true })).not.toHaveAttribute('aria-current');
  await expect(page.locator('.product-card')).toHaveCount(9);

  for (const picture of await page.locator('.product-image').all()) {
    await picture.scrollIntoViewIfNeeded();
    await expect.poll(() => picture.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true);
  }
  if (testInfo.project.name === 'desktop') {
    const rows = await page.locator('.product-grid > li').evaluateAll(cards => {
      const rowTops = cards.map(card => Math.round(card.getBoundingClientRect().top));
      return [...new Set(rowTops)].map(top => rowTops.filter(value => value === top).length);
    });
    expect(rows).toEqual([3, 3, 3]);
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await expect(menu).toBeInViewport();
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: testInfo.outputPath('store.png'), fullPage: true });
  await menu.getByRole('link', { name: '도감', exact: true }).click();
  await expect(page).toHaveURL(/\/pokedex\.html$/);
  await expect(page.locator('#scene')).toHaveAttribute('data-phase', 'selection');
  await expect(page.locator('.pokeball-choice')).toHaveCount(3);
  expect(errors).toEqual([]);
});

test('detail pages share the menu and narrow screens support keyboard navigation', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 740 });
  await page.goto('member.html?id=1');
  const menu = page.getByRole('navigation', { name: '주 메뉴' });
  await expect(menu.getByRole('link', { name: '도감', exact: true })).toHaveAttribute('aria-current', 'page');
  await menu.getByRole('link', { name: '스토어', exact: true }).focus();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(page.locator('.product-card')).toHaveCount(9);
  const outsideViewport = await page.locator('.product-card').evaluateAll(cards => cards.some(card => {
    const bounds = card.getBoundingClientRect();
    return bounds.left < 0 || bounds.right > innerWidth;
  }));
  expect(outsideViewport).toBe(false);
  await page.goBack();
  await expect(page.locator('#member-name')).toHaveText('익상해씨');
  await menu.getByRole('link', { name: '도감', exact: true }).click();
  await expect(page.locator('#scene')).toHaveAttribute('data-phase', 'selection');
});
