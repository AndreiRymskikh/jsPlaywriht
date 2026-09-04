// spec: specs/authenticated-order-workflow.md
// seed: tests/seed.spec.ts

import { test } from '../../fixtures/page.fixture';

test.describe('Authenticated Order Workflow', () => {
  test('Prevent checkout with an empty cart', async ({ pages }) => {
    // 1. Sign in with the configured valid credentials.
    await pages.login.loginWithDefaultCredentials();

    // 2-3. Open an empty cart and verify checkout is unavailable.
    await pages.dashboard.openCartWithoutExpectingItems();
    await pages.cart.expectEmpty();
  });
});
