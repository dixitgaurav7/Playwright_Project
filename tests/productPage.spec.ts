import { test, expect } from '@playwright/test';
import { BASE_URL, USERNAME, PASSWORD} from '../utilis/envConfig';
import { ProductPage } from '../pages/productPage';
import { LoginPage } from '../pages/loginPage';
import { loginLocators } from '../locators/loginLocators';
import { productPageLocators } from '../locators/productPageLocators';
import { productsToCart } from '../test-data/products';
test.describe("product page validation", () =>{
    let loginPage : LoginPage;
    let productPage : ProductPage;
    test.beforeEach(async ({page})=>{
        loginPage = new LoginPage(page);
        productPage = new ProductPage(page);
        await page.goto(BASE_URL);
        await loginPage.login(USERNAME, PASSWORD);  
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    })
    test("validate logout functionality", async({page})=>{
        await productPage.logout();
        await expect(page.locator(loginLocators.loginButton)).toBeVisible();
    })
    test("validate about page navigation", async({page})=>{
        await productPage.openAboutPage();
        await expect(page.locator(productPageLocators.requestDemoButton)).toBeVisible();
        await expect(page.locator(productPageLocators.tryFreeButton)).toBeVisible();
        await page.goBack();
        await expect(page.locator(productPageLocators.settingIcon)).toBeVisible();
        }) 
        test("validate all products are displayed", async({page})=>{
            await productPage.validateallProductDisplayed();    
            await productPage.addFirstProductToCart();
            await productPage.addAllProductsToCart();
        })

        test("validate adding specific products", async({page})=>{
            await productPage.addSpecificProductToCart(productsToCart);
            
        })

});