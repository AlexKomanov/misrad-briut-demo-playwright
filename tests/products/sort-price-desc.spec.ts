// spec: specs/plan-2.md
// seed: tests/seed.spec.ts

import { test, expect } from '../../fixtures/fixtures';
import { env } from '../../utils/env';

test.describe('Products', () => {
  test('Validate that products can be sorted by price from high to low', async ({ loginPage, inventoryPage }) => {
    // 1. Log in as the standard user
    await loginPage.goto();
    await loginPage.login(env.standardUser, env.password);

    // 2. Select Price (high to low)
    await inventoryPage.sortBy('hilo');
    await expect(inventoryPage.itemPrices).toHaveText(['$49.99', '$29.99', '$15.99', '$15.99', '$9.99', '$7.99']);
    await expect(inventoryPage.itemNames.first()).toHaveText('Sauce Labs Fleece Jacket');
    await expect(inventoryPage.itemNames.last()).toHaveText('Sauce Labs Onesie');
  });
});
