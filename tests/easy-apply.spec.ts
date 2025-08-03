
import { test, expect } from '@playwright/test';
import { Page } from '@playwright/test';
import { logStep, logError } from '../utils/logger';

const jobTitle = 'QA Automation';

async function applyToFirstJob(page: Page) {
  logStep('Navigating to LinkedIn Jobs page');
  await page.goto('/jobs');
  await page.waitForLoadState('domcontentloaded');

  logStep('Filling in job search');
  const searchInput = page.locator('input[aria-label="Search by title, skill, or company"]:not([disabled])');
  await expect(searchInput).toBeVisible({ timeout: 15000 });

  await searchInput.fill(jobTitle);
  await searchInput.press('Enter'); 

  logStep('Filtering jobs with Easy Apply only');
  const easyApplyFilter = page.locator('#searchFilter_applyWithLinkedin');
  await easyApplyFilter.click();

  logStep('Clicking Easy Apply button');
  const easyApplyBtn = page.locator('#jobs-apply-button-id').first();
  await easyApplyBtn.click();

  logStep('Waiting for Easy Apply modal');
  const applyModal = page.locator('[role="dialog"]');
  await applyModal.waitFor({ state: 'visible' });

  logStep('Filling phone number');
  const phoneInput = page.locator('input[id*="phoneNumber"]');
  await phoneInput.fill('0909123456');

  logStep('Clicking next button');
  await page.getByRole('button', { name: /next/i }).click();

  logStep('Uploading resume file');
  const fileInput = page.locator('input[type="file"]');
  await fileInput.setInputFiles('tests/files/sample_resume.pdf');

  logStep('Clicking final next button');
  await page.getByRole('button', { name: 'Next' }).click();
}

test.describe('LinkedIn Easy Apply Flow', () => {
  test('Apply to job', async ({ page }) => {
    try {
      await applyToFirstJob(page);
    } catch (error: any) {
      logError(error.message);
      throw error;
    }
  });
});
