import { test, expect } from '@playwright/test';
import { BASE_URL, USERNAME, PASSWORD} from '../utilis/envConfig';
import { ProductPage } from '../pages/productPage';
import { LoginPage } from '../pages/loginPage';
import { loginLocators } from '../locators/loginLocators';
import { productPageLocators } from '../locators/productPageLocators';
import { productsToCart } from '../test-data/products';
import { CartPage } from '../pages/cartPage';
import { checkOutData } from "../test-data/checkOutData";
import { CheckOutPage } from '../pages/checkOutPage';
test.describe("product page validation", () =>{
    let loginPage : LoginPage;
    let productPage : ProductPage;
    let cartPage : CartPage;
    let checkOutPage : CheckOutPage;
    
    test.beforeEach(async ({page})=>{
        loginPage = new LoginPage(page);
        productPage = new ProductPage(page);
        cartPage = new CartPage(page);
        checkOutPage = new CheckOutPage(page);
        await page.goto(BASE_URL);
        await loginPage.login(USERNAME, PASSWORD);  
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
        await productPage.addAllProductsToCart();
        await productPage.clickOnCartLink();
        await cartPage.clickOnCheckout();
    })
    test("validate checkout page UI elements", async ({page}) =>{
        const checkOutElements = await checkOutPage.getcheckoutelements();
        await expect(checkOutElements.pageInfo).toBeVisible();
        await expect(checkOutElements.cancelButton).toBeVisible();
        await expect(checkOutElements.continueButton).toBeVisible();
    });
    test("validate cancel button functionality", async ({page}) =>{
        await checkOutPage.clickCancel();
        await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
    });
    test("validate continue button functionality", async ({page}) =>{
        await checkOutPage.fillcheckOutform(checkOutData.firstName, checkOutData.lastName, checkOutData.postalCode);
        await checkOutPage.clickContinue();
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');
    }); 

    test.only("validate error message on empty form submission", async ({page}) =>{
        await checkOutPage.clickContinue();
        const errorMsg = await checkOutPage.getErrorMsg();
        expect(errorMsg).toContain("Error: First Name is required");
    }); 
});