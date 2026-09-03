import { expect, type Locator, type Page } from '@playwright/test';

export class AutomationPracticePage {
  private readonly displayedText: Locator;
  private readonly hideButton: Locator;

  constructor(private readonly page: Page) {
    this.displayedText = page.locator('#displayed-text');
    this.hideButton = page.locator('#hide-textbox');
  }

  async open(): Promise<void> {
    await this.page.goto(
      'https://rahulshettyacademy.com/AutomationPractice/'
    );
  }

  async expectDisplayedTextVisible(): Promise<void> {
    await expect(this.displayedText).toBeVisible();
  }

  async expectDisplayedTextHidden(): Promise<void> {
    await expect(this.displayedText).toBeHidden();
  }

  async captureHideButton(): Promise<Buffer> {
    return this.hideButton.screenshot({
      animations: 'disabled'
    });
  }

  async hideDisplayedText(): Promise<void> {
    await this.hideButton.click();
  }
}
