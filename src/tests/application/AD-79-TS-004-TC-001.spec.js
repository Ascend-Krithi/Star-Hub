const { test, expect } = require('../../fixtures');
const DealerAppLoginPage = require('../../pages/dealer-app-login.page');
const TD = require('../../data/dealer-app-test-data');

test.describe('[UI] AD-79 TS-004: Acknowledgement Checkbox and Continue Button State', { tag: ['@regression', '@dealer-app'] }, () => {
  let loginPage;

  test('[AD-79 TS-004 TC-001] Verify Continue button state based on acknowledgement checkbox', async ({ page }) => {
    loginPage = new DealerAppLoginPage(page);

    // Step 1: Launch the Dealer App URL in a browser
    await loginPage.goto(TD.urls.dealerApp);
    await expect(page).toHaveURL(TD.urlPatterns.login);

    // Step 2: Enter valid email address for first-time login
    await loginPage.enterEmail(TD.credentials.validDealer.email);
    const emailField = page.locator('input[type="email"], input[name="email"], #email').first();
    await expect(emailField).toHaveValue(TD.credentials.validDealer.email);

    // Step 3: Enter valid password
    await loginPage.enterPassword(TD.credentials.validDealer.password);
    const passwordField = page.locator('input[type="password"], input[name="password"], #password').first();
    await expect(passwordField).toHaveAttribute('type', 'password');

    // Step 4: Click on the Login button
    await loginPage.clickLogin();
    await page.waitForLoadState('networkidle', { timeout: 15000 });

    // Step 5: Verify the Continue CTA button state without checking acknowledgement checkbox
    const isButtonEnabledBefore = await loginPage.isContinueButtonEnabled();
    expect(isButtonEnabledBefore).toBeFalsy();

    // Step 6: Check the acknowledgement checkbox
    await loginPage.checkAcknowledgement();
    const isChecked = await loginPage.isAcknowledgementChecked();
    expect(isChecked).toBeTruthy();

    // Step 7: Verify the Continue CTA button state after checking acknowledgement checkbox
    const isButtonEnabledAfter = await loginPage.isContinueButtonEnabled();
    expect(isButtonEnabledAfter).toBeTruthy();
  });
});