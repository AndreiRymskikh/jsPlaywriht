// spec: specs/authenticated-order-workflow.md
// seed: tests/seed.spec.ts

import { expect, test } from '../../fixtures/page.fixture';
import { environment } from '../../config/environment';

test.describe('Authenticated Order Workflow', () => {
  test('Reject invalid credentials', async ({ page, pages }) => {
    // 1-3. Submit credentials that cannot identify a registered account.
    await pages.login.submitCredentials(
      `not-registered-${Date.now()}@example.invalid`,
      'invalid-password'
    );
    await pages.login.expectAuthenticationRejected();

    // 4. Attempt to navigate directly to a protected order-history route.
    await page.goto(new URL('dashboard/myorders', environment.baseUrl).toString());
    await expect(page).toHaveURL(/auth|login/i);
    await pages.login.expectLoginFormVisible();
  });
});
