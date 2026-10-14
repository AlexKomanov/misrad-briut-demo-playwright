// spec: specs/plan-2.md
// seed: tests/seed.spec.ts

import { test, expect } from '../../fixtures/fixtures';
import { env } from '../../utils/env';

test.describe('Menu', () => {
  test('Validate that a user can log out', async ({ page, loginPage, inventoryPage }) => {
    // 1. Log in as the standard user
    await loginPage.goto();
    await loginPage.login(env.standardUser, env.password);

    // 2. Open the menu and click Logout
    await inventoryPage.logout();
    await expect(page).toHaveURL(/\/$/);
    await expect(loginPage.loginButton).toBeVisible();

    // 3. Open /cart.html directly
    await page.goto('/cart.html');
    await expect(loginPage.error).toHaveText(
      "Epic sadface: You can only access '/cart.html' when you are logged in."
    );
  });
});
