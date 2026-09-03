import { request, test, expect } from '@playwright/test';
import { ApiUtils } from '../../utils/ApiUtils';
import { environment } from '../../utils/environment';

let token: string;

test.beforeAll(async () => {
  const apiContext = await request.newContext({
    baseURL: environment.apiBaseUrl
  });

  try {
    const api = new ApiUtils(apiContext, {
      userEmail: environment.email,
      userPassword: environment.password
    });
    token = await api.getToken();
  } finally {
    await apiContext.dispose();
  }
});

test('@API replaces the order-history response', async ({ page }) => {
  await page.addInitScript(token => {
    window.localStorage.setItem('token', token);
  }, token);

  await page.route('**/api/ecom/order/get-orders-for-customer/*', async route => {
    const response = await route.fetch();
    await route.fulfill({
      response,
      json: { data: [], message: 'No Orders' }
    });
  });

  await page.goto(environment.baseUrl);
  await page.locator("button[routerlink*='myorders']").click();
  await expect(page.getByText('No Orders')).toBeVisible();
});
