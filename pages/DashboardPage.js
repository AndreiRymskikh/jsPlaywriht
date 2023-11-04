class DashboardPage 
{
    constructor(page) 
    {
        this.page = page;
        this.products = page.locator(".card-body");
        this.cardBody = page.locator(".card-body b");
        this.cart = page.locator("[routerlink*= 'cart']");
        this.cartElements = page.locator("div li");
        this.addToCartLocator = "text = Add To Cart";

    }

    async showTitles()
    {
        const titles = await this.cardBody.allTextContents();
        console.log(titles);
      
    }

    async searchProductAndAddToCart(productName)
    {
        const prodQty = await this.products.count();
        for(let i = 0; i < prodQty; i++)
        {
          if( await this.products.nth(i).locator("b").textContent() === productName)
          {
            await this.products.nth(i).locator(this.addToCartLocator).click();
            break;
          }
        }
        await this.cart.click();
        await this.cartElements.first().waitFor();
    }
}


module.exports = {DashboardPage}