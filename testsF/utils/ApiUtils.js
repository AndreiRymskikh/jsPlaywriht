const {expect} = require('@playwright/test');

class ApiUtils 
{
constructor(apiContext, loginPayload) {
    this.apiContext = apiContext;
    this.loginPayload = loginPayload;
}

    async getToken() {
        const loginResponce = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login', 
          {
           data : this.loginPayload
          })
        expect(loginResponce.ok()).toBeTruthy();
        const loginRespoceJson = await loginResponce.json();
        const token = loginRespoceJson.token;
        
        return token;
    }

    async createOrder(orderPayload) {
        let responce = {};
        responce.token = await this.getToken();
        const orderResponce = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
                {
                    data: orderPayload,
                    headers: {
                      'Authorization' : responce.token,
                      'Content-Type' : 'application/json'
                     }
                 });

        const orderResponceJson = await orderResponce.json();
        const orderId = orderResponceJson.orders[0];
        responce.orderId = orderId;

        return responce;
    }
}

module.exports = {ApiUtils}