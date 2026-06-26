const { test, expect } = require('../../fixtures');
const DealerAppLoginPage = require('../../pages/DealerAppLoginPage');
const TD = require('../../data/dealerApp-test-data');

test.describe('[UI] AD-79 TS-001: Dealer Authentication and Login', { tag: ['@regression', '@dealer-app'] }, () => {
  let loginPage;

  test('[AD-79 TS-001 TC-002] Test Case 2: Verify login failure with invalid email', async ({ page }) => {
    loginPage = new DealerAppLoginPage(page);

    // Step 1: Launch the Dealer App
    await loginPage.goto();
    await expect(page).toHaveURL(TD.urlPatterns.login);
    const isLoginScreenDisplayed = await loginPage.isLoginScreenDisplayed();
    expect(isLoginScreenDisplayed).toBe(true);

    // Step 2: Enter invalid email address
    await loginPage.fillEmail(TD.credentials.invalidEmail.email);
    const emailField = await page.locator('input[type="email"]').or(page.locator('[data-testid="email-input"]')).first();
    await expect(emailField).toHaveValue(TD.credentials.invalidEmail.email);

    // Step 3: Enter valid password
    await loginPage.fillPassword(TD.credentials.invalidEmail.password);
    const isPasswordMasked = await loginPage.isPasswordMasked();
    expect(isPasswordMasked).toBe(true);

    // Step 4: Click on the Login button
    await loginPage.clickLogin();

    // Verify error message is displayed
    const isErrorVisible = await loginPage.isErrorMessageVisible();
    expect(isErrorVisible).toBe(true);

    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage.toLowerCase()).toContain(TD.messages.invalidCredentials);

    // Verify still on login page
    await expect(page).toHaveURL(TD.urlPatterns.login);
  });
});