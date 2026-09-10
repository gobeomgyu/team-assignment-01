import { defineConfig } from '@playwright/test';
import viteConfig from './vite.config';

const baseURL = new URL(viteConfig.base ?? '/', 'http://127.0.0.1:4173').href;

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  workers: 2,
  timeout: 30000,
  use: {
    baseURL,
    channel: 'chrome',
    headless: true,
    trace: 'retain-on-failure',
  },
  projects: [
    { name: 'desktop', use: { viewport: { width: 1440, height: 900 } } },
    { name: 'mobile', use: { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true } },
  ],
  webServer: {
    command: `${process.platform === 'win32' ? 'npm.cmd' : 'npm'} run preview -- --host 127.0.0.1 --port 4173 --strictPort`,
    url: baseURL,
    reuseExistingServer: !process.env.CI,
  },
});
