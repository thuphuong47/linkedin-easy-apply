
import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
  testDir: './tests',
  timeout: 60000,
  fullyParallel: true,
  use: {
    baseURL: 'https://www.linkedin.com',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  globalSetup: './helpers/global-setup.ts',
  projects: [
    {
      name: 'User 1',
      use: {
        storageState: 'storage/user1.json'
      }
    },
    {
      name: 'User 2',
      use: {
        storageState: 'storage/user2.json'
      }
    }
  ]
});
