import { test } from './fixtures/api.fixture';
import { orderTestData } from '../../utils/test-data';

test('@API creates an order through the API and verifies it in the UI', async ({
  api,
  app
}) => {
  const createdOrder = await api.createOrderForProduct(
    orderTestData.productName,
    orderTestData.countryName
  );

  await app.login.openAuthenticatedSession(createdOrder.token);
  await app.orderHistory.openOrder(createdOrder.orderId);
});
