import { expect, Page } from "@playwright/test";

export class LoginPage {
  constructor(private page: Page) {}

  async gotoLoginPage() {
    await this.page.goto("/");
    await this.page.getByRole("link", { name: "Account" }).hover();
    const loginLink = this.page.getByRole("link", { name: "Account" });
    await loginLink.click();
  }

  async login(username: string, password: string) {
    await this.page.locator("#loginFrm_loginname").fill(username);
    await this.page.locator("#loginFrm_password").fill(password);
    await this.page.getByTitle("Login").click();
  }

  async isLoginSuccessful() {
    return this.page.url().includes("index.php?rt=account/account");
  }
  async isLoginFailed() {
    return this.page.url().includes("index.php?rt=account/login");
  }
  async forgetYourLogin(lastname: string, email: string, message: string) {
    await this.page.getByRole("link", { name: "Forgot your login?" }).click();
    await expect(this.page).toHaveTitle("Forgot Your Login Name?");
    expect(this.page).toHaveURL("/index.php?rt=account/forgotten/loginname");
    await this.page.locator("#forgottenFrm_lastname").fill(lastname);
    await this.page.locator("#forgottenFrm_email").fill(email);
    await this.page.getByTitle("Continue").click();
    await expect(this.page.locator(".alert")).toContainText(message);
  }
  async forgetYourPassword(username: string, email: string, message: string) {
    await this.page
      .getByRole("link", { name: "Forgot your password?" })
      .click();

    // Validate page title and URL
    await expect(this.page).toHaveTitle("Forgot Your Password?");
    await expect(this.page).toHaveURL(
      "/index.php?rt=account/forgotten/password"
    );

    // Fill form fields
    await this.page.locator("#forgottenFrm_loginname").fill(username);
    await this.page.locator("#forgottenFrm_email").fill(email);

    // Submit form
    await this.page.getByTitle("Continue").click();

    // Handle success & failure cases
    await expect(this.page.locator(".alert")).toContainText(message);
  }
}
