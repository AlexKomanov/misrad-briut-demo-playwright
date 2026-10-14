import { type Page, type Locator } from '@playwright/test';

export class InventoryPage {
  readonly title: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;

  constructor(private readonly page: Page) {
    this.title = page.getByTestId('title');
    this.cartBadge = page.getByTestId('shopping-cart-badge');
    this.cartLink = page.getByTestId('shopping-cart-link');
  }

  removeButton(productId: string): Locator {
    return this.page.getByTestId(`remove-${productId}`);
  }

  async addToCart(productId: string) {
    await this.page.getByTestId(`add-to-cart-${productId}`).click();
  }

  async openCart() {
    await this.cartLink.click();
  }
}
