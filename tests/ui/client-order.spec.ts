import { test, expect } from '../../utils/fixtures';
import { POManager } from '../../pages/POManager';
import { environment } from '../../utils/environment';

test('@Web places an order and finds it in order history', async ({
  page,
  orderData
}) => {
  const app = new POManager(page);

  await app.login.loginWithDefaultCredentials();
  await app.dashboard.addProductToCart(orderData.productName);
  await app.dashboard.openCart();
  await app.cart.expectProductVisible(orderData.productName);
  await app.orderReview.checkoutAndSelectCountry(
    orderData.countryCode,
    orderData.countryName,
    environment.email
  );

  const orderId = await app.orderReview.placeOrder();
  await app.orderHistory.openOrder(orderId);

  await expect(page.locator('.col-text')).toContainText(orderId);
});
