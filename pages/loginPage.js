"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginPage = void 0;
const test_1 = require("@playwright/test");
class LoginPage {
    constructor(page) {
        this.page = page;
    }
    gotoLoginPage() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.page.goto("/");
            yield this.page.getByRole("link", { name: "Account" }).hover();
            const loginLink = this.page.getByRole("link", { name: "Account" });
            yield loginLink.click();
        });
    }
    login(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.page.locator("#loginFrm_loginname").fill(username);
            yield this.page.locator("#loginFrm_password").fill(password);
            yield this.page.getByTitle("Login").click();
        });
    }
    isLoginSuccessful() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.page.url().includes("index.php?rt=account/account");
        });
    }
    isLoginFailed() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.page.url().includes("index.php?rt=account/login");
        });
    }
    forgetYourLogin(lastname, email) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.page.getByRole("link", { name: "Forgot your login?" }).click();
            yield (0, test_1.expect)(this.page).toHaveTitle("Forgot Your Login Name?");
            (0, test_1.expect)(this.page).toHaveURL("/index.php?rt=account/forgotten/loginname");
            yield this.page.locator("#forgottenFrm_lastname").fill(lastname);
            yield this.page.locator("#forgottenFrm_email").fill(email);
            yield this.page.getByTitle("Continue").click();
            yield (0, test_1.expect)(this.page.locator(".alert")).toContainText("Success: Your login name reminder has been sent to your e-mail address.");
        });
    }
    forgetYourPassword(username, email) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.page
                .getByRole("link", { name: "Forgot your password?" })
                .click();
            // Validate page title and URL
            yield (0, test_1.expect)(this.page).toHaveTitle("Forgot Your Password?");
            yield (0, test_1.expect)(this.page).toHaveURL("/index.php?rt=account/forgotten/password");
            // Fill form fields
            yield this.page.locator("#forgottenFrm_loginname").fill(username);
            yield this.page.locator("#forgottenFrm_email").fill(email);
            // Submit form
            yield this.page.getByTitle("Continue").click();
            // Handle success & failure cases
            yield (0, test_1.expect)(this.page.locator(".alert")).toContainText("The Email address was not provided or not found in our records, please try again!");
        });
    }
}
exports.LoginPage = LoginPage;
