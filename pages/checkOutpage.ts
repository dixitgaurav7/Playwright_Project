import { Page } from "@playwright/test";
import { checkOutPageLocators } from "../locators/checkOutpagelocators";

export class CheckOutPage {
    constructor(private page: Page) { }

    async getcheckoutelements() {
        return {
            pageInfo: this.page.locator(checkOutPageLocators.pageInfo),
            cancelButton: this.page.locator(checkOutPageLocators.cancelButton),
            continueButton: this.page.locator(checkOutPageLocators.continueButton),
            
        }
    }
    async fillcheckOutform(firstName: string, lastName: string, postalCode: string) {
        await this.page.locator(checkOutPageLocators.firstName).fill(firstName);
        await this.page.locator(checkOutPageLocators.lastName).fill(lastName);
        await this.page.locator(checkOutPageLocators.postalCode).fill(postalCode);
    }
    async clickCancel() {
        await this.page.locator(checkOutPageLocators.cancelButton).click();
    }
    async clickContinue() {
        await this.page.locator(checkOutPageLocators.continueButton).click();
    }
    async getErrorMsg() {
        return this.page.locator(checkOutPageLocators.errorMsg).textContent();
    }
}