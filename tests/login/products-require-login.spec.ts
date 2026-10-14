// spec: specs/plan-2.md
// seed: tests/seed.spec.ts

import { test, expect } from '../../fixtures/fixtures';

test.describe('Login', () => {
  test('Validate that the products page requires login', async ({ page, loginPage }) => {
    // 1. Without logging in, open /inventory.html directly
    await page.goto('/inventory.html');
    await expect(page).toHaveURL(/\/$/);
    await expect(loginPage.error).toHaveText(
      "Epic sadface: You can only access '/inventory.html' when you are logged in."
    );
  });
});
