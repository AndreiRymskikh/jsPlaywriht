# jsPlaywriht

A TypeScript end-to-end test project using Playwright and Cucumber.

## Setup

1. Install dependencies:

   ```bash
   npm ci
   npx playwright install chromium
   ```

2. Copy the environment template and add test-account credentials:

   ```bash
   cp .env.example .env
   ```

   Never commit `.env` or generated authentication state.

## Commands

| Command | Purpose |
| --- | --- |
| `npm run typecheck` | Check TypeScript without emitting JavaScript |
| `npm test` | Run all Playwright tests |
| `npm run test:web` | Run tests tagged `@Web` |
| `npm run test:api` | Run tests tagged `@API` |
| `npm run test:cucumber` | Run Cucumber scenarios |
| `npm run test:all` | Type-check and run both test suites |

## Project layout

- `pages/`: typed Page Objects.
- `config/`: environment-variable loading and runtime configuration.
- `fixtures/`: shared page, API, and test-data fixtures.
- `tests/`: Playwright UI, API, network, and visual tests.
- `cucumberTests/order/` and `cucumberTests/visual/`: domain-organized BDD feature files.
- `cucumberTests/support/`: shared Cucumber hooks and World.
- `stepDefinitions/`: executable Cucumber step definitions.
- `utils/`: API helpers and reusable test data.

The tests target the Rahul Shetty Academy demonstration applications and
therefore require network access. Tests that create orders also mutate the
configured demonstration account.
