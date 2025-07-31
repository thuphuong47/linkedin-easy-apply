
import { Page } from '@playwright/test';
import { expect } from '@playwright/test';

export async function login(page: Page) {
  console.log('🔹 Logging in...');
  await page.goto('https://www.linkedin.com/login');
  await page.fill('input[name="session_key"]', process.env.LINKEDIN_USERNAME || '');
  await page.fill('input[name="session_password"]', process.env.LINKEDIN_PASSWORD || '');
  await page.click('button[data-litms-control-urn="login-submit"]');

  // ✅ Đợi DOM sẵn sàng (không chờ toàn bộ ảnh)
  await page.waitForLoadState('domcontentloaded');

  // ✅ Kiểm tra đúng URL
  await expect(page).toHaveURL(/.*\/feed.*/);

  console.log('✅ Logged in!');
}

export async function preserveSession(page, storagePath: string) {
  await page.context().storageState({ path: storagePath });
}

