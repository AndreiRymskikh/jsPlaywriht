// @ts-check
const { test, expect } = require('@playwright/test');
const {LoginPage} = require('./pages/LoginPage');
const {DashboardPage} = require('./pages/DashboardPage');

test('Check product in the cart', async ({ page }) => {
  const products = page.locator(".card-body");
  const email = "anshika@gmail.com";
  const productName = "zara coat 3";

  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);

  await loginPage.loginWithDefaultCreds();
  await dashboardPage.showTitles();
  await dashboardPage.searchProduct(productName);

  const isElemVisible = page.locator("h3:has-text('zara coat 3')").isVisible();

  expect(isElemVisible).toBeTruthy();

  await page.locator("text=Checkout").click();
  await page.locator("[placeholder*='Country']").type("ind", {delay: 100});

  const options = page.locator(".ta-results");
  await options.waitFor();
  const optionsCount = await options.locator("button").count();

  for(let i = 0; i < optionsCount; ++i){
    const text = await options.locator("button").nth(1).textContent();

    if(text === " India")
    {
      await options.locator("button").nth(1).click();
      break;
    }
  }

   await expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
  
   await page.locator(".action__submit").click();

   await page.pause();
   await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");

   const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
   console.log(orderId);
 
   await page.locator("button[routerlink*='myorders']").click();
   await page.locator("tbody").waitFor();
   const rows = await page.locator("tbody tr");
 
   for (let i = 0; i < await rows.count(); ++i) {
      const rowOrderId = await rows.nth(i).locator("th").textContent() || "text";
      if (orderId?.includes(rowOrderId)) 
      {
         await rows.nth(i).locator("button").first().click();
         break;
      }
   }
   const orderIdDetails = await page.locator(".col-text").textContent() || "text";
   await expect(orderId?.includes(orderIdDetails)).toBeTruthy();
});
