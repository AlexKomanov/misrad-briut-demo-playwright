# Checkout Flow Test Plan

## Application Overview

Swag Labs (https://www.saucedemo.com) is a demo web store. This plan covers the checkout flow: adding a product to the cart, filling the checkout information form, reviewing the order overview and finishing the order. It includes negative scenarios for the required fields of the checkout form.

Pages in the flow:

| Step | URL | Page title |
| --- | --- | --- |
| Login | `/` | — |
| Products | `/inventory.html` | Products |
| Cart | `/cart.html` | Your Cart |
| Checkout form | `/checkout-step-one.html` | Checkout: Your Information |
| Order overview | `/checkout-step-two.html` | Checkout: Overview |
| Confirmation | `/checkout-complete.html` | Checkout: Complete! |

## Assumptions

- Every scenario starts from a fresh browser state (not logged in, empty cart).
- The seed only opens the login page, so every scenario starts by logging in as `standard_user` / `secret_sauce`.
- Scenarios are independent and can run in any order or in parallel.
- Test product: **Sauce Labs Backpack**, price `$29.99`.
- Test customer data: First Name `John`, Last Name `Doe`, Zip/Postal Code `12345`.

## Test Scenarios

### 1. Checkout

**Seed:** `tests/seed.spec.ts`

#### 1.1. Validate that a user can complete an order for a single product

**File:** `tests/checkout/complete-order.spec.ts`

**Steps:**

1. Log in with `standard_user` / `secret_sauce`.
   - expect: the URL is `/inventory.html` and the page title is `Products`.
2. Click `Add to cart` on the `Sauce Labs Backpack` product.
   - expect: the product button changes to `Remove`.
   - expect: the cart badge shows `1`.
3. Click the cart icon in the header.
   - expect: the URL is `/cart.html` and the page title is `Your Cart`.
   - expect: the cart lists `Sauce Labs Backpack` with quantity `1` and price `$29.99`.
4. Click `Checkout`.
   - expect: the URL is `/checkout-step-one.html` and the page title is `Checkout: Your Information`.
5. Fill `First Name` with `John`, `Last Name` with `Doe` and `Zip/Postal Code` with `12345`, then click `Continue`.
   - expect: the URL is `/checkout-step-two.html` and the page title is `Checkout: Overview`.
6. Click `Finish`.
   - expect: the URL is `/checkout-complete.html` and the page title is `Checkout: Complete!`.
   - expect: the heading `Thank you for your order!` is visible.
   - expect: the text `Your order has been dispatched, and will arrive just as fast as the pony can get there!` is visible.
   - expect: the cart badge is no longer shown (the cart is empty).
   - expect: the `Back Home` button is visible.

#### 1.2. Validate that the order overview shows the selected product and price totals

**File:** `tests/checkout/order-overview.spec.ts`

**Steps:**

1. Log in with `standard_user` / `secret_sauce`.
2. Click `Add to cart` on the `Sauce Labs Backpack` product and open the cart.
3. Click `Checkout`.
4. Fill `First Name` with `John`, `Last Name` with `Doe` and `Zip/Postal Code` with `12345`, then click `Continue`.
   - expect: the URL is `/checkout-step-two.html` and the page title is `Checkout: Overview`.
   - expect: the overview lists `Sauce Labs Backpack` with quantity `1` and price `$29.99`.
   - expect: the payment information is `SauceCard #31337`.
   - expect: the shipping information is `Free Pony Express Delivery!`.
   - expect: the summary shows `Item total: $29.99`, `Tax: $2.40` and `Total: $32.39`.
   - expect: the `Cancel` and `Finish` buttons are visible.

#### 1.3. Validate that the checkout form requires a first name

**File:** `tests/checkout/first-name-required.spec.ts`

**Steps:**

1. Log in with `standard_user` / `secret_sauce`.
2. Click `Add to cart` on the `Sauce Labs Backpack` product and open the cart.
3. Click `Checkout`.
   - expect: the page title is `Checkout: Your Information` and all three fields are empty.
4. Leave all fields empty and click `Continue`.
   - expect: the error message `Error: First Name is required` is displayed.
   - expect: the URL is still `/checkout-step-one.html` (the user is not moved to the overview).

#### 1.4. Validate that the checkout form requires a last name

**File:** `tests/checkout/last-name-required.spec.ts`

**Steps:**

1. Log in with `standard_user` / `secret_sauce`.
2. Click `Add to cart` on the `Sauce Labs Backpack` product and open the cart.
3. Click `Checkout`.
4. Fill only `First Name` with `John`, leave `Last Name` and `Zip/Postal Code` empty, and click `Continue`.
   - expect: the error message `Error: Last Name is required` is displayed.
   - expect: the URL is still `/checkout-step-one.html`.

#### 1.5. Validate that the checkout form requires a postal code

**File:** `tests/checkout/postal-code-required.spec.ts`

**Steps:**

1. Log in with `standard_user` / `secret_sauce`.
2. Click `Add to cart` on the `Sauce Labs Backpack` product and open the cart.
3. Click `Checkout`.
4. Fill `First Name` with `John` and `Last Name` with `Doe`, leave `Zip/Postal Code` empty, and click `Continue`.
   - expect: the error message `Error: Postal Code is required` is displayed.
   - expect: the URL is still `/checkout-step-one.html`.

## Notes for Test Generation

- Import `test` and `expect` from `../../fixtures/fixtures` (specs under `tests/checkout/`) and use the page-object fixtures; `loginPage` and `inventoryPage` already exist, while cart, checkout form, overview and confirmation pages have no page objects yet.
- Locators observed during exploration: `[data-test="add-to-cart-sauce-labs-backpack"]`, `[data-test="shopping-cart-link"]`, `[data-test="checkout"]`, `[data-test="firstName"]`, `[data-test="lastName"]`, `[data-test="postalCode"]`, `[data-test="continue"]`, `[data-test="finish"]`, `[data-test="error"]`.
- The form validates one field at a time, in order: First Name, then Last Name, then Postal Code.
