import {test,expect} from '@playwright/test'
import { createUser } from '../../factory/user.factory';
test('Faker Demo', async ({page}) => {
    const user = createUser();
    await page.goto('https://automationexercise.com/signup');
    await page.fill('input[data-qa="signup-name"]', user.name);
    await page.fill('input[data-qa="signup-email"]', user.email);
    await page.click('button[data-qa="signup-button"]');
    await page.check('input#id_gender1');
    await page.fill('input#password', user.password);
    await page.selectOption('select#days', user.day.toString());
    await page.selectOption('select#months', user.month.toString());
    await page.selectOption('select#years', user.year);
    await page.fill('input#first_name', user.fullName);
    await page.fill('input#last_name', user.lastName);
    await page.fill('input#company', user.company);
    await page.fill('input#address1', user.address);
    await page.fill('input#city', user.city);
    await page.fill('input#zipcode', user.zipCode);
    await page.fill('input#mobile_number', user.mobile);
});