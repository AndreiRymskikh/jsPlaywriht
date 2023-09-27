// @ts-check
const { test, expect, request } = require('@playwright/test');
const {ApiUtils} = require('./utils/ApiUtils')

const loginPayload = {"userEmail" : "anshika@gmail.com", "userPassword" : "Iamking@000"};
const orderPayload = {orders: [{country: "India", productOrderedId: "6262e95ae26b7e1a10e89bf0"}]};
const fakePayloadOrders = {data : [], message : "No Orders"};

let responce;

test.beforeAll( async () => 
{
  const apiContext = await request.newContext();
  const apiUtils = new ApiUtils(apiContext, loginPayload);
  responce = await apiUtils.createOrder(orderPayload);
});

test('Network test, inersept the request and put fake data there', async ({ page }) => {
  page.addInitScript(value => {
    window.localStorage.setItem('token', value);
  }, responce.token);

  await page.goto('https://rahulshettyacademy.com/client/');

  await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*", 
    async route => {
      //intersepting responce
          const responce = await page.request.fetch(route.request());
          let body = JSON.stringify(fakePayloadOrders);
          route.fulfill({
          response: responce,
          body: body
         });
      });
  
  await page.locator("button[routerlink*='myorders']").click();
  await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");
  await page.pause();

});
