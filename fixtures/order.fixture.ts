import { test as base } from './page.fixture';
import { orderTestData, type OrderTestData } from '../testData/order.data';

interface OrderFixtures {
  orderData: OrderTestData;
}

export const test = base.extend<OrderFixtures>({
  orderData: async ({}, use) => {
    await use(orderTestData);
  }
});

export { expect } from '@playwright/test';
