// tests/seed.spec.ts
import { test, expect } from '@playwright/test';

// npx playwright agents plan --test tests/seed.spec.ts --output tests-plan.json
test.describe('测试组', () => {
  test('seed', async ({ page }) => {
    // Navigate to the website
    await page.goto('https://playwright.dev/');
  });
}); 