// spec: specs/plan-2.md
// seed: tests/seed.spec.ts

import { test, expect } from '../../fixtures/fixtures';

test.describe('Login', () => {
  test('Validate that login requires a username', async ({ page, loginPage }) => {
    // 1. Open the login page, leave both fields empty and click Login
    await loginPage.goto();
    await loginPage.loginButton.click();
    await expect(loginPage.error).toHaveText('Epic sadface: Username is required');
    await expect(page).toHaveURL(/\/$/);
  });
});
