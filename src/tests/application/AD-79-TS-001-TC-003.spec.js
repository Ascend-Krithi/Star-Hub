const { test, expect } = require('../../fixtures');
const DealerAppLoginPage = require('../../pages/dealer-app-login.page');
const TD = require('../../data/dealer-app-test-data');

test.describe('[UI] AD-79 TS-001: Dealer Login - Invalid Password', { tag: ['@regression', '@dealer-app'] }, () => {
  let loginPage;

  test('[AD-79 TS-001 TC-003] Verify login failure with invalid password', async ({ page }) => {
    loginPage = new DealerAppLoginPage(page);

    // Step 2: Launch the Dealer App URL
    await loginPage.goto();
    await expect(page).toHaveURL(TD.urlPatterns.login);

    // Step 3: Enter valid email address
    await loginPage.enterEmail(TD.credentials.invalidPasswordDealer.email);
    await expect(await loginPage.isEmailDisplayed()).toBe(true);

    // Step 4: Enter invalid password
    await loginPage.enterPassword(TD.credentials.invalidPasswordDealer.password);
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