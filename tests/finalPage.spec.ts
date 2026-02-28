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
import { checkoutOverviewPage } from "../pages/checkOutOverview";
import { finalPageLocator } from '../locators/finalPageLocator';
import { FinalPage } from '../pages/finalPage';
test.describe("finalpage validation", () =>{
    let loginPage : LoginPage;
    let productPage : ProductPage;
    let cartPage : CartPage;
    let checkOutPage : CheckOutPage;
    let checkOutOverview : checkoutOverviewPage;
    let finalPage : FinalPage;
    
    test.beforeEach(async ({page})=>{
        loginPage = new LoginPage(page);
        productPage = new ProductPage(page);
        cartPage = new CartPage(page);
        checkOutPage = new CheckOutPage(page);
        checkOutOverview = new checkoutOverviewPage(page);
        finalPage = new FinalPage(page);
        await page.goto(BASE_URL);
        await loginPage.login(USERNAME, PASSWORD);  
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
        await productPage.addAllProductsToCart();
        await productPage.clickOnCartLink();
        await cartPage.clickOnCheckout();
        await checkOutPage.fillcheckOutform(checkOutData.firstName, checkOutData.lastName, checkOutData.postalCode);
        await checkOutPage.clickContinue();
        await checkOutOverview.clickFinishButton();
    })
    test("validate the final page elements", async()=>{
        await checkOutOverview.clickFinishButton();
        const finalPageElements = await finalPage.getFinalPageElements();
        expect(finalPageElements.pageInfo).toBe("Checkout: Complete!");
        expect(finalPageElements.successMessage).toBe("Thank you for your order!");
        await expect(finalPageElements.backToHomeBtn).toBeVisible();
    });
    test("validate the success message on final page", async()=>{
        await checkOutOverview.clickFinishButton();
        const successMessage = await finalPage.getSuccessMessage();
        expect(successMessage).toBe("Thank you for your order!");
    });     
    test("validate the back to home button functionality", async({page})=>{
        await checkOutOverview.clickFinishButton();
        await finalPage.clickBackToHomeBtn();
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    });
});