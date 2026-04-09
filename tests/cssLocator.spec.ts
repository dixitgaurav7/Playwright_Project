import { test,expect,Locator } from "@playwright/test";

test("Verify CSS locator",async ({page})=>{
    await page.goto("https://demowebshop.tricentis.com/");
    const searchBox:Locator = page.locator("#small-searchterms");
    await expect(searchBox).toBeVisible();
    await searchBox.fill("T-Shirts");
    const searchButton = page.getByRole('button', { name: 'Search' });
    await searchButton.click();
    await page.waitForTimeout(5000);
    
    
});