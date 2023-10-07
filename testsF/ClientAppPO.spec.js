// @ts-check
const { test, expect } = require('@playwright/test');
const {POManager} = require('./pages/POManager');

test('Check product in the cart', async ({ page }) => {
  const email = "anshika@gmail.com";
  const productName = "zara coat 3";

  const getPage = new POManager(page);
  const loginPage = await getPage.getLoginPage();
  const dashboardPage = await getPage.getDashboardPage();

  await loginPage.loginWithDefaultCreds();
  await dashboardPage.showTitles();
  await dashboardPage.searchProduct(productName);

  const cartPage = await getPage.getCartPage();
  await cartPage.verifyProductIsDisplayed("zara coat 3");

  const orderReviewPage = await getPage.getOrderReviewPage();
  await orderReviewPage.searchCountryAndSelect("ind", " India", email);
  await orderReviewPage.submitFormAndCheckThankYouMessage();
   
   const orderId = await orderReviewPage.getOrderId();
 
   const orderHistoryPage = await getPage.getOrderHistoryPage();
   await orderHistoryPage.openOrderHistoryPageAndCheckOrderId(orderId);
});
