import { expect, type Locator, type Page } from '@playwright/test';
import { environment } from '../config/environment';

export class LoginPage {
  private readonly signInButton: Locator;
  private readonly username: Locator;
  private readonly password: Locator;
  private readonly products: Locator;
  private readonly loginError: Locator;

  constructor(private readonly page: Page) {
    this.signInButton = page.locator('#login');
    this.username = page.locator('#userEmail');
    this.password = page.locator('#userPassword');
    this.products = page.locator('.card-body');
    this.loginError = page.locator('[role="alert"], .toast-message, .ng-trigger-flyInOut');
  }

  async open(): Promise<void> {
    await this.page.goto(environment.baseUrl);
    await expect(this.signInButton).toBeVisible();
  }

  async login(email: string, password: string): Promise<void> {
    await this.open();
    await this.username.fill(email);
    await this.password.fill(password);
    await this.signInButton.click();
    await expect(this.products.first()).toBeVisible();
  }

  async loginWithDefaultCredentials(): Promise<void> {
    await this.login(environment.email, environment.password);
  }

  async submitCredentials(email: string, password: string): Promise<void> {
    await this.open();
    await this.username.fill(email);
    await this.password.fill(password);
    await this.signInButton.click();
  }

  async submitEmptyForm(): Promise<void> {
    await this.open();
    await this.signInButton.click();
  }

  async expectLoginFormVisible(): Promise<void> {
    await expect(this.signInButton).toBeVisible();
    await expect(this.username).toBeVisible();
    await expect(this.password).toBeVisible();
  }

  async expectAuthenticationRejected(): Promise<void> {
    await expect(this.loginError.first()).toBeVisible();
    await this.expectLoginFormVisible();
    await expect(this.products).toHaveCount(0);
  }

  async expectRequiredFieldValidation(): Promise<void> {
    await expect(this.username).toHaveClass(/is-invalid/);
    await expect(this.password).toHaveClass(/is-invalid/);
    await expect(this.signInButton).toBeVisible();
  }

  async expectInvalidEmailRejected(): Promise<void> {
    await expect(this.username).toHaveClass(/is-invalid/);
    await this.expectLoginFormVisible();
    await expect(this.products).toHaveCount(0);
  }

  async openAuthenticatedSession(token: string): Promise<void> {
    await this.page.addInitScript(authenticationToken => {
      window.localStorage.setItem('token', authenticationToken);
    }, token);
    await this.page.goto(environment.baseUrl);
    await expect(this.products.first()).toBeVisible();
  }
}
