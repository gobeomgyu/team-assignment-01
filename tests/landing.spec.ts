import { expect, test, type Page } from '@playwright/test';

async function settled(page: Page, phase = 'detail') {
  await expect(page.locator('#scene')).toHaveAttribute('data-phase', phase);
  await expect(page.locator('#scene')).toHaveAttribute('aria-busy', 'false');
}

test('the three balls reveal the requested Pokémon and can be opened again', async ({ page }, testInfo) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('./');
  await expect(page.locator('.choice-name')).toHaveText(['규이리', '익상해씨', '영부기']);
  await expect(page.locator('.professor-normal')).toBeVisible();
  await expect(page.locator('#detail-view')).toBeHidden();
  await page.screenshot({ path: testInfo.outputPath('landing.png'), fullPage: true });

  for (const [index, name, no] of [
    [0, '규이리', 'No. 0004'],
    [1, '익상해씨', 'No. 0001'],
    [2, '영부기', 'No. 0007'],
  ] as const) {
    await page.locator('.pokeball-choice').nth(index).click();
    await expect(page.locator('#scene')).toHaveAttribute('data-phase', 'opening');
    await expect.poll(() => page.locator('.ball-open').nth(index).evaluate(el => Number(getComputedStyle(el).opacity))).toBeGreaterThan(0.8);
    await expect(page.locator('.pokemon-flyer')).toBeVisible();
    await settled(page);
    await expect(page.locator('#member-name')).toHaveText(name);
    await expect(page.locator('#member-no')).toHaveText(no);

    await expect(page.locator('#member-image')).toHaveAttribute('alt', name);
    expect(await page.locator('#member-image').evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true);
    await expect(page.locator('#member-name')).toBeFocused();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.screenshot({ path: testInfo.outputPath(`pokemon-${index}.png`), fullPage: true });
    await page.locator('#back-button').click();
    await settled(page, 'selection');
    await expect(page.locator('.pokeball-choice').nth(index)).toBeFocused();
    await expect(page.locator('.ball-closed').nth(index)).toHaveCSS('opacity', '1');
    await expect(page.locator('.ball-open').nth(index)).toHaveCSS('opacity', '0');
  }
  expect(errors).toEqual([]);
});

test('the Pokémon travels left while the Pokédex enters from the right', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name === 'mobile', 'Mobile uses the vertical layout.');
  await page.goto('./');
  await page.locator('.pokeball-choice').nth(2).click();
  await page.waitForFunction(() => {
    const flyer = document.querySelector('.pokemon-flyer');
    if (!flyer) return false;
    const bounds = flyer.getBoundingClientRect();
    return bounds.width > 200 && bounds.left > innerWidth * 0.3;
  });
  const atCenter = await page.locator('.pokemon-flyer').boundingBox();
  expect(atCenter).not.toBeNull();
  const entryX = await page.locator('.detail-info').evaluate(el => new DOMMatrixReadOnly(getComputedStyle(el).transform).m41);
  expect(entryX).toBeGreaterThan(0);
  await page.screenshot({ path: testInfo.outputPath('release.png') });
  await settled(page);
  const final = await page.locator('#member-image').boundingBox();
  const info = await page.locator('.detail-info').boundingBox();
  expect(final!.x).toBeLessThan(atCenter!.x);
  expect(final!.x + final!.width).toBeLessThan(info!.x);
});

test('rapid clicks do not double-open, and Escape cancels an unfinished release', async ({ page }) => {
  await page.goto('./');
  await page.locator('.pokeball-choice').first().click();
  await expect(page.locator('.pokeball-choice').nth(1)).toBeDisabled();
  await page.evaluate(() => document.querySelectorAll<HTMLButtonElement>('.pokeball-choice')[1].click());
  await page.keyboard.press('Escape');
  await settled(page, 'selection');
  await expect(page.locator('.pokemon-flyer')).toHaveCount(0);
  await page.locator('.pokeball-choice').nth(1).click();
  await settled(page);
  await expect(page.locator('#member-name')).toHaveText('익상해씨');
  await page.locator('#choose-again').click();
  await page.locator('.pokeball-choice').nth(2).click();
  await expect(page.locator('.pokemon-flyer')).toBeVisible();
  await page.keyboard.press('Escape');
  await settled(page, 'selection');
  await expect(page.locator('.pokemon-flyer')).toHaveCount(0);
});

test('previous, next, pagination, history and ability details work', async ({ page, baseURL }) => {
  await page.goto('member.html?id=1');
  await settled(page);
  await expect(page.locator('#member-name')).toHaveText('익상해씨');
  await page.locator('#ability-help').click();
  await expect(page.locator('#ability-description')).toBeVisible();
  await page.locator('#ability-help').click();
  await expect(page.locator('#ability-description')).toBeHidden();
  await page.locator('#next-btn').click();
  await settled(page);
  await expect(page.locator('#member-name')).toHaveText('영부기');
  await page.locator('#next-btn').click();
  await settled(page);
  await expect(page.locator('#member-name')).toHaveText('규이리');
  await page.locator('#prev-btn').click();
  await settled(page);
  await expect(page.locator('#member-name')).toHaveText('영부기');
  await page.locator('.dex-dot').nth(1).click();
  await settled(page);
  await expect(page.locator('#member-name')).toHaveText('익상해씨');
  await page.goBack();
  await expect(page.locator('#member-name')).toHaveText('영부기');
  await page.goForward();
  await expect(page.locator('#member-name')).toHaveText('익상해씨');
  await page.reload();
  await expect(page.locator('#member-name')).toHaveText('익상해씨');
  await page.locator('#back-button').click();
  await settled(page, 'selection');
  await expect(page).toHaveURL(baseURL!);
  await page.goBack();
  await expect(page.locator('#member-name')).toHaveText('익상해씨');
});

test('keyboard activation and reduced motion retain the full functionality', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('./');
  await page.locator('.pokeball-choice').nth(2).focus();
  await page.keyboard.press('Enter');
  await settled(page);
  await expect(page.locator('#member-name')).toHaveText('영부기');
  await expect(page.locator('.pokemon-flyer')).toHaveCount(0);
  await page.keyboard.press('Escape');
  await settled(page, 'selection');
  await page.keyboard.press('Space');
  await settled(page);
  await expect(page.locator('#member-name')).toHaveText('영부기');
});

test('missing artwork can be retried without locking the selection', async ({ page }) => {
  await page.route('**/images/gyuiri.png', route => route.abort());
  await page.goto('./');
  await page.locator('.pokeball-choice').first().click();
  await settled(page, 'selection');
  await expect(page.locator('#announcement')).toContainText('이미지를 불러오지 못했어요');
  await expect(page.locator('.pokeball-choice').first()).toBeEnabled();
  await page.unroute('**/images/gyuiri.png');
  await page.locator('.pokeball-choice').first().click();
  await settled(page);
  await expect(page.locator('#member-name')).toHaveText('규이리');
});

test('narrow screens and invalid deep links stay usable', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 740 });
  await page.goto('member.html?id=invalid');
  await settled(page);
  await expect(page.locator('#member-name')).toHaveText('규이리');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.locator('#back-button').click();
  await expect(page.locator('.pokeball-choice')).toHaveCount(3);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.locator('.pokeball-choice').nth(1).click();
  await settled(page);
  await expect(page.locator('#member-name')).toHaveText('익상해씨');
});

test('a default detail URL restores the same Pokémon after browser Back', async ({ page }) => {
  for (const url of ['member.html', 'member.html?id=invalid']) {
    await page.goto(url);
    await settled(page);
    await expect(page.locator('#member-name')).toHaveText('규이리');
    await expect(page).toHaveURL(/member\.html\?id=2$/);
    await page.locator('#next-btn').click();
    await settled(page);
    await expect(page.locator('#member-name')).toHaveText('익상해씨');
    await page.goBack();
    await settled(page);
    await expect(page.locator('#member-name')).toHaveText('규이리');
  }
});

test('resizing while the ball opens and the Pokémon flies leaves a usable detail', async ({ page }) => {
  await page.goto('./');
  await page.locator('.pokeball-choice').nth(2).click();
  await expect(page.locator('#scene')).toHaveAttribute('data-phase', 'opening');
  await page.setViewportSize({ width: 620, height: 760 });
  await expect(page.locator('.pokemon-flyer')).toBeVisible();
  await page.setViewportSize({ width: 1100, height: 800 });
  await settled(page);
  await expect(page.locator('#member-name')).toHaveText('영부기');
  await expect(page.locator('.pokemon-flyer')).toHaveCount(0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.locator('#back-button').click();
  await settled(page, 'selection');
  await expect(page.locator('.pokeball-choice').nth(2)).toBeEnabled();
});
