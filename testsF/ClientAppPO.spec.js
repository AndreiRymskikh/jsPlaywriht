// @ts-check
const {  test, expect } = require('@playwright/test');
const { customtest } = require('../utils/test-base');

const {POManager} = require('../pages/POManager');
const dataSet = JSON.parse(JSON.stringify(require('../utils/properties.json')));

test('Check product in the cart', async ({ page }) => {
  const getPage = new POManager(page);
  const loginPage = await getPage.getLoginPage();
  const dashboardPage = await getPage.getDashboardPage();

  await loginPage.loginWithDefaultCreds();
  await dashboardPage.showTitles();
  await dashboardPage.searchProduct(dataSet.productName);

  const cartPage = await getPage.getCartPage();
  await cartPage.verifyProductIsDisplayed(dataSet.productName);

  const orderReviewPage = await getPage.getOrderReviewPage();
  await orderReviewPage.searchCountryAndSelect("ind", " India", dataSet.username);
  await orderReviewPage.submitFormAndCheckThankYouMessage();
   
   const orderId = await orderReviewPage.getOrderId();
 
   const orderHistoryPage = await getPage.getOrderHistoryPage();
   await orderHistoryPage.openOrderHistoryPageAndCheckOrderId(orderId);
});


customtest.only('Check product in the cart - custom test', async ({ page, testDataForOrder }) => {
  const getPage = new POManager(page);
  const loginPage = await getPage.getLoginPage();
  const dashboardPage = await getPage.getDashboardPage();

  await loginPage.loginWithDefaultCreds();
  await dashboardPage.showTitles();
  await dashboardPage.searchProduct(testDataForOrder.productName);

  const cartPage = await getPage.getCartPage();
  await cartPage.verifyProductIsDisplayed(testDataForOrder.productName);

  const orderReviewPage = await getPage.getOrderReviewPage();
  await orderReviewPage.searchCountryAndSelect("ind", " India", dataSet.username);
  await orderReviewPage.submitFormAndCheckThankYouMessage();
   
   const orderId = await orderReviewPage.getOrderId();
 
   const orderHistoryPage = await getPage.getOrderHistoryPage();
   await orderHistoryPage.openOrderHistoryPageAndCheckOrderId(orderId);
});