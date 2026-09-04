import { test } from '../fixtures/page.fixture';

test.describe('Authenticated order workflow', () => {
  test('seed', async ({ pages }) => {
    // Exposes the project's Page Objects without imposing authenticated state.
    await pages.login.open();
  });
});
