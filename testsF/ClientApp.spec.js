// @ts-check
const { test, expect } = require('@playwright/test');

test('Open web site and verify Url and Title', async ({ page }) => {
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

  const productName = "Zara Coat 4";
  const prodQty = await products.count();
  for(let i = 0; i < prodQty; i++)
  {
    if( await products.nth(i).locator("b").textContent() === productName)
    {
      await products.nth(i).locator("text = Add To Card").click();
      break;
    }
  }
});
