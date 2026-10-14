import { type Page, type Locator } from '@playwright/test';

export class CartPage {
  readonly title: Locator;
  readonly itemName: Locator;
  readonly itemQuantity: Locator;
  readonly itemPrice: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;

  constructor(private readonly page: Page) {
    this.title = page.getByTestId('title');
    this.itemName = page.getByTestId('inventory-item-name');
    this.itemQuantity = page.getByTestId('item-quantity');
    this.itemPrice = page.getByTestId('inventory-item-price');
    this.checkoutButton = page.getByTestId('checkout');
    this.continueShoppingButton = page.getByTestId('continue-shopping');
  }

  async removeItem(productId: string) {
    await this.page.getByTestId(`remove-${productId}`).click();
  }

  async continueShopping() {
    await this.continueShoppingButton.click();
  }

  async checkout() {
    await this.checkoutButton.click();
  }
}
