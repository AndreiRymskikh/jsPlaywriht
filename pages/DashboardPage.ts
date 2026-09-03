import { expect, type Locator, type Page } from '@playwright/test';

export class DashboardPage {
  private readonly products: Locator;
  private readonly cart: Locator;

  constructor(private readonly page: Page) {
    this.products = page.locator('.card-body');
    this.cart = page.locator("[routerlink*='cart']");
  }

  async getProductTitles(): Promise<string[]> {
    return this.products.locator('b').allTextContents();
  }

  async addProductToCart(productName: string): Promise<void> {
    const product = this.products.filter({
      has: this.page.locator('b', { hasText: productName })
    });

    await expect(product, `Product "${productName}" was not found`).toHaveCount(1);
    await product.getByText('Add To Cart', { exact: true }).click();
  }

  async openCart(): Promise<void> {
    await this.cart.click();
    await expect(this.page.locator('div li').first()).toBeVisible();
  }
}
