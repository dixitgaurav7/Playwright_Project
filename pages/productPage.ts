import { Page } from '@playwright/test';
import { productPageLocators } from '../locators/productPageLocators';

export class ProductPage {
    addProducts: any;
    constructor(private page:Page) {

    }
    async logout(){
        await this.page.click(productPageLocators.settingIcon);
        await this.page.click(productPageLocators.logoutLink);

    }
    async openAboutPage(){
        await this.page.click(productPageLocators.settingIcon);
        await this.page.click(productPageLocators.aboutLink);
    }
    async validateallProductDisplayed(){
        const productNames = await this.page.locator(productPageLocators.productName).allTextContents();
        const productDescriptions = await this.page.locator(productPageLocators.productDescription).allTextContents();
        const price = await this.page.locator(productPageLocators.productPrice).allTextContents();
        const addToCartButtons = await this.page.locator(productPageLocators.addtoCartButton).count();
        if(productNames.length===0 || productDescriptions.length===0 || price.length===0 || addToCartButtons===0){
            throw new Error("Some products are not displayed properly");
        }
    }
    async addFirstProductToCart(){
        await this.page.locator(productPageLocators.addtoCartButton).first().click();
        
    }
    async addAllProductsToCart(){
        const buttons = await this.page.locator(productPageLocators.addtoCartButton);
        const count = await buttons.count();
        for(let i =0;i<count;i++){
            await buttons.nth(i).click();
            await this.page.waitForTimeout(3000);
        }
          
    }
    async addSpecificProductToCart(productName:string[]){
        const allProducts = this.page.locator(productPageLocators.productName);
        const count = await allProducts.count();
        for (let i=0;i<count;i++){
            const name = await allProducts.nth(i).textContent();
            if(name && productName.includes(name.trim())){
                await this.page.locator(productPageLocators.addtoCartButton).nth(i).click();
                await this.page.waitForTimeout(3000);
            }
        }
    }

    async clickOnCartLink(){
        await this.page.locator(productPageLocators.cartLink).click();

    }
    async getFirstProductDetail(){
        const name = await this.page.locator(productPageLocators.productName).first().textContent();
        const description = await this.page.locator(productPageLocators.productDescription).first().textContent();
        const price = await this.page.locator(productPageLocators.productPrice).first().textContent();
        return {
            name:name?.trim(),
            description:description?.trim(),
            price:price?.trim()
        };
        
    }
    async getAllProductDetails(){
        const allNames = await this.page.locator(productPageLocators.productName).allTextContents();
        const allDescriptions = await this.page.locator(productPageLocators.productDescription).allTextContents();
        const allPrices = await this.page.locator(productPageLocators.productPrice).allTextContents();
        const allProducts = allNames.map((_, i) => ({
            name: allNames[i].trim(),
            description: allDescriptions[i].trim(),
            price: allPrices[i].trim()
            
        }));
        return allProducts;
    }
        async getSpecificProductDetails(productName: string) {
            const allNames = await this.page.locator(productPageLocators.productName).allTextContents();
        const allDescriptions = await this.page.locator(productPageLocators.productDescription).allTextContents();
        const allPrices = await this.page.locator(productPageLocators.productPrice).allTextContents();
        const allProducts = allNames.map((_, i) => ({
            name: allNames[i].trim(),
            description: allDescriptions[i].trim(),
            price: allPrices[i].trim()
            
        }));
        return allProducts.filter(p=>productName.includes(p.name));
            // Implementation for getting specific product details
        }
    }



