import { test, expect } from '@playwright/test';
import { BASE_URL, USERNAME, PASSWORD} from '../utilis/envConfig';
import { ProductPage } from '../pages/productPage';
import { LoginPage } from '../pages/loginPage';
import { loginLocators } from '../locators/loginLocators';
import { productPageLocators } from '../locators/productPageLocators';
import { productsToCart } from '../test-data/products';
import { CartPage } from '../pages/cartPage';
test.describe("product page validation", () =>{
    let loginPage : LoginPage;
    let productPage : ProductPage;
    test.beforeEach(async ({page})=>{
        loginPage = new LoginPage(page);
        productPage = new ProductPage(page);
        await page.goto(BASE_URL);
        await loginPage.login(USERNAME, PASSWORD);  
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    });
    test("validate cart page URL and UI elements", async ({page}) =>{
        await productPage.addAllProductsToCart();
        await productPage.clickOnCartLink();
        await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
        const cartPage = new CartPage(page);
        const cartElements = await cartPage.getCartPageElements();
        await expect(cartElements.cartTitle).toBeVisible();
        await expect(cartElements.shoppingCart).toBeVisible();
        await expect(cartElements.checkoutButton).toBeVisible();
    });
    
    
    test("validate continue shopping button", async ({page}) =>{
        await productPage.addAllProductsToCart();
        await productPage.clickOnCartLink();
        const cartPage = new CartPage(page);
        await cartPage.clickOnContinue();
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    });

    test("validate first product in cart", async ({page}) =>{
        await productPage.addAllProductsToCart();
        await productPage.clickOnCartLink();
        const cartPage = new CartPage(page);
        const firstProduct = await cartPage.getFirstProductInCart();
        expect(firstProduct).toBe(productsToCart[0]);
    });

    test("validate all products in cart", async ({page}) =>{
        const allproductdetails = await productPage.getAllProductDetails();
        await productPage.addAllProductsToCart();
        await productPage.clickOnCartLink();
        const cartPage = new CartPage(page);
        const allCartProducts = await cartPage.getCartProducts();
        expect(allCartProducts).toEqual(allproductdetails);
    });

     test("validate specific products in cart", async ({page}) =>{
        const specificProducts = [productsToCart[1], productsToCart[3]];
        const specificProductNames = specificProducts;
        await productPage.addSpecificProductToCart(specificProductNames);
        await productPage.clickOnCartLink();
        const cartPage = new CartPage(page);
        const allCartProducts = await cartPage.getCartProducts();
        expect(allCartProducts).toEqual(specificProducts);
        

    });

    test("validate remove functionality in cart", async ({page}) =>{
        await productPage.addAllProductsToCart();
        await productPage.clickOnCartLink();
        const cartPage = new CartPage(page);
        await cartPage.removeFirstProduct();
        const allCartProducts = await cartPage.getCartProducts();
        expect(allCartProducts).toEqual(productsToCart.slice(1));

    });
});