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

test('Security test request intercept', async ({ page }) => {
  const userEmailField = page.locator("#userEmail");
  const passwordField = page.locator("#userPassword");
  const loginBtn = page.locator("#login");
  const products = page.locator(".card-body");
  const email = "anshika@gmail.com";

  await page.goto('https://rahulshettyacademy.com/client/');

  await userEmailField.fill(email);
  await passwordField.type("Iamking@000");
  await loginBtn.click();
  await page.waitForLoadState('networkidle');

  await page.locator("button[routerlink*='myorders']")
  //Intercept request and change url of that request
  await page.route("https://rahulshettyacademy.com/api/ecom/product/get-product-detail/*", 
    route => route.continue({url: "https://rahulshettyacademy.com/api/ecom/product/get-product-detail/someIdhjdkfhgjk" }));

  await page.locator("button:has-text(' View')").first().click();
  await page.pause();

});
