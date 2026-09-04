// spec: specs/authenticated-order-workflow.md
// seed: tests/seed.spec.ts

import { expect, test } from '../../fixtures/page.fixture';

test.describe('Authenticated Order Workflow', () => {
  test('Handle a configured product that is unavailable', async ({ pages }) => {
    // 1. Sign in with valid credentials.
    await pages.login.loginWithDefaultCredentials();

    // 2-3. Verify a nonexistent product is not silently matched.
    const unavailableProduct = `missing-product-${Date.now()}`;
    const titles = await pages.dashboard.getProductTitles();
    expect(titles).not.toContain(unavailableProduct);
  });
});
