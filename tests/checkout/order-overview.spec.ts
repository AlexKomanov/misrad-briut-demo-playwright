// spec: specs/plan-1.md
// seed: tests/seed.spec.ts

import { test, expect } from '../../fixtures/fixtures';
import { env } from '../../utils/env';

test.describe('Checkout', () => {
  test('Validate that the order overview shows the selected product and price totals', async ({
    page,
    loginPage,
    inventoryPage,
    cartPage,
    checkoutInfoPage,
    checkoutOverviewPage,
  }) => {
    // 1. Log in as the standard user
    await loginPage.goto();
    await loginPage.login(env.standardUser, env.password);

    // 2. Click Add to cart on the Sauce Labs Backpack product and open the cart
    await inventoryPage.addToCart('sauce-labs-backpack');
    await inventoryPage.openCart();

    // 3. Click Checkout
    await cartPage.checkout();

    // 4. Fill First Name, Last Name and Zip/Postal Code, then click Continue
    await checkoutInfoPage.fill('John', 'Doe', '12345');
    await checkoutInfoPage.continue();
    await expect(page).toHaveURL(/\/checkout-step-two\.html$/);
    await expect(checkoutOverviewPage.title).toHaveText('Checkout: Overview');
    await expect(checkoutOverviewPage.itemName).toHaveText('Sauce Labs Backpack');
    await expect(checkoutOverviewPage.itemQuantity).toHaveText('1');
    await expect(checkoutOverviewPage.itemPrice).toHaveText('$29.99');
    await expect(checkoutOverviewPage.paymentInfo).toHaveText('SauceCard #31337');
    await expect(checkoutOverviewPage.shippingInfo).toHaveText('Free Pony Express Delivery!');
    await expect(checkoutOverviewPage.itemTotal).toHaveText('Item total: $29.99');
    await expect(checkoutOverviewPage.tax).toHaveText('Tax: $2.40');
    await expect(checkoutOverviewPage.total).toHaveText('Total: $32.39');
    await expect(checkoutOverviewPage.cancelButton).toBeVisible();
    await expect(checkoutOverviewPage.finishButton).toBeVisible();
  });
});
