const {LoginPage} = require('./LoginPage');
const {DashboardPage} = require('./DashboardPage');
const {CartPage} = require('./CartPage');
const {OrderReviewPage} = require('./OrderReviewPage');
const {OrdersHistoryPage} = require('./OrdersHistoryPage');

class POManager {
    constructor(page)
    {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new DashboardPage(this.page);
        this.cartPage = new CartPage(this.page);
        this.orderReviewPage = new OrderReviewPage(this.page);
        this.orderHistoryPage = new OrdersHistoryPage(this.page);
    }

    getLoginPage()
    {
        return this.loginPage;
    }

    getDashboardPage()
    {
        return this.dashboardPage;
    }

    getCartPage()
    {
        return this.cartPage;
    }

    getOrderReviewPage()
    {
        return this.orderReviewPage;
    }

    getOrderHistoryPage()
    {
        return this.orderHistoryPage;
    }
}

module.exports = {POManager}