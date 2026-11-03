import { defineConfig } from '@playwright/test'

// Runs against the dev server in demo mode (.env.development sets VITE_DEMO_MODE=true).
// Uses the Chrome installed on the machine, so no browser download is needed.
// The dev server needs Node 20.19+ or 22.12+, the same as `npm run dev`.
export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  reporter: [['list']],
  outputDir: './e2e/.output',
  use: {
    baseURL: 'http://localhost:5173',
    channel: 'chrome',
    trace: 'retain-on-failure',
  },
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: true,
    timeout: 60_000,
  },
})
