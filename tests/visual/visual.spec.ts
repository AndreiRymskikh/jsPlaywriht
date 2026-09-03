import { test, expect } from '@playwright/test';

test('@Web captures a stable visual snapshot', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/AutomationPractice/');

  const displayedText = page.locator('#displayed-text');
  const hideButton = page.locator('#hide-textbox');
  await expect(displayedText).toBeVisible();
  await expect(hideButton).toHaveScreenshot('hide-button.png', {
    animations: 'disabled'
  });

  await hideButton.click();
  await expect(displayedText).toBeHidden();
});
