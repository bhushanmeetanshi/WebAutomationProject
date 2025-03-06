import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/loginPage";
import testData from "../data/testData.json";
import { takeScreenshot } from "../utils/helpers";

test.describe("Login Tests", () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page); // Create a new instance before each test
    await loginPage.gotoLoginPage();
  });
  test.afterEach(async ({ page }) => {
    await page.close();
  });

  testData.forEach(({ username, password }, index) => {
    test.skip(`Login test ${index + 1}: ${username}`, async ({ page }) => {
      await loginPage.login(username, password);

      if (await loginPage.isLoginSuccessful()) {
        console.log(`✅ Login successful for ${username}`);
      } else {
        console.log(`❌ Login failed for ${username}`);
        await takeScreenshot(page, `failed_login_${username}`);
      }

      await expect(page).toHaveTitle("My Account");
    });
  });

  test("Login test with invalid credentials", async ({ page }) => {
    await loginPage.login("bhushanyopmail", "invalid@123");
    await expect(page.locator(".alert")).toContainText(
      "Error: Incorrect login or password provided."
    );
    await takeScreenshot(page, "failed_login_invalid");
  });

  test.skip("Login test with Blank Scenario", async ({ page }) => {
    const username: string = "";
  
    const formattedUsername = username.trim() === "" ? "null user" : username;
    await loginPage.login(" ", " ");
    if (await loginPage.isLoginFailed()) {
      console.log(`❌ Login is not successful for ${formattedUsername}`);
      await expect(page.locator(".alert")).toContainText(
        "Error: Incorrect login or password provided."
      );
    } else {
      console.log(`✅ Login is successful for ${username}`);
      await takeScreenshot(page, `failed_login_${username}`);
    }
  });
  test.skip("Forget Login ID - Valid User", async ({ page }) => {
    const lastname = testData[0].lastname ?? "";
    const email = testData[0].email ?? "";
    const message = testData[0].message ?? " ";
    return await loginPage.forgetYourLogin(lastname, email, message);
  });
  test.skip("Forget Login ID - Invalid User", async ({ page }) => {
    const lastname = testData[1].lastname ?? "";
    const email = testData[1].email ?? "";
    const message = testData[1].message ?? " ";
    return await loginPage.forgetYourLogin(lastname, email, message);
  });

  test.skip("Forget Login ID - Blank Scenario", async ({ page }) => {
    const lastname = testData[2].lastname ?? "";
    const email = testData[2].email ?? "";
    const message = testData[2].message ?? " ";
    return await loginPage.forgetYourLogin(lastname, email, message);
  });

  test.skip("Forget Login Password - Valid User", async ({ page }) => {
    const username = testData[0].username ?? "";
    const email = testData[0].email ?? "";
    const message = testData[0].message ?? " ";
    return await loginPage.forgetYourLogin(username, email, message);
  });
  test("Forget Login Password - Invalid User", async ({ page }) => {
    const username = testData[1].username ?? "";
    const email = testData[1].email ?? "";
    const message = testData[1].message ?? " ";
    return await loginPage.forgetYourLogin(username, email, message);
  });
  test("Forget Login Password - Blank User", async ({ page }) => {
    const username = testData[2].username ?? " ";
    const email = testData[2].email ?? " ";
    const message = testData[2].message ?? " ";  test("Login with - Blank User", async ({ page }) => {
      const username = testData[2].username ?? " ";
      const password = testData[2].password ?? " ";
      const message = testData[2].message ?? " ";
      await loginPage.isLoginFailed();
    });
    return await loginPage.forgetYourPassword(username, email, message);
  });
  test("Login with - Blank User", async ({ page }) => {
    const username = testData[2].username ?? " ";
    const password = testData[2].password ?? " ";
    const message = testData[2].message ?? "";
    await loginPage.login(username, password);
    await expect(page.locator(".alert")).toContainText(message);
  });
});
