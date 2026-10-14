// spec: specs/plan-2.md
// seed: tests/seed.spec.ts

import { test, expect } from '../../fixtures/fixtures';
import { env } from '../../utils/env';

test.describe('Cart', () => {
  test('Validate that Continue Shopping returns to the products page', async ({
    page,
    loginPage,
    inventoryPage,
    cartPage,
  }) => {
    // 1. Log in as the standard user
    await loginPage.goto();
    await loginPage.login(env.standardUser, env.password);

    // 2. Add Sauce Labs Backpack to the cart and open the cart
    await inventoryPage.addToCart('sauce-labs-backpack');
    await inventoryPage.openCart();

    // 3. Click Continue Shopping
    await cartPage.continueShopping();
    await expect(page).toHaveURL(/\/inventory\.html$/);
    await expect(inventoryPage.title).toHaveText('Products');
    await expect(inventoryPage.cartBadge).toHaveText('1');
  });
});
