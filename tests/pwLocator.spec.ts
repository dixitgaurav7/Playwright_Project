import {test,expect,Locator} from '@playwright/test';

test("Verify the PW locator", async ({page}) => {
  // Test implementation
  await page.goto("https://demo.nopcommerce.com/");
  const logo:Locator = page.getByAltText("nopCommerce demo store");
  await expect(logo).toBeVisible();
  await logo.click();
  const text:Locator = page.getByText("Welcome to our store");
  await expect(text).toBeVisible();
  //await expect(page.getByText("Welcome to our store")).toBeVisible();
  await page.getByRole("link", {name: "Register"}).click();
  await expect(page.getByRole("heading", {name: "Register"})).toBeVisible();
  await page.getByLabel("First name").fill("John");
  await page.getByLabel("Last name").fill("Doe");
  await page.getByLabel("Email").fill("test123@email.com");
  await page.getByLabel("Password").fill("Password123");
  await page.getByLabel("Confirm password").fill("Password123");
  await page.getByRole("button", {name: "Register"}).click();
  await expect(page.getByText("Your registration completed")).toBeVisible();
  await page.getByPlaceholder("Search store").fill("Apple MacBook Pro 13-inch");
  await page.getByRole("button", {name: "Search"}).click();
  await expect(page.getByRole("heading", {name: "Apple MacBook Pro 13-inch"})).toBeVisible();
  await page.getByTitle("Apple MacBook Pro 13-inch").click();
  await expect(page.getByRole("heading", {name: "Apple MacBook Pro 13-inch"})).toBeVisible();
  await page.getByTestId("add-to-cart-button").click();
  await expect(page.getByText("The product has been added to your shopping cart")).toBeVisible();
});