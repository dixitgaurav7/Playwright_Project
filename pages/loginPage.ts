import { loginLocators } from "../locators/loginLocators";
import { Page } from "@playwright/test";

export class LoginPage {
    constructor(private page: Page) { 


    }
    async login(username: string, password: string){
        await this.page.fill(loginLocators.userNameInput, username);
        await this.page.fill(loginLocators.passwordInput,password);
        await this.page.click(loginLocators.loginButton);
    }
}