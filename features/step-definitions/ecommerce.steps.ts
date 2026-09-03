import { Given, Then, When } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world';

function getApp(world: CustomWorld) {
  if (!world.app) {
    throw new Error('The test application was not initialized');
  }

  return world.app;
}

Given(
  'User is logged in the App',
  { timeout: 100_000 },
  async function (this: CustomWorld) {
    await getApp(this).login.loginWithDefaultCredentials();
  }
);

When(
  'Add {string} to Cart',
  async function (this: CustomWorld, productName: string) {
    const app = getApp(this);
    await app.dashboard.addProductToCart(productName);
    await app.dashboard.openCart();
  }
);

Then(
  'Verify {string} is displayed in the Cart',
  async function (this: CustomWorld, productName: string) {
    await getApp(this).cart.expectProductVisible(productName);
  }
);
