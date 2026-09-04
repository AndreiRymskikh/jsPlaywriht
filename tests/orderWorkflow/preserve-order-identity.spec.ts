// spec: specs/authenticated-order-workflow.md
// seed: tests/seed.spec.ts

import { test } from '../../fixtures/api.fixture';
import { orderTestData } from '../../testData/order.data';

test.describe('Authenticated Order Workflow', () => {
  test('@API @OrderMutation Preserve order identity across confirmation and history', async ({
    api,
    pages
  }) => {
    // 1. Create a scenario-local order and capture its identity.
    const createdOrder = await api.createOrderForProduct(
      orderTestData.productName,
      orderTestData.countryName
    );

    // 2-4. Open its history record and verify the same complete ID in details.
    await pages.login.openAuthenticatedSession(createdOrder.token);
    await pages.orderHistory.openOrder(createdOrder.orderId);
  });
});
