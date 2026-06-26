const { test, expect } = require('../../fixtures');
const DealerLoginPage = require('../../pages/dealer-login.page');
const TD = require('../../data/dealer-app-test-data');

test.describe('[UI] AD-79 TS-001: Dealer Login - Invalid Password', { tag: ['@regression'] }, () => {
  let loginPage;

  test('[AD-79 TS-001 TC-003] Verify login failure with invalid password', async ({ page }) => {
    loginPage = new DealerLoginPage(page);

    // Step 1: Launch the Dealer App
    await loginPage.goto(TD.urls.dealerApp);
    await expect(page).toHaveURL(new RegExp(TD.urls.dealerApp));

    // Step 2: Enter valid email address
    await loginPage.enterEmail(TD.credentials.invalidPassword.email);
    await expect(loginPage.page.locator('input[type="email"]')).toHaveValue(TD.credentials.invalidPassword.email);

    // Step 3: Enter invalid password
    await loginPage.enterPassword(TD.credentials.invalidPassword.password);
    await expect(loginPage.page.locator('input[type="password"]')).toHaveAttribute('type', 'password');

    // Step 4: Click on the Login button
    await loginPage.clickLoginButton();
    await page.waitForLoadState('domcontentloaded');

    // Verify error message is displayed
    const isErrorVisible = await loginPage.isErrorMessageVisible();
    expect(isErrorVisible).toBeTruthy();
    await expect(loginPage.page.locator('.error-message, .alert-danger, [role="alert"]')).toBeVisible();
  });
});