// spec: specs/plan-1.md
// seed: tests/seed.spec.ts

import { test, expect } from '../../fixtures/fixtures';
import { env } from '../../utils/env';

test.describe('Checkout', () => {
  test('Validate that a user can complete an order for a single product', async ({
    page,
    loginPage,
    inventoryPage,
    cartPage,
    checkoutInfoPage,
    checkoutOverviewPage,
    checkoutCompletePage,
  }) => {
    // 1. Log in as the standard user
    await loginPage.goto();
    await loginPage.login(env.standardUser, env.password);
    await expect(page).toHaveURL(/\/inventory\.html$/);
    await expect(inventoryPage.title).toHaveText('Products');

    // 2. Click Add to cart on the Sauce Labs Backpack product
    await inventoryPage.addToCart('sauce-labs-backpack');
    await expect(inventoryPage.removeButton('sauce-labs-backpack')).toHaveText('Remove');
    await expect(inventoryPage.cartBadge).toHaveText('1');

    // 3. Click the cart icon in the header
    await inventoryPage.openCart();
    await expect(page).toHaveURL(/\/cart\.html$/);
    await expect(cartPage.title).toHaveText('Your Cart');
    await expect(cartPage.itemName).toHaveText('Sauce Labs Backpack');
    await expect(cartPage.itemQuantity).toHaveText('1');
    await expect(cartPage.itemPrice).toHaveText('$29.99');

    // 4. Click Checkout
    await cartPage.checkout();
    await expect(page).toHaveURL(/\/checkout-step-one\.html$/);
    await expect(checkoutInfoPage.title).toHaveText('Checkout: Your Information');

    // 5. Fill First Name, Last Name and Zip/Postal Code, then click Continue
    await checkoutInfoPage.fill('John', 'Doe', '12345');
    await checkoutInfoPage.continue();
    await expect(page).toHaveURL(/\/checkout-step-two\.html$/);
    await expect(checkoutOverviewPage.title).toHaveText('Checkout: Overview');

    // 6. Click Finish
    await checkoutOverviewPage.finish();
    await expect(page).toHaveURL(/\/checkout-complete\.html$/);
    await expect(checkoutCompletePage.title).toHaveText('Checkout: Complete!');
    await expect(checkoutCompletePage.header).toHaveText('Thank you for your order!');
    await expect(checkoutCompletePage.text).toHaveText(
      'Your order has been dispatched, and will arrive just as fast as the pony can get there!'
    );
    await expect(inventoryPage.cartBadge).toBeHidden();
    await expect(checkoutCompletePage.backHomeButton).toBeVisible();
  });
});
