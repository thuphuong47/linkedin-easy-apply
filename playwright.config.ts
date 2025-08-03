import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

const BASE_URL = 'https://www.linkedin.com';
const VIEWPORT_DESKTOP = { width: 1280, height: 720 };

export default defineConfig({
  timeout: 60000,
  retries: 1,
  testDir: './tests',
  globalSetup: './global-setup.ts',

  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report' }],
  ],

  use: {
    baseURL: BASE_URL,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chrome',
      use: {
        browserName: 'chromium',
        channel: 'chrome',
        viewport: VIEWPORT_DESKTOP,
        storageState: 'storage/user1.json',
      },
    },
    {
      name: 'edge',
      use: {
        browserName: 'chromium',
        channel: 'msedge',
        viewport: VIEWPORT_DESKTOP,
        storageState: 'storage/user2.json',
      },
    },
    {
      name: 'iphone13',
      use: {
        browserName: 'chromium',
        ...devices['iPhone 13'],
        storageState: 'storage/user1.json',
      },
    },
    {
      name: 'galaxyS9',
      use: {
        browserName: 'chromium',
        ...devices['Galaxy S9+'],
        storageState: 'storage/user2.json',
      },
    },
  ],
});
