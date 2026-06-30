const { test, expect } = require('../../fixtures');
const DealerAppLoginPage = require('../../pages/dealer-app-login.page');
const TD = require('../../data/dealer-app-test-data');

test.describe('[UI] AD-79 TS-001: Invalid Password Login Test', { tag: ['@regression', '@dealer-app'] }, () => {
  let loginPage;

  test('[AD-79 TS-001 TC-003] Verify error message is displayed for invalid password', async ({ page }) => {
    loginPage = new DealerAppLoginPage(page);

    // Step 1: Launch the Dealer App URL in a browser
    await loginPage.goto(TD.urls.dealerApp);
    await expect(page).toHaveURL(TD.urlPatterns.login);

    // Step 2: Enter valid email address in the email field
    await loginPage.enterEmail(TD.credentials.invalidPassword.email);
    const emailField = page.locator('input[type="email"], input[name="email"], #email').first();
    await expect(emailField).toHaveValue(TD.credentials.invalidPassword.email);

    // Step 3: Enter invalid password in the password field
    await loginPage.enterPassword(TD.credentials.invalidPassword.password);
    const passwordField = page.locator('input[type="password"], input[name="password"], #password').first();
    await expect(passwordField).toHaveAttribute('type', 'password');

    // Step 4: Click on the Login button
    await loginPage.clickLogin();
    await page.waitForTimeout(2000);
    
    // Verify error message is displayed indicating invalid credentials
    const isErrorVisible = await loginPage.isErrorMessageVisible();
    expect(isErrorVisible).toBeTruthy();
    
    const errorText = await loginPage.getErrorMessageText();
    expect(errorText).toMatch(TD.messages.invalidCredentials);
  });
});