import { defineConfig, devices } from '@playwright/test';
import { env } from './utils/env';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  reporter: [['html', { open: 'never' }]],
  use: {
    baseURL: env.baseUrl,
    testIdAttribute: 'data-test',
    screenshot: 'on',
    video: {
      mode: 'retain-on-failure',
      size: { width: 1920, height: 1080 },
    },
    trace: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 },
      },
    },
  ],
});