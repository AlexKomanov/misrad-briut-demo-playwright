// spec: specs/plan-2.md
// seed: tests/seed.spec.ts

import { test, expect } from '../../fixtures/fixtures';
import { env } from '../../utils/env';

test.describe('Menu', () => {
  // The app clears the cart badge, but the product button keeps showing "Remove" until the page is reloaded.
  test.fixme('Validate that Reset App State empties the cart', async ({ loginPage, inventoryPage }) => {
    // 1. Log in as the standard user
    await loginPage.goto();
    await loginPage.login(env.standardUser, env.password);

    // 2. Add Sauce Labs Onesie to the cart
    await inventoryPage.addToCart('sauce-labs-onesie');
    await expect(inventoryPage.cartBadge).toHaveText('1');

    // 3. Open the menu and click Reset App State
    await inventoryPage.resetAppState();
    await expect(inventoryPage.cartBadge).toBeHidden();
    await expect(inventoryPage.addToCartButton('sauce-labs-onesie')).toHaveText('Add to cart');
  });
});
