import { test } from '../../fixtures/api.fixture';
import { orderTestData } from '../../testData/order.data';

test('@API creates an order through the API and verifies it in the UI', async ({
  api,
  pages
}) => {
  const createdOrder = await api.createOrderForProduct(
    orderTestData.productName,
    orderTestData.countryName
  );

  await pages.login.openAuthenticatedSession(createdOrder.token);
  await pages.orderHistory.openOrder(createdOrder.orderId);
});
