// spec: specs/authenticated-order-workflow.md
// seed: tests/seed.spec.ts

import { test } from '../../fixtures/api.fixture';

test.describe('Authenticated Order Workflow', () => {
  test('Handle an order-history lookup with no matching ID', async ({
    authToken,
    pages
  }) => {
    // 1. Sign in through a scenario-local authenticated browser session.
    await pages.login.openAuthenticatedSession(authToken);

    // 2-3. Verify a well-formed nonexistent ID matches no order row.
    await pages.orderHistory.expectOrderAbsent('000000000000000000000000');
  });
});
