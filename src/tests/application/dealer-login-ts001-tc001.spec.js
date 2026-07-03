const { test, expect } = require('@playwright/test');
const DealerLoginPage = require('../../pages/dealer-login.page');
const TD = require('../../data/dealer-app-test-data');

test.describe('[UI] AD-79 TS-001: Dealer Login - Valid Credentials', { tag: ['@smoke', '@regression', '@dealer-app'] }, () => {
  let loginPage;

  test('[AD-79 TS-001 TC-001] Verify dealer can login with valid credentials', async ({ page }) => {
    loginPage = new DealerLoginPage(page);

    // Step 1-2: Launch the Dealer App URL
    await loginPage.goto();
    await expect(page).toHaveURL(TD.urlPatterns.login);

    // Step 3: Enter valid email address
    await loginPage.fillEmail(TD.credentials.validDealer.email);
    const emailValue = await loginPage.getEmailFieldValue();
    expect(emailValue).toBe(TD.credentials.validDealer.email);

    // Step 4: Enter valid password
    await loginPage.fillPassword(TD.credentials.validDealer.password);
    const isPasswordMasked = await loginPage.isPasswordMasked();
    expect(isPasswordMasked).toBeTruthy();

    // Step 5: Click on Login button
    await loginPage.clickLogin();

    // Step 6: Verify successful login
    await page.waitForLoadState('domcontentloaded');
    const isDashboardVisible = await loginPage.isDashboardVisible();
    const isWelcomeVisible = await loginPage.isWelcomeMessageVisible();
    expect(isDashboardVisible || isWelcomeVisible).toBeTruthy();
  });
});