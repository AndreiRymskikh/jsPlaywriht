// spec: specs/authenticated-order-workflow.md
// seed: tests/seed.spec.ts

import { test } from '../../fixtures/page.fixture';
import { orderTestData } from '../../testData/order.data';

test.describe('Authenticated Order Workflow', () => {
  test('Require an exact country selection', async ({ pages }) => {
    // 1. Sign in, add the configured product, and begin checkout.
    await pages.login.loginWithDefaultCredentials();
    await pages.dashboard.addProductToCart(orderTestData.productName);
    await pages.dashboard.openCart();
    await pages.orderReview.beginCheckout();

    // 2-3. Search broad suggestions and select the exact intended country.
    await pages.orderReview.searchCountry(orderTestData.countryCode);
    await pages.orderReview.expectMultipleCountrySuggestions();
    await pages.orderReview.selectExactCountry(orderTestData.countryName);

    // 4. Verify a nonsense search cannot resolve to a country suggestion.
    await pages.orderReview.searchCountry(`missing-country-${Date.now()}`);
    await pages.orderReview.expectNoCountrySuggestions();
  });
});
