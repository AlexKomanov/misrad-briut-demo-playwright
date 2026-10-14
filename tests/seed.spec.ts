import { test, expect } from '../fixtures/fixtures';

test.describe('Test group', () => {
  test('seed', async ({ loginPage }) => {
    await loginPage.goto();
  });
});