import {test,expect} from '@playwright/test';
test ("verify title of the page", async ({page}) =>{
    await page.goto('https://www.saucedemo.com/');
    let title = await page.title();
    console.log(title);
    await expect(page).toHaveTitle('Swag Labs');
    
});

