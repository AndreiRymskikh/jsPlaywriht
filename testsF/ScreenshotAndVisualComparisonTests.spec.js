// @ts-check
const { test, expect } = require('@playwright/test');

test('Screenshot and vision comparison', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/AutomationPractice/');

  await expect(page.locator("#displayed-text")).toBeVisible();
  //screenshot of one element by locator
  await page.locator("#hide-textbox").screenshot({path: 'screenshot1.png'});
  await page.locator("#hide-textbox").click();
  //screenshot of all the page
  await page.screenshot({path: 'screenshot.png'})
  await expect(page.locator("#displayed-text")).toBeHidden();
  
  
});
