# Authenticated Order Workflow Test Plan

## Application overview

The application is an authenticated storefront at the configured `BASE_URL`.
Registered users can sign in, add products to a cart, complete checkout, receive
an order confirmation, and inspect the order in their order history.

This plan follows the existing Cucumber workflow in
`tests/cucumberTests/order/order-history.feature` and its Page Object
implementation. The configured happy-path data is:

- Product: `zara coat 3`
- Country search: `ind`
- Country selection: `India`
- Credentials: `USER_EMAIL` and `USER_PASSWORD` from the local environment

## Preconditions and test-data rules

- Use a dedicated test account with valid credentials.
- Start every scenario in a fresh browser context with no cookies or local
  storage inherited from another scenario.
- Start with an empty cart. If the application persists cart contents on the
  server, remove existing items during scenario setup.
- Treat every newly created order ID as scenario-local data; never reuse an
  order ID from another scenario.
- Do not place real orders against a production environment.
- Keep credentials and authenticated state out of source control and test
  artifacts.

## Scenario 1: Place an order and find it in order history

**Purpose:** Verify the critical authenticated purchasing journey represented
by the existing Cucumber scenario.

### Steps and expected outcomes

1. Navigate to the configured storefront URL in a fresh browser context.
   - The sign-in form is displayed.
2. Enter the configured user email and password, then submit the form.
   - Authentication succeeds.
   - The product dashboard is displayed with at least one product card.
3. Find the product named `zara coat 3` and select **Add To Cart**.
   - The product is added without an error.
4. Open the cart.
   - The cart page is displayed.
   - Exactly the intended product is visible in the cart.
5. Select **Checkout**.
   - The order review or payment page is displayed.
6. Clear the country field and type `ind`.
   - Country suggestions appear.
7. Select the suggestion whose complete visible text is `India`.
   - India is selected rather than another partial match.
   - The signed-in user's email is populated in the checkout form.
8. Submit the order.
   - A confirmation containing `Thankyou for the order.` is displayed.
   - The confirmation contains a non-empty 24-character hexadecimal order ID.
9. Save the order ID and open **My Orders**.
   - The order-history table is displayed.
10. Find the row containing the saved order ID and open its details.
    - Exactly one matching history row exists.
    - The order-details page displays the same order ID.

### Success criteria

- All expected outcomes occur without uncaught page or console errors that
  affect the workflow.
- The order ID shown in confirmation, history, and details is identical.

### Failure conditions

- Login does not reach the product dashboard.
- The configured product is absent or duplicated unexpectedly.
- The wrong country is selected.
- Confirmation has no valid order ID.
- The new order cannot be found or its details show another ID.

## Scenario 2: Reject invalid credentials

**Purpose:** Verify that an unauthenticated user cannot enter the purchasing
flow with invalid credentials.

### Steps and expected outcomes

1. Open the storefront in a fresh browser context.
2. Enter a syntactically valid but unregistered email and an incorrect
   password.
3. Submit the sign-in form.
   - An authentication error is displayed.
   - The user remains on the login page.
   - Product cards and authenticated navigation are not displayed.
4. Attempt to navigate directly to the cart or order-history route.
   - The application redirects to login or otherwise denies access.

### Success criteria

- No authenticated content or customer order data is exposed.

## Scenario 3: Validate required login fields

**Purpose:** Verify client-side or server-side validation at the authentication
boundary.

### Steps and expected outcomes

1. Open the storefront in a fresh browser context.
2. Submit the login form with both fields empty.
   - Required-field validation is visible for the email and password fields.
   - No authenticated request succeeds.
3. Enter an invalid email format and a non-empty password, then submit.
   - Email-format validation or a clear authentication error is displayed.
   - The product dashboard is not displayed.

### Success criteria

- Invalid input cannot initiate an authenticated shopping session.

## Scenario 4: Prevent checkout with an empty cart

**Purpose:** Verify the checkout boundary when no product has been selected.

### Steps and expected outcomes

1. Sign in with the configured valid credentials in a fresh state.
2. Open the cart without adding a product.
   - The cart is empty or displays an explicit empty-cart message.
3. Attempt to continue to checkout, if a checkout control is available.
   - Checkout is disabled, absent, or blocked with a clear message.
   - No order is created and no confirmation ID is produced.

### Success criteria

- An empty order cannot be submitted.

## Scenario 5: Handle a configured product that is unavailable

**Purpose:** Verify deterministic failure when requested test data does not
match the catalog.

### Steps and expected outcomes

1. Sign in with valid credentials.
2. Search the loaded product cards for a deliberately nonexistent product
   name.
   - No product card matches the name.
3. Attempt to add the nonexistent product through the test workflow.
   - The test stops before opening checkout.
   - The failure clearly identifies the missing product name.

### Success criteria

- The workflow does not silently select a different or partially matching
  product.

## Scenario 6: Require an exact country selection

**Purpose:** Verify that autocomplete results do not cause an unintended
shipping-country selection.

### Steps and expected outcomes

1. Sign in, add the configured product, and open checkout.
2. Enter a search string that returns multiple country suggestions.
   - Multiple suggestions are displayed.
3. Select the entry whose full visible text matches the intended country.
   - Only the exact intended country is selected.
4. Clear the field and enter a string that returns no country.
   - No valid selection is made.
   - Order submission is blocked or produces a clear validation message.

### Success criteria

- Partial matches never cause the wrong country to be submitted.

## Scenario 7: Preserve order identity across confirmation and history

**Purpose:** Detect stale, duplicated, or mismatched order data independently
of product presentation.

### Steps and expected outcomes

1. Complete a valid order and capture its confirmation order ID.
2. Open order history immediately after confirmation.
3. Filter or inspect history for the captured ID.
   - Exactly one row matches the complete ID.
4. Open that row.
   - The details view contains the complete captured ID.
   - The product information corresponds to the product just ordered.
5. Navigate back to history and inspect a different order, if present.
   - The different order does not display the newly captured ID.

### Success criteria

- Confirmation, history row, and details are consistently linked to one order.

## Scenario 8: Handle an order-history lookup with no matching ID

**Purpose:** Verify predictable behavior when a requested order is absent.

### Steps and expected outcomes

1. Sign in with valid credentials and open **My Orders**.
2. Search the displayed rows for a well-formed but nonexistent 24-character
   hexadecimal order ID.
   - No row matches the ID.
   - No unrelated order is opened.
3. If the application provides search feedback, verify that it clearly states
   that no matching order was found.

### Success criteria

- A missing ID cannot resolve to a partial or unrelated match.

## Scenario 9: Protect authenticated routes after logout or session loss

**Purpose:** Verify that authenticated order data is unavailable after the
session ends.

### Steps and expected outcomes

1. Sign in and confirm that the product dashboard is visible.
2. Log out, or clear the authentication token in the browser context.
3. Navigate directly to the cart and order-history routes.
   - The application redirects to login or denies access.
   - Previous order information is not displayed.
4. Use browser back navigation.
   - Protected content is still unavailable.

### Success criteria

- Ending the session prevents access to all authenticated purchasing pages.

## Automation guidance

- Implement each scenario as an independent Playwright test using a new browser
  context.
- Reuse `fixtures/page.fixture.ts` and the existing Page Objects; extend Page
  Objects rather than placing selectors directly in generated tests.
- Use Playwright web-first assertions instead of fixed sleeps.
- Prefer accessible role, label, and text locators for new coverage. Preserve
  exact matching where choosing the wrong product, country, or order would be
  harmful.
- The happy-path scenario creates persistent external data. Give generated
  orders unique traceable data where the application permits it, and use a
  dedicated account with an agreed cleanup policy.
- Capture traces and screenshots only according to the repository's Playwright
  configuration, especially on failure or retry.
