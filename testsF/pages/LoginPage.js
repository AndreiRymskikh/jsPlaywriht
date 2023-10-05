class LoginPage {

    constructor(page) 
    {
        this.page = page;
        this.signInButton = page.locator("#login");
        this.username = page.locator("#userEmail");
        this.password = page.locator("#userPassword");
    }

    async loginWithDefaultCreds()
    {
         await this.page.goto('https://rahulshettyacademy.com/client/');

         await this.username.fill("anshika@gmail.com");
         await this.password.type("Iamking@000");
         await this.signInButton.click();
         await this.page.waitForLoadState('networkidle');
    }

}

module.exports = {LoginPage}