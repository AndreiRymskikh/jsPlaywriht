const {POManager} = require('../../pages/POManager');
const playwright = require('@playwright/test');
const {Before, After} = require('@cucumber/cucumber');


Before(async function () {
    const browser = await playwright.chromium.launch({
        headless : false
    });
    const context = await browser.newContext();
    const page = await context.newPage();

    this.getPage = new POManager(page);
});

After(function () {
    console.log("The end of the test");
});