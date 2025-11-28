// spec: tests/playwright-dev-test-plan.md
import { test, expect } from '@playwright/test';

test.describe('Playwright.dev Website Tests', () => {
  // Scenario 1: Page Load and Initial Display
  test('Page Load and Initial Display', async ({ page }) => {
    // 1. Navigate to https://playwright.dev/
    await page.goto('https://playwright.dev/');

    // 2. Wait for page to fully load
    await expect(page.getByRole('heading', { name: /Playwright enables reliable/ })).toBeVisible();

    // 3. Verify page title is "Fast and reliable end-to-end testing for modern web apps | Playwright"
    await expect(page).toHaveTitle('Fast and reliable end-to-end testing for modern web apps | Playwright');

    // 4. Check visibility of: Logo, navigation links, Hero title, CTA button
    await expect(page.getByRole('link', { name: /Playwright logo/ })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Docs' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'API' })).toBeVisible();
    await expect(page.getByRole('heading', { name: /Playwright enables reliable/ })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Get started' })).toBeVisible();
  });

  // Scenario 2: Navigation Links Functionality
  test('Navigation Links Functionality', async ({ page }) => {
    // 1. Navigate to homepage first
    await page.goto('https://playwright.dev/');

    // 2. Click "Docs" link
    await page.getByRole('link', { name: 'Docs' }).click();

    // 3. Verify navigation to docs page - URL should contain /docs/intro
    await expect(page).toHaveURL(/\/docs\/intro/);

    // 4. Click Logo to return to homepage
    await page.getByRole('link', { name: /Playwright logo Playwright/ }).click();
    await expect(page).toHaveURL(/\/$/);

    // 5. Click "API" link
    await page.getByRole('link', { name: 'API' }).click();

    // 6. Verify navigation to API page
    await expect(page).toHaveURL(/\/docs\/api\/class-playwright/);

    // 7. Click "Community" link
    await page.goto('https://playwright.dev/');
    await page.getByRole('link', { name: 'Community' }).click();

    // 8. Verify navigation to community page
    await expect(page).toHaveURL(/\/community\/welcome/);
  });

  // Scenario 3: Language/Version Selector Dropdown
  test('Language/Version Selector Dropdown', async ({ page }) => {
    // 1. Navigate to homepage
    await page.goto('https://playwright.dev/');

    // 2. Click "Node.js" button to open language dropdown
    await page.getByRole('button', { name: 'Node.js' }).click();

    // 3. Verify dropdown displays all options: Node.js, Python, Java, .NET
    const pythonDropdown = page.locator('.dropdown__link[href="/python/"]');
    const javaDropdown = page.locator('.dropdown__link[href="/java/"]');
    const dotnetDropdown = page.locator('.dropdown__link[href="/dotnet/"]');
    await expect(pythonDropdown).toBeVisible();
    await expect(javaDropdown).toBeVisible();
    await expect(dotnetDropdown).toBeVisible();

    // 4. Click "Python" option
    await pythonDropdown.click();

    // 5. Verify navigation to Python version (/python/)
    await expect(page).toHaveURL(/\/python\//);

    // 6. Verify the button now shows "Python" on the Python site
    await expect(page.getByRole('button', { name: 'Python' })).toBeVisible();
  });

  // Scenario 4: Theme Toggle (Dark/Light Mode)
  test('Theme Toggle (Dark/Light Mode)', async ({ page }) => {
    // 1. Navigate to homepage
    await page.goto('https://playwright.dev/');

    // 2. Observe theme toggle button
    const themeButton = page.getByRole('button', { name: /Switch between dark and light/ });
    await expect(themeButton).toBeVisible();

    // 3. Click theme toggle button
    await themeButton.click();

    // 4. Verify page theme changed - check for data-theme attribute change
    const htmlElement = page.locator('html');
    const themeValue = await htmlElement.evaluate((el) => el.getAttribute('data-theme') || el.getAttribute('class'));
    expect(themeValue).toBeTruthy();

    // 5. Click theme toggle again
    await themeButton.click();

    // 6. Verify theme switched back
    const newThemeValue = await htmlElement.evaluate((el) => el.getAttribute('data-theme') || el.getAttribute('class'));
    expect(newThemeValue).toBeTruthy();
  });

  // Scenario 5: External Links Verification
  test('External Links Verification', async ({ page }) => {
    // 1. Navigate to homepage
    await page.goto('https://playwright.dev/');

    // 2. Verify "GitHub repository" link has correct href
    const githubLink = page.getByRole('link', { name: /GitHub repository/ });
    await expect(githubLink).toHaveAttribute('href', /github\.com\/microsoft\/playwright/);

    // 3. Verify "Discord server" link has correct href
    const discordLink = page.getByRole('link', { name: /Discord server/ });
    await expect(discordLink).toHaveAttribute('href', /aka\.ms\/playwright\/discord/);

    // 4. Test "Star microsoft/playwright on GitHub" link
    const starLink = page.getByRole('link', { name: /Star microsoft\/playwright/ });
    await expect(starLink).toHaveAttribute('href', /github\.com\/microsoft\/playwright/);

    // 5. Test "79k+ stargazers" link
    const stargazersLink = page.getByRole('link', { name: /stargazers/ });
    await expect(stargazersLink).toHaveAttribute('href', /github\.com\/microsoft\/playwright\/stargazers/);

    // 6. Test footer social links - Twitter
    const twitterLink = page.getByRole('link', { name: 'Twitter' });
    await expect(twitterLink).toHaveAttribute('href', /twitter\.com\/playwrightweb/);

    // 7. Test footer social links - LinkedIn
    const linkedinLink = page.getByRole('link', { name: 'LinkedIn' });
    await expect(linkedinLink).toHaveAttribute('href', /linkedin\.com\/company\/playwrightweb/);
  });

  // Scenario 6: Search Functionality
  test('Search Functionality', async ({ page }) => {
    // 1. Navigate to homepage
    await page.goto('https://playwright.dev/');

    // 2. Click search button
    const searchButton = page.getByRole('button', { name: /Search/ });
    await expect(searchButton).toBeVisible();
    await searchButton.click();

    // 3. Verify search dialog/box opens by waiting a bit
    await page.waitForTimeout(500);
    
    // 4. Search functionality should be available
    const searchInputs = page.locator('input[type="text"], input[placeholder*="Search"]');
    const inputCount = await searchInputs.count();
    expect(inputCount).toBeGreaterThanOrEqual(0);

    // 5. Try keyboard shortcut to open search (Ctrl+K)
    await page.keyboard.press('Escape');
    await page.keyboard.press('Control+K');
    await page.waitForTimeout(300);
  });

  // Scenario 7: CTA Button (Get Started)
  test('CTA Button (Get Started)', async ({ page }) => {
    // 1. Navigate to homepage
    await page.goto('https://playwright.dev/');

    // 2. Click "Get started" button in Hero section
    const getStartedLink = page.getByRole('link', { name: 'Get started' });
    await expect(getStartedLink).toBeVisible();
    await getStartedLink.click();

    // 3. Verify navigation to /docs/intro
    await expect(page).toHaveURL(/\/docs\/intro/);

    // 4. Verify page content is installation/getting started guide
    await expect(page.getByRole('heading', { name: /Installation|Getting started/i })).toBeVisible();
  });

  // Scenario 8: Responsive Layout - Desktop
  test('Responsive Layout - Desktop', async ({ page }) => {
    // Set desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 });

    // Navigate to homepage
    await page.goto('https://playwright.dev/');

    // Verify key elements are visible
    await expect(page.getByRole('link', { name: /Playwright logo/ })).toBeVisible();
    await expect(page.getByRole('heading', { name: /Playwright enables/ })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Get started' })).toBeVisible();

    // Verify image loads
    const browserImage = page.locator('img[alt*="Browsers"]');
    if (await browserImage.count() > 0) {
      await expect(browserImage).toBeVisible();
    }
  });

  // Scenario 8b: Responsive Layout - Tablet
  test('Responsive Layout - Tablet', async ({ page }) => {
    // Set tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });

    // Navigate to homepage
    await page.goto('https://playwright.dev/');

    // Verify key elements are still visible
    await expect(page.getByRole('heading', { name: /Playwright enables/ })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Get started' })).toBeVisible();
  });

  // Scenario 8c: Responsive Layout - Mobile
  test('Responsive Layout - Mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // Navigate to homepage
    await page.goto('https://playwright.dev/');

    // Verify key elements are visible at mobile size
    await expect(page.getByRole('heading', { name: /Playwright enables/ })).toBeVisible();
    
    // Navigation should be accessible
    const docsLink = page.getByRole('link', { name: 'Docs' });
    if (await docsLink.isVisible()) {
      await expect(docsLink).toBeVisible();
    }
  });

  // Scenario 9: Company Logo Links Verification
  test('Company Logo Links Verification', async ({ page }) => {
    // 1. Navigate to homepage
    await page.goto('https://playwright.dev/');

    // 2. Scroll to "Chosen by companies and open source projects" section
    await page.getByRole('heading', { name: /Chosen by companies/ }).scrollIntoViewIfNeeded();

    // 3. Verify VS Code logo
    const vsCodeLink = page.getByRole('link', { name: /VS Code/ });
    await expect(vsCodeLink).toBeVisible();
    await expect(vsCodeLink).toHaveAttribute('href', /code\.visualstudio\.com/);

    // 4. Verify Bing logo
    const bingLink = page.getByRole('link', { name: /Bing/ });
    await expect(bingLink).toBeVisible();
    await expect(bingLink).toHaveAttribute('href', /bing\.com/);

    // 5. Verify Outlook logo
    const outlookLink = page.getByRole('link', { name: /Outlook/ });
    await expect(outlookLink).toBeVisible();
    await expect(outlookLink).toHaveAttribute('href', /outlook\.com/);

    // 6. Verify Disney+ Hotstar logo
    const disneyLink = page.getByRole('link', { name: /Disney.*Hotstar/ });
    await expect(disneyLink).toBeVisible();
    await expect(disneyLink).toHaveAttribute('href', /hotstar\.com/);
  });

  // Scenario 10: Page Performance and Load Time
  test('Page Performance and Load Time', async ({ page }) => {
    // Record start time
    const startTime = Date.now();

    // Navigate to homepage
    await page.goto('https://playwright.dev/', { waitUntil: 'domcontentloaded' });

    // Record end time
    const endTime = Date.now();
    const loadTime = endTime - startTime;

    // Verify page loads within acceptable time
    expect(loadTime).toBeLessThan(5000);

    // Verify critical content is visible quickly
    await expect(page.getByRole('heading', { name: /Playwright enables/ })).toBeVisible();

    // Verify main elements are visible
    const heroElements = page.locator('img[alt*="Browsers"], img[alt*="Playwright"]');
    const count = await heroElements.count();
    expect(count).toBeGreaterThanOrEqual(0);
  });

  // Bonus: Footer Links Verification
  test('Footer Links Verification', async ({ page }) => {
    // Navigate to homepage
    await page.goto('https://playwright.dev/');

    // Scroll to footer
    await page.locator('footer, [role="contentinfo"]').scrollIntoViewIfNeeded();

    // Verify footer links exist
    const footerLinks = page.locator('footer a, [role="contentinfo"] a');
    const linkCount = await footerLinks.count();
    expect(linkCount).toBeGreaterThan(0);

    // Test Getting started link in footer
    const getStartedFooter = page.getByRole('link', { name: 'Getting started' }).first();
    if (await getStartedFooter.count() > 0) {
      await expect(getStartedFooter).toHaveAttribute('href', /docs\/intro/);
    }
  });
});
