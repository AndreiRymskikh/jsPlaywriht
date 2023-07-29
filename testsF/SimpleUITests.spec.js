// @ts-check
const { test, expect } = require('@playwright/test');

test('Open web site and verify Url and Title', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

  await expect(page).toHaveTitle(/LoginPage Practise | Rahul Shetty Academy/);
  await expect(page).toHaveURL(/.*loginpagePractise/);
});
