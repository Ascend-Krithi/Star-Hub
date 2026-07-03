const { test, expect } = require('@playwright/test');
const DealerLoginPage = require('../../pages/dealer-login.page');
const TD = require('../../data/dealer-app-test-data');

test.describe('[UI] AD-79 TS-001: Dealer Login - Invalid Email', { tag: ['@regression', '@dealer-app'] }, () => {
  let loginPage;

  test('[AD-79 TS-001 TC-002] Verify login fails with invalid email', async ({ page }) => {
    loginPage = new DealerLoginPage(page);

    // Step 1-2: Launch the Dealer App URL
    await loginPage.goto();
    await expect(page).toHaveURL(TD.urlPatterns.login);

    // Step 3: Enter invalid email address
    await loginPage.fillEmail(TD.credentials.invalidDealer.email);

    // Step 4: Enter valid password
    await loginPage.fillPassword(TD.credentials.invalidDealer.password);
    const isPasswordMasked = await loginPage.isPasswordMasked();
    expect(isPasswordMasked).toBeTruthy();

    // Step 5: Click on Login button
    await loginPage.clickLogin();

    // Step 6: Verify error message is displayed
    const isErrorVisible = await loginPage.isErrorMessageVisible();
    expect(isErrorVisible).toBeTruthy();
    
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain(TD.messages.invalidCredentials);

    // Verify dealer remains on login page
    await expect(page).toHaveURL(TD.urlPatterns.login);
  });
});