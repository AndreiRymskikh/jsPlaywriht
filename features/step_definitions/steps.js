const {Given, When, Then} = require('@cucumber/cucumber');
const {POManager} = require('../pages/POManager');

Given('User is logged in the App', async function() {
    const getPage = new POManager(page);
    const loginPage = await getPage.getLoginPage();

    await loginPage.loginWithDefaultCreds();
}
);

When('Add {productName} to Cart', async function(productName){
    const getPage = new POManager(page);
    const dashboardPage = await getPage.getDashboardPage();
    await dashboardPage.showTitles();
    await dashboardPage.searchProductAndAddToCart(productName);

    
});

Then('Verify {productName} is displayed in the Cart', async function(productName){
    const getPage = new POManager(page);
    const cartPage = await getPage.getCartPage();
    await cartPage.verifyProductIsDisplayed(productName);
});