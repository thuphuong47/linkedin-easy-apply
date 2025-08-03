
import { test, expect } from '@playwright/test';
import { login } from '../helpers/session';
import { logStep, logError } from '../utils/logger';

const users = [
  { username: process.env.USERNAME1, password: process.env.PASSWORD1 },
  { username: process.env.USERNAME2, password: process.env.PASSWORD2 }
];

for (const user of users) {
  test.describe(`LinkedIn Easy Apply Flow for ${user.username}`, () => {
    test(`Validate Easy Apply Form`, async ({ page, context }) => {
      try {
        await login(page, user.username, user.password);

        await logStep('Navigating to LinkedIn Jobs page');
        await page.goto('https://www.linkedin.com/jobs');
        await page.waitForLoadState('domcontentloaded');

        logStep('Filling in job search');
        const searchInput = page.locator('#jobs-search-box-keyword-id-ember29');
        await expect(searchInput).toBeVisible({ timeout: 15000 });
        await searchInput.fill('QA Automation');
        await page.keyboard.press('Enter');     

        logStep('Filtering jobs with Easy Apply only');
        const easyApplyFilter = page.locator('#searchFilter_applyWithLinkedin');
        await expect(easyApplyFilter).toBeVisible();
        await easyApplyFilter.click();        

        logStep('Clicking Easy Apply button');
        const easyApplyBtn = page.locator('#jobs-apply-button-id').first();
        await expect(easyApplyBtn).toBeVisible({ timeout: 10000 });
        await expect(easyApplyBtn).toBeEnabled();
        await easyApplyBtn.click();

        logStep('Waiting for Easy Apply modal');
        const applyModal = page.locator('[role="dialog"]');
        await applyModal.waitFor({ state: 'visible', timeout: 10000 });
        await expect(applyModal).toBeVisible();

        logStep('Filling phone number');
        const phoneInput = page.locator('input[id*="phoneNumber"]');
        await expect(phoneInput).toBeVisible({ timeout: 10000 });
        await phoneInput.fill('0909123456');

        logStep('Clicking next button');
        const nextButton = page.getByRole('button', { name: /next/i });
        await expect(nextButton).toBeVisible({ timeout: 10000 });
        await nextButton.click();

        logStep('Uploading resume file');
        const fileInput = page.locator('input[type="file"]');
        await fileInput.setInputFiles('tests/files/sample_resume.pdf');

        logStep('Checking next button availability');
        const nextBtn = page.getByRole('button', { name: 'Next' });
        await expect(nextBtn).toBeVisible({ timeout: 10000 });
        await nextBtn.click();
      } catch (error: any) {
        logError(error.message);
        throw error;
      }
    });
  });
}
