import {test,expect} from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { BASE_URL, USERNAME, PASSWORD } from '../utilis/envConfig';

test('Login to sauce demo',async ({page})=>{
    const loginPage = new LoginPage(page);
    await page.goto(BASE_URL);
    await loginPage.login(USERNAME, PASSWORD);
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

});