import { Given, Then, When } from '@cucumber/cucumber';
import { environment } from '../utils/environment';
import { orderTestData } from '../utils/test-data';
import {
  CustomWorld,
  requirePages
} from '../cucumberTests/support/world';

Given('the user is logged in', async function (this: CustomWorld) {
  await requirePages(this).login.loginWithDefaultCredentials();
});

When(
  'the user adds the configured product to the cart',
  async function (this: CustomWorld) {
    const pages = requirePages(this);
    await pages.dashboard.addProductToCart(orderTestData.productName);
    await pages.dashboard.openCart();
  }
);

Then(
  'the configured product should be displayed in the cart',
  async function (this: CustomWorld) {
    await requirePages(this).cart.expectProductVisible(
      orderTestData.productName
    );
  }
);

When(
  'the user completes checkout with the configured country',
  async function (this: CustomWorld) {
    await requirePages(this).orderReview.checkoutAndSelectCountry(
      orderTestData.countryCode,
      orderTestData.countryName,
      environment.email
    );
  }
);

Then(
  'the order should be placed successfully',
  async function (this: CustomWorld) {
    this.orderId = await requirePages(this).orderReview.placeOrder();
  }
);

Then(
  'the order should appear in the order history',
  async function (this: CustomWorld) {
    if (!this.orderId) {
      throw new Error('No order ID was saved by the order-placement step');
    }

    await requirePages(this).orderHistory.openOrder(this.orderId);
  }
);
