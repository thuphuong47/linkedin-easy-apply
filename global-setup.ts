//global-setup.ts
import { chromium } from '@playwright/test';
import { login } from './helpers/session';
import { users } from './users.config';

import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

export default async function globalSetup() {
  for (const user of users) {
    if (!fs.existsSync(user.storagePath)) {
      const browser = await chromium.launch();
      const context = await browser.newContext();
      const page = await context.newPage();
      await login(page, user.username, user.password);
      await context.storageState({ path: user.storagePath });
      await browser.close();
    }
  }
}

if (require.main === module) {
  globalSetup().catch(err => {
    console.error(err);
    process.exit(1);
  });
}
