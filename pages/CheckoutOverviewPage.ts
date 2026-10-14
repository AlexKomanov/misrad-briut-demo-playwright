import { type Page, type Locator } from '@playwright/test';

export class CheckoutOverviewPage {
  readonly title: Locator;
  readonly itemName: Locator;
  readonly itemQuantity: Locator;
  readonly itemPrice: Locator;
  readonly paymentInfo: Locator;
  readonly shippingInfo: Locator;
  readonly itemTotal: Locator;
  readonly tax: Locator;
  readonly total: Locator;
  readonly cancelButton: Locator;
  readonly finishButton: Locator;

  constructor(private readonly page: Page) {
    this.title = page.getByTestId('title');
    this.itemName = page.getByTestId('inventory-item-name');
    this.itemQuantity = page.getByTestId('item-quantity');
    this.itemPrice = page.getByTestId('inventory-item-price');
    this.paymentInfo = page.getByTestId('payment-info-value');
    this.shippingInfo = page.getByTestId('shipping-info-value');
    this.itemTotal = page.getByTestId('subtotal-label');
    this.tax = page.getByTestId('tax-label');
    this.total = page.getByTestId('total-label');
    this.cancelButton = page.getByTestId('cancel');
    this.finishButton = page.getByTestId('finish');
  }

  async finish() {
    await this.finishButton.click();
  }
}
