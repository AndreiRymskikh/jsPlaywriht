import { request, test, expect } from '@playwright/test';
import { ApiUtils } from '../../utils/ApiUtils';
import { environment } from '../../utils/environment';
import { orderTestData } from '../../utils/test-data';

test('@API creates an order through the API and verifies it in the UI', async ({
  page
}) => {
  const apiContext = await request.newContext({
    baseURL: environment.apiBaseUrl
  });

  try {
    const api = new ApiUtils(apiContext, {
      userEmail: environment.email,
      userPassword: environment.password
    });
    const createdOrder = await api.createOrderForProduct(
      orderTestData.productName,
      orderTestData.countryName
    );

    await page.addInitScript(token => {
      window.localStorage.setItem('token', token);
    }, createdOrder.token);
    await page.goto(environment.baseUrl);
    await page.locator("button[routerlink*='myorders']").click();

    const matchingRow = page.locator('tbody tr').filter({
      has: page.locator('th', { hasText: createdOrder.orderId })
    });
    await expect(matchingRow).toHaveCount(1);
    await matchingRow.getByRole('button').first().click();
    await expect(page.locator('.col-text')).toContainText(createdOrder.orderId);
  } finally {
    await apiContext.dispose();
  }
});
