// @ts-check
const { test, expect } = require('@playwright/test');
let webContext;

test.beforeAll( async ({browser}) =>
{
    const context = await browser.newContext();
    const page = await context.newPage(); 
    const userEmailField = page.locator("#userEmail");
    const passwordField = page.locator("#userPassword");
    const loginBtn = page.locator("#login");
    const email = "anshika@gmail.com";
  
    await page.goto('https://rahulshettyacademy.com/client/');
  
    await userEmailField.fill(email);
    await passwordField.type("Iamking@000");
    await loginBtn.click();
    await page.waitForLoadState('networkidle');

    await context.storageState({path: 'storage.json'});

    webContext = await browser.newContext({storageState: 'storage.json'});

})

test('@API Check product in the cart using local storage', async () => {
 const page =  await webContext.newPage();
 await page.goto('https://rahulshettyacademy.com/client/');
  

 const products = page.locator(".card-body");
 const email = "anshika@gmail.com";

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
  await page.locator("div li").first().waitFor();

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
});
