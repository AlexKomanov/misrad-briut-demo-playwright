// spec: specs/plan-2.md
// seed: tests/seed.spec.ts

import { test, expect } from '../../fixtures/fixtures';
import { env } from '../../utils/env';

test.describe('Products', () => {
  test('Validate that products can be sorted by price from low to high', async ({ loginPage, inventoryPage }) => {
    // 1. Log in as the standard user
    await loginPage.goto();
    await loginPage.login(env.standardUser, env.password);

    // 2. Select Price (low to high)
    await inventoryPage.sortBy('lohi');
    await expect(inventoryPage.itemPrices).toHaveText(['$7.99', '$9.99', '$15.99', '$15.99', '$29.99', '$49.99']);
    await expect(inventoryPage.itemNames.first()).toHaveText('Sauce Labs Onesie');
    await expect(inventoryPage.itemNames.last()).toHaveText('Sauce Labs Fleece Jacket');
  });
});
