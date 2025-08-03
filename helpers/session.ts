import { Page, expect } from '@playwright/test';

export async function login(page: Page, username: string, password: string) {
  console.log(`🔹 Logging in as ${username}`);

  await page.goto('https://www.linkedin.com/login', { waitUntil: 'domcontentloaded' });

  await expect(page.locator('input[name="session_key"]')).toBeVisible({ timeout: 10000 });
  await expect(page.locator('input[name="session_password"]')).toBeVisible({ timeout: 10000 });

  await page.fill('input[name="session_key"]', username);
  await page.fill('input[name="session_password"]', password);
  await page.click('button[data-litms-control-urn="login-submit"]');

  await page.waitForLoadState('domcontentloaded');
  const currentURL = page.url();

  if (/\/feed/.test(currentURL)) {
    console.log(`✅ Logged in as ${username}`);
  } else {    
    const errorBoxes = page.locator('[id*="error"]');
    const count = await errorBoxes.count();

    if (count > 0) {
      const errorText = await errorBoxes.first().textContent();
      throw new Error(`❌ Login failed for ${username}: ${errorText || 'Unknown error'}`);
    } else {
      throw new Error(`❌ Login failed for ${username}: Unknown error (no error box found)`);
    }
  }
}
