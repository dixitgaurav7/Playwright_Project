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
test.describe("product page validation", () =>{
    let loginPage : LoginPage;
    let productPage : ProductPage;
    let cartPage : CartPage;
    let checkOutPage : CheckOutPage;
    let checkOutOverview : checkoutOverviewPage;
    
    test.beforeEach(async ({page})=>{
        loginPage = new LoginPage(page);
        productPage = new ProductPage(page);
        cartPage = new CartPage(page);
        checkOutPage = new CheckOutPage(page);
        checkOutOverview = new checkoutOverviewPage(page);
        await page.goto(BASE_URL);
        await loginPage.login(USERNAME, PASSWORD);  
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
        await productPage.addAllProductsToCart();
        await productPage.clickOnCartLink();
        await cartPage.clickOnCheckout();
        await checkOutPage.fillcheckOutform(checkOutData.firstName, checkOutData.lastName, checkOutData.postalCode);
        await checkOutPage.clickContinue();
    })
    test("validate checkout overview page UI elements", async ({page}) =>{
        const overviewElements = checkOutOverview.getcheckOutEement();
        await expect(overviewElements.pageInfo).toBeVisible();
        await expect(overviewElements.cancelButton).toBeVisible();
        await expect(overviewElements.finishButton).toBeVisible();
    });

test("validate product details on checkout overview page", async ({page}) =>{
    const checkOutOverview = new checkoutOverviewPage(page);
    const productDetails = await checkOutOverview.getOverviewProductDetails();
    expect(productDetails.productName).toBe(productsToCart[0]);        
});

test("validate item total, tax and total amount on checkout overview page", async ({page}) =>{
    const checkOutOverview = new checkoutOverviewPage(page);
    const itemTotal = await checkOutOverview.getItemTotal();
    const tax = await checkOutOverview.getTax();
    const total = await checkOutOverview.getTotal();
    expect(itemTotal).toBe('29.99');
    expect(tax).toBe('2.40');
    expect(total).toBe('32.39');
});

test("validate cancel button functionality on checkout overview page", async ({page}) =>{
    const checkOutOverview = new checkoutOverviewPage(page);
    await checkOutOverview.clickCancelButton();
    await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
});

test("validate finish button functionality on checkout overview page", async ({page}) =>{
    const checkOutOverview = new checkoutOverviewPage(page);
    await checkOutOverview.clickFinishButton();
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-complete.html');
});
});
 