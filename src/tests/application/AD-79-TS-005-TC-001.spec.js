const { test, expect } = require('../../fixtures');
const DealerAppLoginPage = require('../../pages/dealer-app-login.page');
const TD = require('../../data/dealer-app-test-data');

test.describe('[UI] AD-79 TS-005: Acknowledgement Unchecked Error Validation', { tag: ['@regression', '@dealer-app'] }, () => {
  let loginPage;

  test('[AD-79 TS-005 TC-001] Verify inline error message when acknowledgement is unchecked', async ({ page }) => {
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

    // Step 5: Check the acknowledgement checkbox
    await loginPage.checkAcknowledgement();
    const isChecked = await loginPage.isAcknowledgementChecked();
    expect(isChecked).toBeTruthy();

    // Step 6: Uncheck the acknowledgement checkbox
    await loginPage.uncheckAcknowledgement();
    const isUnchecked = await loginPage.isAcknowledgementChecked();
    expect(isUnchecked).toBeFalsy();

    // Step 7: Verify inline error message is displayed
    await page.waitForTimeout(1000);
    const isErrorVisible = await loginPage.isInlineErrorVisible();
    expect(isErrorVisible).toBeTruthy();
    
    const errorText = await loginPage.getInlineErrorText();
    expect(errorText).toContain(TD.messages.acknowledgementError);

    // Step 8: Verify Continue button state after unchecking
    const isButtonEnabled = await loginPage.isContinueButtonEnabled();
    expect(isButtonEnabled).toBeFalsy();
  });
});