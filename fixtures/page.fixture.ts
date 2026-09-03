import { test as base, type Page } from '@playwright/test';
import { AutomationPracticePage } from '../pages/AutomationPracticePage';
import { CartPage } from '../pages/CartPage';
import { DashboardPage } from '../pages/DashboardPage';
import { LoginPage } from '../pages/LoginPage';
import { OrderReviewPage } from '../pages/OrderReviewPage';
import { OrdersHistoryPage } from '../pages/OrdersHistoryPage';

export class PageFixture {
  readonly automationPractice: AutomationPracticePage;
  readonly login: LoginPage;
  readonly dashboard: DashboardPage;
  readonly cart: CartPage;
  readonly orderReview: OrderReviewPage;
  readonly orderHistory: OrdersHistoryPage;

  constructor(page: Page) {
    this.automationPractice = new AutomationPracticePage(page);
    this.login = new LoginPage(page);
    this.dashboard = new DashboardPage(page);
    this.cart = new CartPage(page);
    this.orderReview = new OrderReviewPage(page);
    this.orderHistory = new OrdersHistoryPage(page);
  }
}

interface PageFixtures {
  pages: PageFixture;
}

export const test = base.extend<PageFixtures>({
  pages: async ({ page }, use) => {
    await use(new PageFixture(page));
  }
});

export { expect } from '@playwright/test';
