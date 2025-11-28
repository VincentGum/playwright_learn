import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.baidu.com/');
  await page.getByRole('button', { name: '百度一下' }).click();
  await page.locator('#chat-textarea').click();
  await page.locator('#chat-textarea').click();
  await page.getByRole('button', { name: '百度一下' }).click();
});