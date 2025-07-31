// login.setup.ts
import { chromium } from '@playwright/test';
import * as dotenv from 'dotenv';
dotenv.config();

(async () => {
  const browser = await chromium.launch({ headless: false }); // 👀 thấy được để login thủ công
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://www.linkedin.com/login');

  console.log('🧠 Please log in manually in the opened browser window.');

  await page.waitForURL(/.*\/feed.*/, { timeout: 30000 });


  // Save session
  await context.storageState({ path: 'storage/.auth.json' });
  console.log('✅ Session saved to storage/.auth.json');

  await browser.close();
})();
