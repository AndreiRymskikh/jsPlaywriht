import { expect, type Locator, type Page } from '@playwright/test';

export class OrderReviewPage {
  private readonly checkout: Locator;
  private readonly countryField: Locator;
  private readonly countryOptions: Locator;
  private readonly submitButton: Locator;
  private readonly confirmationHeading: Locator;
  private readonly orderId: Locator;

  constructor(private readonly page: Page) {
    this.checkout = page.getByText('Checkout', { exact: true });
    this.countryField = page.locator("[placeholder*='Country']");
    this.countryOptions = page.locator('.ta-results button');
    this.submitButton = page.locator('.action__submit');
    this.confirmationHeading = page.locator('.hero-primary');
    this.orderId = page.locator('.em-spacer-1 .ng-star-inserted');
  }

  async checkoutAndSelectCountry(
    countryCode: string,
    countryName: string,
    email: string
  ): Promise<void> {
    await this.checkout.click();
    await this.countryField.fill('');
    await this.countryField.pressSequentially(countryCode, { delay: 100 });

    const escapedCountryName = countryName.replace(
      /[.*+?^\${}()|[\]\\]/g,
      '\\$&'
    );
    const matchingCountry = this.countryOptions.filter({
      hasText: new RegExp(`^\\s*${escapedCountryName}\\s*$`, 'i')
    });
    await expect(matchingCountry).toBeVisible();
    await matchingCountry.click();

    await expect(
      this.page.locator(".user__name input[type='text']").first()
    ).toHaveValue(email);
  }

  async beginCheckout(): Promise<void> {
    await this.checkout.click();
    await expect(this.countryField).toBeVisible();
  }

  async searchCountry(searchText: string): Promise<void> {
    await this.countryField.fill('');
    await this.countryField.pressSequentially(searchText, { delay: 100 });
  }

  async expectMultipleCountrySuggestions(): Promise<void> {
    await expect(this.countryOptions.first()).toBeVisible();
    expect(await this.countryOptions.count()).toBeGreaterThan(1);
  }

  async selectExactCountry(countryName: string): Promise<void> {
    const matchingCountry = this.countryOptions.filter({
      hasText: new RegExp(`^\\s*${countryName.replace(/[.*+?^\${}()|[\]\\]/g, '\\$&')}\\s*$`, 'i')
    });
    await expect(matchingCountry).toHaveCount(1);
    await matchingCountry.click();
  }

  async expectNoCountrySuggestions(): Promise<void> {
    await expect(this.countryOptions).toHaveCount(0);
  }

  async placeOrder(): Promise<string> {
    await this.submitButton.click();
    await expect(this.confirmationHeading).toContainText(
      'Thankyou for the order.'
    );

    const confirmationText = await this.orderId.textContent();
    const orderId = confirmationText?.match(/[a-f\d]{24}/i)?.[0];
    if (!orderId) {
      throw new Error('Order confirmation did not contain an order ID');
    }

    return orderId;
  }
}
