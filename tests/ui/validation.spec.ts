import { test, expect } from '@playwright/test';

test('@Web handles visibility, dialogs, hover and frames', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/AutomationPractice/');

  const displayedText = page.locator('#displayed-text');
  await expect(displayedText).toBeVisible();
  await page.locator('#hide-textbox').click();
  await expect(displayedText).toBeHidden();

  page.once('dialog', async dialog => {
    await dialog.accept();
  });
  await page.locator('#confirmbtn').click();
  await page.locator('#mousehover').hover();

  const courseFrame = page.frameLocator('#courses-iframe');
  await courseFrame.locator("li a[href*='lifetime-access']:visible").click();
  await expect(courseFrame.locator('.text h2')).not.toBeEmpty();
});
