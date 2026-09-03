import { expect, type Locator, type Page } from '@playwright/test';
import { environment } from '../utils/environment';

export class LoginPage {
  private readonly signInButton: Locator;
  private readonly username: Locator;
  private readonly password: Locator;

  constructor(private readonly page: Page) {
    this.signInButton = page.locator('#login');
    this.username = page.locator('#userEmail');
    this.password = page.locator('#userPassword');
  }

  async login(email: string, password: string): Promise<void> {
    await this.page.goto(environment.baseUrl);
    await this.username.fill(email);
    await this.password.fill(password);
    await this.signInButton.click();
    await expect(this.page.locator('.card-body').first()).toBeVisible();
  }

  async loginWithDefaultCredentials(): Promise<void> {
    await this.login(environment.email, environment.password);
  }
}
