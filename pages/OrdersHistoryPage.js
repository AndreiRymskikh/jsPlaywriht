const { expect } = require('@playwright/test');

class OrdersHistoryPage {

    constructor(page) 
    {
        this.page = page;
        this.myOrders = page.locator("button[routerlink*='myorders']");
        this.order = page.locator("tbody");
        this.row = page.locator("tbody tr");
        this.orderDetails = page.locator(".col-text");
    }

    async openOrderHistoryPageAndCheckOrderId(orderId)
    {
        await this.myOrders.click();
        await this.order.waitFor();
        const rows = await this.row;
 
        for (let i = 0; i < await rows.count(); ++i) {
             const rowOrderId = await rows.nth(i).locator("th").textContent() || "text";
              if (orderId?.includes(rowOrderId)) 
                  {
                       await rows.nth(i).locator("button").first().click();
                       break;
                  }
            }
         const orderIdDetails = await this.orderDetails.textContent() || "text";
         await expect(orderId?.includes(orderIdDetails)).toBeTruthy();
    }
}

module.exports = {OrdersHistoryPage}