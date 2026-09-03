import { test } from './fixtures/api.fixture';

test('@API replaces the order-history response', async ({
  app,
  authToken,
  page
}) => {
  await page.route('**/api/ecom/order/get-orders-for-customer/*', async route => {
    const response = await route.fetch();
    await route.fulfill({
      response,
      json: { data: [], message: 'No Orders' }
    });
  });

  await app.login.openAuthenticatedSession(authToken);
  await app.orderHistory.open();
  await app.orderHistory.expectNoOrders();
});
