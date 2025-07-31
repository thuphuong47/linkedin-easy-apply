
import { test, expect } from '@playwright/test';
import { login } from '../helpers/session';
import { logStep, logError } from '../utils/logger';

//const JOB_KEYWORD = 'QA Engineer';

test.describe('LinkedIn Easy Apply Flow', () => {
  test('Validate Easy Apply Form', async ({ page }) => {
    try {
      await page.goto('https://www.linkedin.com/jobs');
      await page.waitForTimeout(5000); // Cho trang load hoàn toàn

  /*  logStep(`Searching for: ${JOB_KEYWORD}`);
    const searchInput = page.locator('input[aria-label*="Search"]');
      await searchInput.waitFor({ state: 'visible', timeout: 10000 });
      await searchInput.fill(JOB_KEYWORD);
      await page.keyboard.press('Enter');
      await page.waitForTimeout(3000); */

      const searchInput = page.locator('input#jobs-search-box-keyword-id-ember28');      
      await expect(searchInput).toBeVisible();

      await searchInput.fill('QA Automation');
      await page.keyboard.press('Enter');

      await page.waitForTimeout(5000);

      logStep('Clicking Easy Apply job');
      const easyApplyJob = page.locator('button:has-text("Easy Apply")').first();
      await easyApplyJob.click();
      await page.waitForTimeout(10000);

      logStep('Opening Easy Apply Form');
      await page.locator('button:has-text("Easy Apply")').first().click();
      await page.waitForTimeout(10000);
/*
      logStep('Validating required fields...');
      await expect(page.locator('input[name*="firstName"]')).toBeVisible();
      await expect(page.locator('input[name*="lastName"]')).toBeVisible();
      await expect(page.locator('input[type="file"]')).toBeVisible();*/

      await expect(page.locator('text=Apply to')).toBeVisible({ timeout: 10000 });


      const phoneInput = page.locator('input[id*="phoneNumber-nationalNumber"]');
      await expect(phoneInput).toBeVisible({ timeout: 10000 });
      await phoneInput.fill('0909123456');

      await page.getByRole('button', { name: 'Next' }).click();


      logStep('Checking file upload behavior');
      const fileUpload = page.locator('input[type="file"]');
      await fileUpload.setInputFiles('tests/files/sample_resume.pdf');

      logStep('Checking submit button state...');
      const submitBtn = page.getByRole('button', { name: /Submit/i });
      await expect(submitBtn).toBeEnabled();
    } catch (error: any) {
      logError(error.message);
      throw error;
    }
  });
});
