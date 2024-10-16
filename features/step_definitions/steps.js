const {Given, When, Then} = require('@cucumber/cucumber');
const {POManager} = require('../../pages/POManager');
const playwright = require('@playwright/test');

Given('User is logged in the App', {timeout : 100 * 1000}, async function() {
    const browser = await playwright.chromium.launch({
        headless : false
    });
    const context = await browser.newContext();
    const page = await context.newPage();

    this.getPage = new POManager(page);
    const loginPage = await this.getPage.getLoginPage();

    await loginPage.loginWithDefaultCreds();
}
);

When('Add {string} to Cart', async function(productName){
    const dashboardPage = await this.getPage.getDashboardPage();
    await dashboardPage.showTitles();
    await dashboardPage.searchProductAndAddToCart(productName);

    
});

Then('Verify {string} is displayed in the Cart', async function(productName){
    const cartPage = await this.getPage.getCartPage();
    await cartPage.verifyProductIsDisplayed(productName);
});