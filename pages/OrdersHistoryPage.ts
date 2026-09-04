import { expect, type Locator, type Page } from '@playwright/test';

export class OrdersHistoryPage {
  private readonly myOrders: Locator;
  private readonly rows: Locator;
  private readonly orderDetails: Locator;
  private readonly noOrdersMessage: Locator;

  constructor(private readonly page: Page) {
    this.myOrders = page.locator("button[routerlink*='myorders']");
    this.rows = page.locator('tbody tr');
    this.orderDetails = page.locator('.col-text');
    this.noOrdersMessage = page.getByText('No Orders');
  }

  async open(): Promise<void> {
    await this.myOrders.click();
  }

  async openOrder(orderId: string): Promise<void> {
    await this.open();
    await expect(this.rows.first()).toBeVisible();

    const matchingRow = this.rows.filter({
      has: this.page.locator('th', { hasText: orderId })
    });
    await expect(matchingRow, `Order "${orderId}" was not found`).toHaveCount(1);
    await matchingRow.getByRole('button').first().click();
    await expect(this.orderDetails).toContainText(orderId);
  }

  async expectNoOrders(): Promise<void> {
    await expect(this.noOrdersMessage).toBeVisible();
  }

  async expectOrderAbsent(orderId: string): Promise<void> {
    await this.open();
    await expect(
      this.rows.filter({ has: this.page.locator('th', { hasText: orderId }) })
    ).toHaveCount(0);
  }
}
