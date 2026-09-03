import { test as base } from '@playwright/test';
import { orderTestData, type OrderTestData } from './test-data';

interface TestFixtures {
  orderData: OrderTestData;
}

export const test = base.extend<TestFixtures>({
  orderData: async ({}, use) => {
    await use(orderTestData);
  }
});

export { expect } from '@playwright/test';
