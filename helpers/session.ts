
import { Page } from '@playwright/test';
import { expect } from '@playwright/test';

export async function login(page: Page, username: string, password: string) {
  console.log(`🔹 Logging in as ${username}`);
  await page.goto('https://www.linkedin.com/login');
  await page.fill('input[name="session_key"]', username);
  await page.fill('input[name="session_password"]', password);
  await page.click('button[data-litms-control-urn="login-submit"]');

  await page.waitForLoadState('domcontentloaded');
  await expect(page).toHaveURL(/.*\/feed.*/);

  console.log(`✅ Logged in as ${username}`);
}

export async function preserveSession(page: Page, storagePath: string) {
  await page.context().storageState({ path: storagePath });
}


