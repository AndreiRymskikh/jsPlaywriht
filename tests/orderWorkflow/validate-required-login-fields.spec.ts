// spec: specs/authenticated-order-workflow.md
// seed: tests/seed.spec.ts

import { test } from '../../fixtures/page.fixture';

test.describe('Authenticated Order Workflow', () => {
  test('Validate required login fields', async ({ pages }) => {
    // 1-2. Submit the login form without either required value.
    await pages.login.submitEmptyForm();
    await pages.login.expectRequiredFieldValidation();

    // 3. Submit an invalid email format and verify authentication is rejected.
    await pages.login.submitCredentials('not-an-email', 'invalid-password');
    await pages.login.expectInvalidEmailRejected();
  });
});
