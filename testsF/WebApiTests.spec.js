// @ts-check
const { test, expect, request } = require('@playwright/test');
const loginPayload = {"userEmail" : "anshika@gmail.com", "userPassword" : "Iamking@000"};
const orderPayload = {orders: [{country: "India", productOrderedId: "6262e95ae26b7e1a10e89bf0"}]};
let token;
let orderId;

test.beforeAll( async () => 
{
  const apiContext = await request.newContext();
  const loginResponce = await apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login', 
    {
     data : loginPayload
    })
  expect(loginResponce.ok()).toBeTruthy();
  const loginRespoceJson = await loginResponce.json();
  token = loginRespoceJson.token;
  console.log(token);
  
  const orderResponce = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
  {
    data: orderPayload,
    headers: {
      'Authorization' : token,
      'Content-Type' : 'application/json'
    }
  });

  const orderResponceJson = await orderResponce.json();
  orderId = orderResponceJson.orders[0];

});

test.beforeEach(() => 
{

});

test('Api test, add the order', async ({ page }) => {

  page.addInitScript(value => {
    window.localStorage.setItem('token', value);
  }, token);

  await page.goto('https://rahulshettyacademy.com/client/');
  await page.locator("button[routerlink*='myorders']").click();
  await page.locator("tbody").waitFor();

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
  await page.pause();
  
});
