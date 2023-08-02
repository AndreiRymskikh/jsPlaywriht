// @ts-check
const { test, expect } = require('@playwright/test');

test('Open web site and verify Url and Title', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

  await expect(page).toHaveTitle(/LoginPage Practise | Rahul Shetty Academy/);
  await expect(page).toHaveURL(/.*loginpagePractise/);
});

test('Login web site and check that User authorised successfully', async ({ page }) => {
  const passwordField = page.locator('#password');
  const usernameField = page.locator('#username');
  const signInBtn = page.locator('#signInBtn');
  const card = page.locator('.card-body a');
  
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

  await expect(page).toHaveTitle(/LoginPage Practise | Rahul Shetty Academy/);
  await expect(page).toHaveURL(/.*loginpagePractise/);

  await usernameField.type("rahulshettyacademy");
  await passwordField.type("learning");
  await signInBtn.click();

  console.log(card.nth(0).textContent);
});
