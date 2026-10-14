# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A Playwright Test (TypeScript) end-to-end suite that runs against the public demo site `https://www.saucedemo.com` (the `BASE_URL` env var, used as `baseURL` in `playwright.config.ts`). There is no application code here — only tests.

## Commands

`package.json` defines no npm scripts; use the Playwright CLI directly.

```bash
npm ci                                   # install dependencies
cp .env.example .env                     # then fill in BASE_URL and credentials
npx playwright install --with-deps       # install browsers (first run / CI)

npx playwright test                      # run everything (headless, chromium only)
npx playwright test tests/sanity.spec.ts # run one file
npx playwright test tests/checkout       # run one folder
npx playwright test -g "locked user"     # run tests whose title matches
npx playwright test tests/sanity.spec.ts:9   # run the test at a given line
npx playwright test --headed             # watch the browser
npx playwright test --ui                 # interactive UI mode
npx playwright show-report               # open the HTML report (it never opens automatically)
```

There is no lint, typecheck, or build step configured (no `tsconfig.json`, no ESLint).

## Architecture

Page Object Model wired through Playwright fixtures:

- `pages/*.ts` — one class per page. Locators are `readonly` fields assigned in the constructor; actions are methods. `page` is a private constructor parameter. Locate elements by the site's `data-test` attribute with `page.TestgetById('...')` (`testIdAttribute` is set to `data-test` in `playwright.config.ts`), not `page.locator('[data-test="..."]')`.
- `fixtures/fixtures.ts` — extends Playwright's `test` with one fixture per page object (`loginPage`, `inventoryPage`, `cartPage`, …) and re-exports `expect`.
- `tests/*.spec.ts` — import `test` and `expect` from `../fixtures/fixtures`, **not** from `@playwright/test`, and receive page objects as fixture arguments instead of constructing them.

Adding a new page means: create the class in `pages/`, add it to the `Pages` type and the `base.extend` block in `fixtures/fixtures.ts`, then use it as a fixture in specs.

Navigation uses relative paths (`page.goto('/')`) resolved against `baseURL`.

## Config behavior worth knowing

- The base URL and login credentials come from `.env` (gitignored), loaded by `utils/env.ts`, which throws if a variable is missing. Tests import `env` from `utils/env` instead of hardcoding users/passwords. `.env.example` lists the variables. CI reads them from GitHub `vars.BASE_URL` and secrets `STANDARD_USER`, `LOCKED_OUT_USER`, `PASSWORD`.
- Only the `chromium` project is defined, with a 1920x1080 viewport.
- `screenshot: 'on'` captures a screenshot for every test; video and trace are kept only on failure. Artifacts land in `test-results/`, the report in `playwright-report/` (both gitignored).
- Retries are 2 on CI (`process.env.CI`), 0 locally. `fullyParallel` is on.
- CI (`.github/workflows/playwright.yml`) runs `npx playwright test` on push/PR to `main`/`master` and uploads `playwright-report/`. On push to `main`, the `deploy-report` job publishes the report to GitHub Pages (https://alexkomanov.github.io/misrad-briut-demo-playwright/, publicly visible). Merges to `main` require the `test` check to pass (repo ruleset), so don't rename that job.

## Playwright test agents

The repo is set up for Playwright's planner/generator/healer agent workflow:

- `.mcp.json` registers the `playwright-test` MCP server (`npx playwright run-test-mcp-server`), which the agents in `.claude/agents/` depend on.
- `playwright-test-planner` explores the site and writes test plans into `specs/`.
- `playwright-test-generator` turns a plan item into a spec file, using `tests/seed.spec.ts` as the seed (it shows the fixture import and the starting navigation).
- `playwright-test-healer` runs and repairs failing tests.

Generated specs go one test per file under `tests/<area>/` (e.g. `tests/checkout/`), in a `describe` named after the plan section, with the plan scenario name as the test title.

Generated tests should follow the fixture/page-object pattern above rather than raw `page` locators inline.
