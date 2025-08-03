
import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
  timeout: 60000,
  testDir: './tests',
  fullyParallel: true,

  use: {
    baseURL: 'https://www.linkedin.com',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    // 💻 Desktop Chrome - user1
    {
      name: 'Chrome - User1',
      use: {
        browserName: 'chromium',
        channel: 'chrome',
        storageState: 'storage/user1.json',
      },
    },

    // 💻 Desktop Edge - user2
    {
      name: 'Edge - User2',
      use: {
        browserName: 'chromium',
        channel: 'msedge',
        storageState: 'storage/user2.json',
      },
    },

    // 📱 iPhone 13 - user1
    {
      name: 'Mobile Safari - iPhone 13 (User1)',
      use: {
        ...devices['iPhone 13'],
        storageState: 'storage/user1.json',
      },
    },

    // 📱 Galaxy S9+ - user2
    {
      name: 'Mobile Chrome - Galaxy S9+ (User2)',
      use: {
        ...devices['Galaxy S9+'],
        storageState: 'storage/user2.json',
      },
    },
  ],

  // 📊 HTML report
  reporter: [['html', { open: 'never' }]],
});
