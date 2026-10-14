// spec: specs/plan-2.md
// seed: tests/seed.spec.ts

import { test, expect } from '../../fixtures/fixtures';
import { env } from '../../utils/env';

test.describe('Login', () => {
  test('Validate that login requires a password', async ({ loginPage }) => {
    // 1. Open the login page, fill only Username and click Login
    await loginPage.goto();
    await loginPage.username.fill(env.standardUser);
    await loginPage.loginButton.click();
    await expect(loginPage.error).toHaveText('Epic sadface: Password is required');
  });
});
