// @ts-check
const { test, expect, request } = require('@playwright/test');
const loginPayload = {"userEmail" : "anshika@gmail.com", "userPassword" : "Iamking@000"};

test.beforeAll( async () => 
{
  const apiContext = await request.newContext();
  const loginResponce = await apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login', 
    {
     data : loginPayload
    })
  expect(loginResponce.ok()).toBeTruthy();
  const loginRespoceJson = await loginResponce.json();
  const token = loginRespoceJson.token;
});

test.beforeEach(() => 
{

});

test('Popup validations', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
  //await page.goto('http://google.com');
  //await page.goBack();
  //await page.goForward();

  
});
