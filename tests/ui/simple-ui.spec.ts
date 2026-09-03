import { test, expect } from '@playwright/test';

const practiceUrl = 'https://rahulshettyacademy.com/loginpagePractise/';
const practiceCredentials = {
  username: 'rahulshettyacademy',
  password: 'Learning@830$3mK2'
};

async function fillPracticeCredentials(
  page: import('@playwright/test').Page
): Promise<void> {
  await page.locator('#username').fill(practiceCredentials.username);
  await page.locator('#password').fill(practiceCredentials.password);
}

test('@Web opens the practice login page', async ({ page }) => {
  await page.goto(practiceUrl);

  await expect(page).toHaveTitle(/LoginPage Practise \| Rahul Shetty Academy/);
  await expect(page).toHaveURL(/loginpagePractise/);
});

test('@Web logs in successfully', async ({ page }) => {
  await page.goto(practiceUrl);
  await fillPracticeCredentials(page);
  await page.locator('#signInBtn').click();

  await expect(page.locator('.card-body a').first()).toHaveText('iphone X');
});

test('@Web interacts with form controls', async ({ page }) => {
  await page.goto(practiceUrl);
  await fillPracticeCredentials(page);
  await page.locator('select.form-control').selectOption('consult');
  await page.locator('.radiotextsty').last().click();
  await page.locator('#okayBtn').click();

  await expect(page.locator('.radiotextsty').last()).toBeChecked();

  const termsCheckbox = page.locator('#terms');
  await termsCheckbox.check();
  await expect(termsCheckbox).toBeChecked();
  await termsCheckbox.uncheck();
  await expect(termsCheckbox).not.toBeChecked();
  await expect(page.locator("[href*='documents-request']")).toHaveClass(
    /blinkingText/
  );
});
