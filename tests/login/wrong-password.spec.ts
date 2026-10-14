// spec: specs/plan-2.md
// seed: tests/seed.spec.ts

import { test, expect } from '../../fixtures/fixtures';
import { env } from '../../utils/env';

test.describe('Login', () => {
  test('Validate that a wrong password shows an error', async ({ page, loginPage }) => {
    // 1. Log in with the standard user and a wrong password
    await loginPage.goto();
    await loginPage.login(env.standardUser, 'wrong_password');
    await expect(loginPage.error).toHaveText(
      'Epic sadface: Username and password do not match any user in this service'
    );
    await expect(page).toHaveURL(/\/$/);
  });
});
