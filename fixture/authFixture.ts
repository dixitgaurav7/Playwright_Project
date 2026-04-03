import { test as base, expect, Page } from '@playwright/test';

type myFixture = {
  loggedInUser: Page;
};
export const test = base.extend<myFixture>({
  loggedInUser: async ({ page }, use) => {
    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name', 'testuser');
    await page.fill('#password', 'password123');
    await page.click('#login-button');
    await expect(page).toHaveURL('/dashboard');
    await use(page);
  }
  });
  export { expect } from '@playwright/test';