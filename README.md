# jsPlaywriht

A TypeScript test-automation project demonstrating browser, API-assisted,
BDD, network-mocking, and visual-regression testing with Playwright and
Cucumber.

The suite exercises Rahul Shetty Academy demonstration applications. It uses
the Page Object pattern to keep selectors and browser interactions out of test
cases, typed Playwright fixtures for shared setup, and Cucumber scenarios for
business-readable workflows.

## What the project covers

- End-to-end product ordering and order-history verification
- API authentication and order creation
- API-assisted UI testing
- Browser network interception and response mocking
- Cucumber/Gherkin scenarios
- Element-level visual regression
- Shared Page Objects, fixtures, configuration, and typed test data

## Requirements

- Node.js 20 or 22 LTS
- npm
- Internet access to the external demonstration applications

Node.js 23 may work, but the installed Cucumber version reports that it has not
been officially tested against that release.

## Installation

From the repository root, install the locked dependencies:

```bash
npm ci
```

Install the Chromium browser used by Playwright:

```bash
npx playwright install chromium
```

## Environment configuration

Create a local environment file from the supplied template:

```bash
cp .env.example .env
```

Set the test-account credentials in `.env`:

```dotenv
BASE_URL=https://rahulshettyacademy.com/client/
API_BASE_URL=https://rahulshettyacademy.com
USER_EMAIL=your-test-account-email
USER_PASSWORD=your-test-account-password
```

The `.env` file is ignored by Git and must not be committed. Use a dedicated
test account because order scenarios create data in the external application.

## Running tests

Run the TypeScript compiler without producing build files:

```bash
npm run typecheck
```

Run all Playwright tests:

```bash
npm test
```

Run only the API-integrated Playwright tests:

```bash
npm run test:api
```

Run all Cucumber scenarios:

```bash
npm run test:cucumber
```

Run TypeScript validation, Playwright, and Cucumber:

```bash
npm run test:all
```

### Run tests with a visible browser

Playwright:

```bash
npm test -- --headed
```

Cucumber:

```bash
HEADLESS=false npm run test:cucumber
```

### Run a specific Playwright test

```bash
npm test -- tests/apiIntegrated/order-api.spec.ts
```

Run the API-integrated folder:

```bash
npm test -- tests/apiIntegrated
```

### Run Cucumber scenarios by tag

Order workflow:

```bash
npm run test:cucumber -- --tags '@Order'
```

Visual regression:

```bash
npm run test:cucumber -- --tags '@Visual'
```

All web scenarios:

```bash
npm run test:cucumber -- --tags '@Web'
```

### Debug Playwright tests

Open Playwright's interactive test runner:

```bash
npm test -- --ui
```

Run with the Playwright Inspector:

```bash
npm test -- --debug
```

Open the latest HTML report:

```bash
npx playwright show-report
```

## Project structure

```text
.
├── config/
│   └── environment.ts
├── fixtures/
│   ├── api.fixture.ts
│   ├── order.fixture.ts
│   └── page.fixture.ts
├── pages/
│   ├── AutomationPracticePage.ts
│   ├── CartPage.ts
│   ├── DashboardPage.ts
│   ├── LoginPage.ts
│   ├── OrderReviewPage.ts
│   └── OrdersHistoryPage.ts
├── stepDefinitions/
│   ├── order-history.steps.ts
│   └── visual-regression.steps.ts
├── testData/
│   └── order.data.ts
├── tests/
│   ├── apiIntegrated/
│   │   ├── order-api.spec.ts
│   │   └── order-history-response-mocking.spec.ts
│   └── cucumberTests/
│       ├── order/
│       ├── testSetup/
│       └── visual/
├── utils/
│   └── ApiUtils.ts
├── cucumber.js
├── playwright.config.ts
└── tsconfig.json
```

## Architecture

### Page Objects

Files in `pages/` own selectors, browser interactions, and page-level
assertions. Tests and Cucumber steps access them through the `pages` fixture
rather than defining selectors directly.

### Fixtures

- `page.fixture.ts` constructs all Page Objects.
- `api.fixture.ts` creates and disposes the API request context and supplies
  authenticated API helpers.
- `order.fixture.ts` supplies typed order test data to Playwright tests.

### Cucumber

Gherkin feature files live under `tests/cucumberTests/`. Executable step
definitions live in `stepDefinitions/`. The files in
`tests/cucumberTests/testSetup/` create and clean up the browser, context,
page, and Page Objects for every scenario.

### Visual regression

The visual scenario compares the rendered hide button with the platform
baseline in `tests/cucumberTests/visual/snapshots/`. A visual difference or
missing baseline fails the scenario and attaches the actual screenshot.
Visual baselines are platform-specific and should be reviewed before being
committed.

## Troubleshooting

If Playwright reports that the browser executable is missing:

```bash
npx playwright install chromium
```

If authenticated tests fail immediately, confirm that `.env` exists and that
`USER_EMAIL` and `USER_PASSWORD` contain valid test-account credentials.

If a visual test fails after an intentional UI change, review the attached
actual screenshot and replace the appropriate approved baseline only after
confirming the change is expected.
