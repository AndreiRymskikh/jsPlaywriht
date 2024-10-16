const dataSet = JSON.parse(JSON.stringify(require('../utils/properties.json')));

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
         await this.page.goto(dataSet.url);

         await this.username.fill(dataSet.username);
         await this.password.type(dataSet.password);
         await this.signInButton.click();
         await this.page.waitForLoadState('networkidle');
    }

}

module.exports = {LoginPage}