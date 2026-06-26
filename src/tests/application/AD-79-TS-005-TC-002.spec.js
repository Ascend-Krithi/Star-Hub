const { test, expect } = require('../../fixtures');
const DealerLoginPage = require('../../pages/dealer-login.page');
const TD = require('../../data/dealer-app-test-data');

test.describe('[UI] AD-79 TS-005: Acknowledgement - Inline Error on Uncheck', { tag: ['@regression'] }, () => {
  let loginPage;

  test('[AD-79 TS-005 TC-002] Verify inline error message when acknowledgement is unchecked', async ({ page }) => {
    loginPage = new DealerLoginPage(page);

    // Step 1: Launch and login with first-time credentials
    await loginPage.goto(TD.urls.dealerApp);
    await loginPage.login(TD.credentials.firstTimeLogin.email, TD.credentials.firstTimeLogin.password);
    await page.waitForLoadState('domcontentloaded');

    // Step 2: Check acknowledgement checkbox
    await loginPage.checkAcknowledgement();
    const isChecked = await loginPage.isAcknowledgementChecked();
    expect(isChecked).toBeTruthy();

    // Step 3: Uncheck acknowledgement checkbox
    await loginPage.uncheckAcknowledgement();
    const isUnchecked = await loginPage.isAcknowledgementChecked();
    expect(isUnchecked).toBeFalsy();

    // Step 4: Verify inline error message is displayed
    await page.waitForTimeout(500);
    const isErrorVisible = await loginPage.isInlineErrorVisible();
    expect(isErrorVisible).toBeTruthy();
    await expect(loginPage.page.locator('.inline-error, .field-error, [data-testid="inline-error"]')).toBeVisible();

    // Step 5: Verify Continue button is disabled
    const isContinueEnabled = await loginPage.isContinueButtonEnabled();
    expect(isContinueEnabled).toBeFalsy();
  });
});