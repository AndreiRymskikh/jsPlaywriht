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
  const card = page.locator(' .card-body a');
  
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

  await expect(page).toHaveTitle(/LoginPage Practise | Rahul Shetty Academy/);
  await expect(page).toHaveURL(/.*loginpagePractise/);

  await usernameField.type("rahulshettyacademy");
  await passwordField.type("learning");
  await signInBtn.click();

  console.log(card.first().textContent());
  await expect(card.first()).toHaveText('iphone X');
});

test('UI controllers', async ({ page }) => {
  const passwordField = page.locator('#password');
  const usernameField = page.locator('#username');
  const userTypeDropDown = page.locator('select.form-control');
  const termsCechbox = page.locator('#terms');
  const documentLink = page.locator("[href*='documents-request']");
  
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

  await expect(page).toHaveTitle(/LoginPage Practise | Rahul Shetty Academy/);
  await expect(page).toHaveURL(/.*loginpagePractise/);

  await usernameField.type("rahulshettyacademy");
  await passwordField.type("learning");
  await userTypeDropDown.selectOption("consult");
  await page.locator('.radiotextsty').last().click();
  await page.locator('#okayBtn').click();

  await expect(page.locator('.radiotextsty').last()).toBeChecked();

  await termsCechbox.click();

  await expect(termsCechbox.last()).toBeChecked();

  await termsCechbox.uncheck();

  expect(await termsCechbox.last().isChecked()).toBeFalsy();

  await expect(documentLink).toHaveAttribute('class', 'blinkingText');

  //await page.pause();
});
