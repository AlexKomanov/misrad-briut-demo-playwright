// spec: specs/plan-1.md
// seed: tests/seed.spec.ts

import { test, expect } from '../../fixtures/fixtures';
import { env } from '../../utils/env';

test.describe('Checkout', () => {
  test('Validate that the checkout form requires a last name', async ({
    page,
    loginPage,
    inventoryPage,
    cartPage,
    checkoutInfoPage,
  }) => {
    // 1. Log in as the standard user
    await loginPage.goto();
    await loginPage.login(env.standardUser, env.password);

    // 2. Click Add to cart on the Sauce Labs Backpack product and open the cart
    await inventoryPage.addToCart('sauce-labs-backpack');
    await inventoryPage.openCart();

    // 3. Click Checkout
    await cartPage.checkout();

    // 4. Fill only First Name and click Continue
    await checkoutInfoPage.firstName.fill('John');
    await checkoutInfoPage.continue();
    await expect(checkoutInfoPage.error).toHaveText('Error: Last Name is required');
    await expect(page).toHaveURL(/\/checkout-step-one\.html$/);
  });
});
