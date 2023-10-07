const { expect } = require('@playwright/test');

class CartPage {

    constructor(page) 
    {
        this.page = page;
    }

    async verifyProductIsDisplayed(productName)
    {
        const isElemVisible = this.page.locator("h3:has-text('"+ productName +"')").isVisible();

        expect(isElemVisible).toBeTruthy();
    }

}

module.exports = {CartPage}