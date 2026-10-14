// spec: specs/plan-2.md
// seed: tests/seed.spec.ts

import { test, expect } from '../../fixtures/fixtures';
import { env } from '../../utils/env';

test.describe('Products', () => {
  test('Validate that a product can be added to the cart from its details page', async ({
    page,
    loginPage,
    inventoryPage,
    productDetailsPage,
  }) => {
    // 1. Log in as the standard user
    await loginPage.goto();
    await loginPage.login(env.standardUser, env.password);

    // 2. Click the Sauce Labs Backpack product name
    await inventoryPage.openProduct('Sauce Labs Backpack');
    await expect(page).toHaveURL(/\/inventory-item\.html\?id=4$/);
    await expect(productDetailsPage.name).toHaveText('Sauce Labs Backpack');
    await expect(productDetailsPage.price).toHaveText('$29.99');

    // 3. Click Add to cart
    await productDetailsPage.addToCart();
    await expect(productDetailsPage.removeButton).toHaveText('Remove');
    await expect(inventoryPage.cartBadge).toHaveText('1');

    // 4. Click Back to products
    await productDetailsPage.backToProducts();
    await expect(page).toHaveURL(/\/inventory\.html$/);
    await expect(inventoryPage.removeButton('sauce-labs-backpack')).toHaveText('Remove');
  });
});
