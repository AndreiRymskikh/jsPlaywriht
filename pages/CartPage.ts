import { expect, type Page } from '@playwright/test';

export class CartPage {
  constructor(private readonly page: Page) {}

  async expectProductVisible(productName: string): Promise<void> {
    await expect(
      this.page.locator('h3').filter({ hasText: productName })
    ).toBeVisible();
  }

  async expectEmpty(): Promise<void> {
    await expect(
      this.page.getByText('No Products in Your Cart !', { exact: true })
    ).toBeVisible();
    await expect(this.page.getByText('Checkout', { exact: true })).toHaveCount(0);
  }
}
