import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://example.com/');
  await page.getByRole('heading', { name: 'Example Domain' }).click();
  await page.getByText('This domain is for use in').click();
  await page.getByRole('paragraph').filter({ hasText: 'Learn more' }).click();
  await expect(page.getByRole('heading', { name: 'Example Domain' })).toBeVisible();
  await expect(page.getByText('This domain is for use in')).toBeVisible();
  await page.getByRole('link', { name: 'Learn more' }).click();
  await expect(page.getByText('We provide a web service on')).toBeVisible();
  await expect(page.getByRole('main')).toMatchAriaSnapshot(`
    - paragraph:
      - text: As described in
      - link /RFC \\d+/:
        - /url: /go/rfc2606
      - text: and
      - link /RFC \\d+/:
        - /url: /go/rfc6761
      - text: ", a number of domains such as example.com and example.org are maintained for documentation purposes. These domains may be used as illustrative examples in documents without prior coordination with us. They are not available for registration or transfer."
    `);
});