// spec: specs/plan-2.md
// seed: tests/seed.spec.ts

import { test, expect } from '../../fixtures/fixtures';
import { env } from '../../utils/env';

test.describe('Cart', () => {
  test('Validate that an item can be removed from the cart', async ({ loginPage, inventoryPage, cartPage }) => {
    // 1. Log in as the standard user
    await loginPage.goto();
    await loginPage.login(env.standardUser, env.password);

    // 2. Add Sauce Labs Backpack and Sauce Labs Bike Light to the cart
    await inventoryPage.addToCart('sauce-labs-backpack');
    await inventoryPage.addToCart('sauce-labs-bike-light');
    await expect(inventoryPage.cartBadge).toHaveText('2');

    // 3. Open the cart
    await inventoryPage.openCart();
    await expect(cartPage.itemName).toHaveText(['Sauce Labs Backpack', 'Sauce Labs Bike Light']);

    // 4. Click Remove on Sauce Labs Backpack
    await cartPage.removeItem('sauce-labs-backpack');
    await expect(cartPage.itemName).toHaveText(['Sauce Labs Bike Light']);
    await expect(inventoryPage.cartBadge).toHaveText('1');
  });
});
