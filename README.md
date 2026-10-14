# misrad-briut-demo-playwright

End-to-end tests for the [Swag Labs](https://www.saucedemo.com) demo store, written with [Playwright Test](https://playwright.dev) in TypeScript using the Page Object Model.

## Setup

Requires Node.js (LTS).

```bash
npm ci
npx playwright install --with-deps
cp .env.example .env   # then fill in the values
```

### Environment variables

The base URL and login credentials are read from `.env` (gitignored) by `utils/env.ts`. A run fails fast if any of them is missing.

| Variable          | Description                         |
| ----------------- | ----------------------------------- |
| `BASE_URL`        | Site under test                     |
| `STANDARD_USER`   | Username of a regular user          |
| `LOCKED_OUT_USER` | Username of a locked-out user       |
| `PASSWORD`        | Password shared by the test users   |

## Running tests

```bash
npx playwright test                      # run everything (headless, chromium)
npx playwright test tests/checkout       # run one folder
npx playwright test -g "locked user"     # run tests whose title matches
npx playwright test --headed             # watch the browser
npx playwright test --ui                 # interactive UI mode
npx playwright show-report               # open the HTML report
```

Screenshots are captured for every test; video and trace are kept on failure. Results go to `test-results/` and the report to `playwright-report/`.

## Project structure

```
pages/        Page objects, one class per page (locators + actions)
fixtures/     Extends Playwright's test with a fixture per page object
tests/        Specs; import test/expect from fixtures/fixtures
specs/        Test plans used by the Playwright test agents (local only, gitignored)
utils/env.ts  Loads and validates environment variables
```

Elements are located by the site's `data-test` attribute via `page.getByTestId()`.

## CI

GitHub Actions (`.github/workflows/playwright.yml`) runs the suite on push and pull request to `main`, and uploads the HTML report as an artifact. It reads the `BASE_URL` repository variable and the `STANDARD_USER`, `LOCKED_OUT_USER` and `PASSWORD` repository secrets.

On every push to `main` the report is also published to GitHub Pages: https://alexkomanov.github.io/misrad-briut-demo-playwright/
