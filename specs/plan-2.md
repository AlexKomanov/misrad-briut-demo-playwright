# Login, Products, Cart and Menu Test Plan

## Application Overview

Swag Labs (https://www.saucedemo.com) is a demo web store. This plan covers the areas outside the checkout flow (see `specs/plan-1.md`): login validation, sorting and product details on the Products page, managing items in the cart, and the side menu (logout and reset app state).

Pages covered:

| Page | URL | Page title |
| --- | --- | --- |
| Login | `/` | — |
| Products | `/inventory.html` | Products |
| Product details | `/inventory-item.html?id=<n>` | — |
| Cart | `/cart.html` | Your Cart |

## Assumptions

- Every scenario starts from a fresh browser state (not logged in, empty cart).
- The seed only opens the login page; scenarios that need a session log in as `standard_user` / `secret_sauce`.
- Scenarios are independent and can run in any order or in parallel.
- Catalog observed during exploration (default order, Name A to Z):

| Product | Price | Details id |
| --- | --- | --- |
| Sauce Labs Backpack | $29.99 | 4 |
| Sauce Labs Bike Light | $9.99 | 0 |
| Sauce Labs Bolt T-Shirt | $15.99 | 1 |
| Sauce Labs Fleece Jacket | $49.99 | 5 |
| Sauce Labs Onesie | $7.99 | 2 |
| Test.allTheThings() T-Shirt (Red) | $15.99 | 3 |

## Test Scenarios

### 2. Login

**Seed:** `tests/seed.spec.ts`

#### 2.1. Validate that login requires a username

**File:** `tests/login/username-required.spec.ts`

**Steps:**

1. Open the login page, leave both fields empty and click `Login`.
   - expect: the error `Epic sadface: Username is required` is displayed.
   - expect: the URL is still `/`.

#### 2.2. Validate that login requires a password

**File:** `tests/login/password-required.spec.ts`

**Steps:**

1. Open the login page, fill only `Username` with `standard_user` and click `Login`.
   - expect: the error `Epic sadface: Password is required` is displayed.

#### 2.3. Validate that a wrong password shows an error

**File:** `tests/login/wrong-password.spec.ts`

**Steps:**

1. Open the login page, log in with `standard_user` and the password `wrong_password`.
   - expect: the error `Epic sadface: Username and password do not match any user in this service` is displayed.
   - expect: the URL is still `/`.

#### 2.4. Validate that the login error can be dismissed

**File:** `tests/login/dismiss-error.spec.ts`

**Steps:**

1. Open the login page, leave both fields empty and click `Login`.
   - expect: the error message is visible.
2. Click the `X` (dismiss error) button.
   - expect: the error message is no longer shown.

#### 2.5. Validate that the products page requires login

**File:** `tests/login/products-require-login.spec.ts`

**Steps:**

1. Without logging in, open `/inventory.html` directly.
   - expect: the user is redirected to the login page (`/`).
   - expect: the error `Epic sadface: You can only access '/inventory.html' when you are logged in.` is displayed.

### 3. Products

**Seed:** `tests/seed.spec.ts`

#### 3.1. Validate that products can be sorted by name from Z to A

**File:** `tests/products/sort-name-desc.spec.ts`

**Steps:**

1. Log in with `standard_user` / `secret_sauce`.
   - expect: the active sort option is `Name (A to Z)`.
2. Select `Name (Z to A)` in the sort dropdown.
   - expect: the active sort option is `Name (Z to A)`.
   - expect: product names are listed in reverse alphabetical order, starting with `Test.allTheThings() T-Shirt (Red)` and ending with `Sauce Labs Backpack`.

#### 3.2. Validate that products can be sorted by price from low to high

**File:** `tests/products/sort-price-asc.spec.ts`

**Steps:**

1. Log in with `standard_user` / `secret_sauce`.
2. Select `Price (low to high)` in the sort dropdown.
   - expect: prices are listed as `$7.99, $9.99, $15.99, $15.99, $29.99, $49.99`.
   - expect: the first product is `Sauce Labs Onesie` and the last is `Sauce Labs Fleece Jacket`.

#### 3.3. Validate that products can be sorted by price from high to low

**File:** `tests/products/sort-price-desc.spec.ts`

**Steps:**

1. Log in with `standard_user` / `secret_sauce`.
2. Select `Price (high to low)` in the sort dropdown.
   - expect: prices are listed as `$49.99, $29.99, $15.99, $15.99, $9.99, $7.99`.
   - expect: the first product is `Sauce Labs Fleece Jacket` and the last is `Sauce Labs Onesie`.

#### 3.4. Validate that a product can be added to the cart from its details page

**File:** `tests/products/add-from-details.spec.ts`

**Steps:**

1. Log in with `standard_user` / `secret_sauce`.
2. Click the `Sauce Labs Backpack` product name.
   - expect: the URL is `/inventory-item.html?id=4`.
   - expect: the details page shows the name `Sauce Labs Backpack` and the price `$29.99`.
3. Click `Add to cart`.
   - expect: the button changes to `Remove` and the cart badge shows `1`.
4. Click `Back to products`.
   - expect: the URL is `/inventory.html`.
   - expect: the `Sauce Labs Backpack` button on the list shows `Remove`.

### 4. Cart

**Seed:** `tests/seed.spec.ts`

#### 4.1. Validate that an item can be removed from the cart

**File:** `tests/cart/remove-item.spec.ts`

**Steps:**

1. Log in with `standard_user` / `secret_sauce`.
2. Add `Sauce Labs Backpack` and `Sauce Labs Bike Light` to the cart.
   - expect: the cart badge shows `2`.
3. Open the cart.
   - expect: the cart lists both products.
4. Click `Remove` on `Sauce Labs Backpack`.
   - expect: only `Sauce Labs Bike Light` is listed.
   - expect: the cart badge shows `1`.

#### 4.2. Validate that Continue Shopping returns to the products page

**File:** `tests/cart/continue-shopping.spec.ts`

**Steps:**

1. Log in with `standard_user` / `secret_sauce`.
2. Add `Sauce Labs Backpack` to the cart and open the cart.
3. Click `Continue Shopping`.
   - expect: the URL is `/inventory.html` and the page title is `Products`.
   - expect: the cart badge still shows `1`.

### 5. Menu

**Seed:** `tests/seed.spec.ts`

#### 5.1. Validate that a user can log out

**File:** `tests/menu/logout.spec.ts`

**Steps:**

1. Log in with `standard_user` / `secret_sauce`.
2. Open the menu and click `Logout`.
   - expect: the URL is `/` and the `Login` button is visible.
3. Open `/cart.html` directly.
   - expect: the error `Epic sadface: You can only access '/cart.html' when you are logged in.` is displayed.

#### 5.2. Validate that Reset App State empties the cart

**File:** `tests/menu/reset-app-state.spec.ts`

**Steps:**

1. Log in with `standard_user` / `secret_sauce`.
2. Add `Sauce Labs Onesie` to the cart.
   - expect: the cart badge shows `1`.
3. Open the menu and click `Reset App State`.
   - expect: the cart badge is no longer shown.
   - expect: the `Sauce Labs Onesie` button shows `Add to cart` again.

**Known issue:** during exploration the badge cleared, but the product button kept showing `Remove` until the page was reloaded. This scenario is expected to fail until the app is fixed.

## Notes for Test Generation

- Locators observed during exploration (all `data-test`): `username`, `password`, `login-button`, `error`, `error-button`, `product-sort-container`, `active-option`, `inventory-item-name`, `inventory-item-price`, `item-<id>-title-link`, `add-to-cart`, `remove`, `back-to-products`, `remove-<product>`, `continue-shopping`, `logout-sidebar-link`, `reset-sidebar-link`. The menu button is `#react-burger-menu-btn` (its `data-test` is on the inner image).
- Sort option values: `az`, `za`, `lohi`, `hilo`.
