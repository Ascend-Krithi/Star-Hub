const { test, expect } = require('../../fixtures');
const DealerAppLoginPage = require('../../pages/dealer-app-login.page');
const TD = require('../../data/dealer-app-test-data');

test.describe('[UI] AD-79 TS-001: Dealer Login', { tag: ['@smoke', '@regression', '@dealer-app'] }, () => {
  let loginPage;

  test('[AD-79 TS-001 TC-003] Verify login failure with invalid password', async ({ page }) => {
    loginPage = new DealerAppLoginPage(page);

    // Step 1-2: Launch the Dealer App URL
    await loginPage.goto();
    await expect(page).toHaveURL(TD.urlPatterns.login);

    // Step 3: Enter valid email address
    await loginPage.enterEmail(TD.credentials.wrongPassword.email);
    const emailField = await page.locator('[data-testid="email-input"]');
    await expect(emailField).toHaveValue(TD.credentials.wrongPassword.email);

    // Step 4: Enter invalid password
    await loginPage.enterPassword(TD.credentials.wrongPassword.password);
    const passwordMasked = await loginPage.isPasswordMasked();
    expect(passwordMasked).toBe(true);

    // Step 5: Click on the Login button
    await loginPage.clickLogin();

    // Step 6: Verify login failure
    const errorVisible = await loginPage.isErrorMessageVisible();
    expect(errorVisible).toBe(true);
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain(TD.messages.invalidCredentials);
    await expect(page).toHaveURL(TD.urlPatterns.login);
  });
});