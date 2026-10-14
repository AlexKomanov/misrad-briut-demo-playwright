// spec: specs/plan-2.md
// seed: tests/seed.spec.ts

import { test, expect } from '../../fixtures/fixtures';

test.describe('Login', () => {
  test('Validate that the login error can be dismissed', async ({ loginPage }) => {
    // 1. Open the login page, leave both fields empty and click Login
    await loginPage.goto();
    await loginPage.loginButton.click();
    await expect(loginPage.error).toBeVisible();

    // 2. Click the dismiss error button
    await loginPage.dismissError();
    await expect(loginPage.error).toBeHidden();
  });
});
