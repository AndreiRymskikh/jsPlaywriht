// spec: specs/authenticated-order-workflow.md
// seed: tests/seed.spec.ts

import { test } from '../../fixtures/page.fixture';
import { orderTestData } from '../../testData/order.data';

test.describe('Authenticated Order Workflow', () => {
  test('@Web @OrderMutation Place an order and find it in order history', async ({ pages }) => {
    // 1-2. Open the storefront and authenticate with the configured account.
    await pages.login.loginWithDefaultCredentials();

    // 3-4. Add the configured product and verify it in the cart.
    await pages.dashboard.addProductToCart(orderTestData.productName);
    await pages.dashboard.openCart();
    await pages.cart.expectProductVisible(orderTestData.productName);

    // 5-7. Checkout and select the exact configured country.
    const { environment } = await import('../../config/environment');
    await pages.orderReview.checkoutAndSelectCountry(
      orderTestData.countryCode,
      orderTestData.countryName,
      environment.email
    );

    // 8-10. Place the order and verify the same ID in order history.
    const orderId = await pages.orderReview.placeOrder();
    await pages.orderHistory.openOrder(orderId);
  });
});
