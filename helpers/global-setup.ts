
import { chromium } from '@playwright/test';
import { login } from './session';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

const users = [
  {
    username: process.env.USERNAME1!,
    password: process.env.PASSWORD1!,
    storagePath: 'storage/user1.json'
  },
  {
    username: process.env.USERNAME2!,
    password: process.env.PASSWORD2!,
    storagePath: 'storage/user2.json'
  }
];

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
