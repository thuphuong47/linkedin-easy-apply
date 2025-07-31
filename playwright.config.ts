
import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
  timeout: 60000,
  testDir: './tests',
  use: {
    baseURL: 'https://www.linkedin.com',
    storageState: 'storage/.auth.json',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    { name: 'Chrome', use: { browserName: 'chromium' } },
    { name: 'Edge', use: { channel: 'msedge' } },
    { name: 'Mobile Safari', use: devices['iPhone 13'] },
    { name: 'Mobile Galaxy S9', use: devices['Galaxy S9+'] },
  ],
});
