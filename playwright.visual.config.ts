import { defineConfig, devices } from '@playwright/test'

/**
 * Playwright config for visual regression tests.
 * Runs against a pre-built Storybook served locally.
 *
 * Usage:
 *   npx storybook build --output-dir storybook-static
 *   npx playwright test --config playwright.visual.config.ts
 *
 * First run creates snapshots in tests/__snapshots__/.
 * To update snapshots: add --update-snapshots flag.
 */
export default defineConfig({
  testDir:     './tests',
  testMatch:   '**/visual.spec.ts',
  snapshotDir: './tests/__snapshots__',

  // Retry once in CI to avoid flakes from rendering timing
  retries: process.env.CI ? 1 : 0,

  use: {
    baseURL:          'http://localhost:6007',
    // Compare at 1x so screenshots are OS-independent
    deviceScaleFactor: 1,
    // Wait for fonts + animations to settle
    actionTimeout:    10_000,
  },

  expect: {
    // Allow up to 0.3% pixel difference (sub-pixel anti-aliasing)
    toHaveScreenshot: { maxDiffPixelRatio: 0.003 },
  },

  projects: [
    {
      name:    'chromium',
      use:     { ...devices['Desktop Chrome'] },
    },
  ],

  // Serve the pre-built Storybook during the test run
  webServer: {
    command:  'npx serve storybook-static -p 6007 -s',
    port:     6007,
    reuseExistingServer: !process.env.CI,
    timeout:  60_000,
  },
})
