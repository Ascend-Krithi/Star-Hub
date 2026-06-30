const { test, expect } = require('../../fixtures');
const DealerAppLoginPage = require('../../pages/dealer-app-login.page');
const TD = require('../../data/dealer-app-test-data');

test.describe('[UI] AD-79 TS-001: Dealer Login - Invalid Email', { tag: ['@regression', '@dealer-app'] }, () => {
  let loginPage;

  test('[AD-79 TS-001 TC-002] Verify login failure with invalid email', async ({ page }) => {
    loginPage = new DealerAppLoginPage(page);

    // Step 2: Launch the Dealer App URL
    await loginPage.goto();
    await expect(page).toHaveURL(TD.urlPatterns.login);

    // Step 3: Enter invalid email address
    await loginPage.enterEmail(TD.credentials.invalidEmailDealer.email);

    // Step 4: Enter valid password
    await loginPage.enterPassword(TD.credentials.invalidEmailDealer.password);
    await expect(await loginPage.isPasswordMasked()).toBe(true);

    // Step 5: Click on Login button
    await loginPage.clickLoginButton();
    await page.waitForTimeout(2000);

    // Step 6: Verify login failure
    await expect(await loginPage.isErrorMessageVisible()).toBe(true);
    const errorText = await loginPage.getErrorMessage();
    expect(errorText).toContain(TD.messages.invalidCredentials);
    await expect(page).toHaveURL(TD.urlPatterns.login);
  });
});