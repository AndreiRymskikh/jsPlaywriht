import { test } from '../../fixtures/api.fixture';

test('@API replaces the order-history response', async ({
  pages,
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

  await pages.login.openAuthenticatedSession(authToken);
  await pages.orderHistory.open();
  await pages.orderHistory.expectNoOrders();
});
