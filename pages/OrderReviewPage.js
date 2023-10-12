const { expect } = require('@playwright/test');

class OrderReviewPage {

    constructor(page) 
    {
        this.page = page;
        this.checkout = page.locator("text=Checkout");
        this.countryField = page.locator("[placeholder*='Country']");
       // this.options = page.locator("section.ta-results.list-group");
        this.submitButton = page.locator("xpath=//*[text() = 'Place Order ']");
        this.headerText = page.locator(".hero-primary");
        this.orderIdText = page.locator(".em-spacer-1 .ng-star-inserted");
    }

    async searchCountryAndSelect(countryCode, countryName, email)
    {
        await this.checkout.click();
        await this.countryField.type(countryCode, {delay: 100});

        const options = this.page.locator(".ta-results");
        const optionsCount = await options.locator("button").count();
        
        for(let i = 0; i < optionsCount; ++i){
            const text = await options.locator("button").nth(1).textContent();

             if(text === countryName)
             {
                await this.page.pause();
                await options.locator("button").nth(1).click();
                 break;
             }
        }

        await expect(this.page.locator(".user__name [type='text']").first()).toHaveText(email);
    }

    async submitFormAndCheckThankYouMessage()
    {
        await this.submitButton.click();

        await expect(this.headerText).toHaveText(" Thankyou for the order. ");
    }

    async getOrderId()
    {
        const orderId = await this.orderIdText.textContent();
        console.log(orderId);

        return orderId;
    }


}

module.exports = {OrderReviewPage}