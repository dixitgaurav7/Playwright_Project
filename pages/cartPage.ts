import { Page } from '@playwright/test';
import { cartPageLocators } from '../locators/cartPageLocators';

export class CartPage {
    constructor(private page : Page) {
    }

    async clickOnContinue(){
        await this.page.click(cartPageLocators.continueShoppingButton);
    }
    async getCartPageElements() {
        return {
            cartTitle: this.page.locator(cartPageLocators.cartPageTitle),
            shoppingCart : this.page.locator(cartPageLocators.continueShoppingButton),
             checkoutButton: this.page.locator(cartPageLocators.checkoutButton)     
            
    }
}
async getCartProducts(){
     
            const allNames = await this.page.locator(cartPageLocators.productName).allTextContents();
            const allDescriptions = await this.page.locator(cartPageLocators.productDescription).allTextContents();
            const allPrices = await this.page.locator(cartPageLocators.productPrice).allTextContents();
            const allCartProducts = allNames.map((_, i) => ({
                name: allNames[i].trim(),
                description: allDescriptions[i].trim(),
                price: allPrices[i].trim()
                
            }));
            return allCartProducts;
}
async getFirstProductInCart() {
    const name = await this.page.locator(cartPageLocators.productName).first().textContent();
    const description = await this.page.locator(cartPageLocators.productDescription).first().textContent();
    const price = await this.page.locator(cartPageLocators.productPrice).first().textContent();

    return {
        name: name?.trim(),
        description: description?.trim(),
        price: price?.trim()
    };
}
async removeFirstProduct(){
    await this.page.click(cartPageLocators.removeButton);
}
async clickOnCheckout(){
    await this.page.click(cartPageLocators.checkoutButton); 

}
}
