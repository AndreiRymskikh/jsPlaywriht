import { expect, type Locator, type Page } from '@playwright/test';
import { environment } from '../config/environment';

export class LoginPage {
  private readonly signInButton: Locator;
  private readonly username: Locator;
  private readonly password: Locator;
  private readonly products: Locator;

  constructor(private readonly page: Page) {
    this.signInButton = page.locator('#login');
    this.username = page.locator('#userEmail');
    this.password = page.locator('#userPassword');
    this.products = page.locator('.card-body');
  }

  async login(email: string, password: string): Promise<void> {
    await this.page.goto(environment.baseUrl);
    await this.username.fill(email);
    await this.password.fill(password);
    await this.signInButton.click();
    await expect(this.products.first()).toBeVisible();
  }

  async loginWithDefaultCredentials(): Promise<void> {
    await this.login(environment.email, environment.password);
  }

  async openAuthenticatedSession(token: string): Promise<void> {
    await this.page.addInitScript(authenticationToken => {
      window.localStorage.setItem('token', authenticationToken);
    }, token);
    await this.page.goto(environment.baseUrl);
    await expect(this.products.first()).toBeVisible();
  }
}
