// spec: specs/authenticated-order-workflow.md
// seed: tests/seed.spec.ts

import { expect, test } from '../../fixtures/page.fixture';
import { environment } from '../../config/environment';

test.describe('Authenticated Order Workflow', () => {
  test('Protect authenticated routes after session loss', async ({ page, pages }) => {
    // 1. Sign in and verify the authenticated dashboard is available.
    await pages.login.loginWithDefaultCredentials();

    // 2. Remove the browser's authentication token.
    await page.evaluate(() => window.localStorage.removeItem('token'));

    // 3. Navigate directly to the protected order-history route.
    await page.goto(new URL('dashboard/myorders', environment.baseUrl).toString());
    await expect(page).toHaveURL(/auth|login/i);
    await pages.login.expectLoginFormVisible();

    // 4. Browser back navigation must not restore protected content.
    await page.goBack();
    await page.reload();
    await expect(page).toHaveURL(/auth|login/i);
    await pages.login.expectLoginFormVisible();
  });
});
