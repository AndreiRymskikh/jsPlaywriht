import type { Page } from '@playwright/test';
import { AutomationPracticePage } from './AutomationPracticePage';
import { CartPage } from './CartPage';
import { DashboardPage } from './DashboardPage';
import { LoginPage } from './LoginPage';
import { OrderReviewPage } from './OrderReviewPage';
import { OrdersHistoryPage } from './OrdersHistoryPage';

export class POManager {
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
