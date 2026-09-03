import { expect, type Page } from '@playwright/test';

export class CartPage {
  constructor(private readonly page: Page) {}

  async expectProductVisible(productName: string): Promise<void> {
    await expect(
      this.page.locator('h3').filter({ hasText: productName })
    ).toBeVisible();
  }
}
