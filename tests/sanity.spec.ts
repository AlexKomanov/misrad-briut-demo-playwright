import { test, expect } from '../fixtures/fixtures';

test('Validate that a standard user can log in', async ({ loginPage, inventoryPage }) => {
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await expect(inventoryPage.title).toHaveText('Products');
});

test('Validate that a locked user sees an error', async ({ loginPage }) => {
  await loginPage.goto();
  await loginPage.login('locked_out_user', 'secret_sauce');
  await expect(loginPage.error).toContainText('locked out');
});