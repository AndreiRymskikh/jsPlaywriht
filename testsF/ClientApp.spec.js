// @ts-check
const { test, expect } = require('@playwright/test');

test('Check product in the cart', async ({ page }) => {
  const userEmailField = page.locator("#userEmail");
  const passwordField = page.locator("#userPassword");
  const loginBtn = page.locator("#login");
  const products = page.locator(".card-body");

  await page.goto('https://rahulshettyacademy.com/client/');

  await userEmailField.fill("anshika@gmail.com");
  await passwordField.type("Iamking@000");
  await loginBtn.click();
  await page.waitForLoadState('networkidle');

  const titles = await page.locator(".card-body b").allTextContents();
  console.log(titles);

  const productName = "zara coat 3";
  const prodQty = await products.count();
  for(let i = 0; i < prodQty; i++)
  {
    if( await products.nth(i).locator("b").textContent() === productName)
    {
      await products.nth(i).locator("text = Add To Cart").click();
      break;
    }
  }
  await page.locator("[routerlink*= 'cart']").click();
  await page.pause();
  await page.locator("div li").first().waitFor();

  const isElemVisible = page.locator("h3:has-text('zara coat 3')").isVisible();

  expect(isElemVisible).toBeTruthy();

});
