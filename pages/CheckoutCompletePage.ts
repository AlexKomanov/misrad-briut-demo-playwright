import { type Page, type Locator } from '@playwright/test';

export class CheckoutCompletePage {
  readonly title: Locator;
  readonly header: Locator;
  readonly text: Locator;
  readonly backHomeButton: Locator;

  constructor(private readonly page: Page) {
    this.title = page.getByTestId('title');
    this.header = page.getByTestId('complete-header');
    this.text = page.getByTestId('complete-text');
    this.backHomeButton = page.getByTestId('back-to-products');
  }
}
