// spec: specs/plan-2.md
// seed: tests/seed.spec.ts

import { test, expect } from '../../fixtures/fixtures';
import { env } from '../../utils/env';

test.describe('Products', () => {
  test('Validate that products can be sorted by name from Z to A', async ({ loginPage, inventoryPage }) => {
    // 1. Log in as the standard user
    await loginPage.goto();
    await loginPage.login(env.standardUser, env.password);
    await expect(inventoryPage.activeSortOption).toHaveText('Name (A to Z)');

    // 2. Select Name (Z to A)
    await inventoryPage.sortBy('za');
    await expect(inventoryPage.activeSortOption).toHaveText('Name (Z to A)');
    await expect(inventoryPage.itemNames).toHaveText([
      'Test.allTheThings() T-Shirt (Red)',
      'Sauce Labs Onesie',
      'Sauce Labs Fleece Jacket',
      'Sauce Labs Bolt T-Shirt',
      'Sauce Labs Bike Light',
      'Sauce Labs Backpack',
    ]);
  });
});
