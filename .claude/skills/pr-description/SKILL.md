---
name: pr-description
description: Write the title and body of a pull request
  for automation changes. Use when opening or updating a PR.
---

# PR description

1. One topic per PR. If the changes mix topics,
   stop and suggest how to split them.
2. Run `npx playwright test`. Do not open the PR
   while tests fail.
3. Do not commit test plans. Plan files under `specs/`
   (e.g. `specs/plan-1.md`) stay local and are gitignored;
   only `specs/README.md` is tracked.
4. Write the body with these sections:
   - **What**: what was added or changed
   - **Why**: the reason for the change; summarize the
     plan in the body instead of linking a plan file
   - **Agents**: what was generated, what the healer changed,
     and every `test.fixme` with its reason
