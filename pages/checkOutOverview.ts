import { Page  } from "@playwright/test";
import { checkOutOverviewLocators } from '../locators/checkOutoverviewLocators';

export class checkoutOverviewPage{
    constructor(private page:Page){
    }

    getcheckOutEement() {
        return {
            pageInfo: this.page.locator(checkOutOverviewLocators.pageInfo),
            finishButton: this.page.locator(checkOutOverviewLocators.finishButton),
            cancelButton: this.page.locator(checkOutOverviewLocators.cancelButton),
           
        }
    }

    async getOverviewProductDetails(){
        const productName = await this.page.locator(checkOutOverviewLocators.productName).innerText();
        const productDescription = await this.page.locator(checkOutOverviewLocators.productDescription).innerText();
        const productPrice = await this.page.locator(checkOutOverviewLocators.productPrice).innerText();
        return {
            productName,
            productDescription,
            productPrice
        }
    }

    async getItemTotal(){
        const itemTotal = await this.page.locator(checkOutOverviewLocators.itemTotal).innerText();
        return itemTotal.replace('$', '').trim();
    }
    async getTax(){
        const tax = await this.page.locator(checkOutOverviewLocators.tax).innerText();
        return tax.replace('$', '').trim();
    }
    async getTotal(){
        const total = await this.page.locator(checkOutOverviewLocators.total).innerText();
        return total.replace('$', '').trim();
    }
    async clickCancelButton(){
        await this.page.locator(checkOutOverviewLocators.cancelButton).click();
    }
        async clickFinishButton(){  
            await this.page.locator(checkOutOverviewLocators.finishButton).click();
        }
}
