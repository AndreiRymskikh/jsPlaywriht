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
        token = loginRespoceJson.token;
        
        return token;
    }

    async createOrder(orderPayload) {
        const orderResponce = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
                {
                    data: orderPayload,
                    headers: {
                      'Authorization' : this.getToken(),
                      'Content-Type' : 'application/json'
                     }
                 });

        const orderResponceJson = await orderResponce.json();
        orderId = orderResponceJson.orders[0];

        return orderId;
    }
}

module.exports = {ApiUtils}