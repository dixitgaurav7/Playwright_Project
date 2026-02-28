import { Page } from "@playwright/test";
import { finalPageLocator } from '../locators/finalPageLocator';

export class FinalPage {
    constructor(public page: Page) { }

    async getFinalPageElements() {
        return {
            pageInfo: await this.page.locator(finalPageLocator.pageInfo).textContent(),
            successMessage: await this.page.locator(finalPageLocator.successMessage).textContent(),
            backToHomeBtn: await this.page.locator(finalPageLocator.backToHomeBtn)
        }

    }
    async getSuccessMessage() {       
         return await this.page.locator(finalPageLocator.successMessage).textContent();       

 }
 async clickBackToHomeBtn() {        
    await this.page.locator(finalPageLocator.backToHomeBtn).click();   
}
}