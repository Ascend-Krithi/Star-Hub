const { test, expect } = require('@playwright/test');
const DealerLoginPage = require('../../pages/dealer-login.page');
const DealerFirstLoginPage = require('../../pages/dealer-first-login.page');
const TD = require('../../data/dealer-app-test-data');

test.describe('[UI] AD-79 TS-005: First-Time Login - Acknowledgement Checkbox Uncheck Error', { tag: ['@regression', '@dealer-app'] }, () => {
  let loginPage;
  let firstLoginPage;

  test('[AD-79 TS-005 TC-002] Verify error message when acknowledgement is unchecked', async ({ page }) => {
    loginPage = new DealerLoginPage(page);
    firstLoginPage = new DealerFirstLoginPage(page);

    // Step 1-2: Login with first-time dealer credentials
    await loginPage.goto();
    await loginPage.login(TD.credentials.firstTimeDealer.email, TD.credentials.firstTimeDealer.password);
    await page.waitForLoadState('domcontentloaded');

    // Step 3: Check the acknowledgement checkbox
    await firstLoginPage.checkAcknowledgement();
    const isChecked = await firstLoginPage.isAcknowledgementChecked();
    expect(isChecked).toBeTruthy();

    const isEnabledAfterCheck = await firstLoginPage.isContinueButtonEnabled();
    expect(isEnabledAfterCheck).toBeTruthy();

    // Step 4: Uncheck the acknowledgement checkbox
    await firstLoginPage.uncheckAcknowledgement();
    const isUnchecked = await firstLoginPage.isAcknowledgementChecked();
    expect(isUnchecked).toBeFalsy();

    // Step 5: Verify inline error message is displayed
    const isErrorVisible = await firstLoginPage.isInlineErrorVisible();
    expect(isErrorVisible).toBeTruthy();
    
    const errorText = await firstLoginPage.getInlineErrorText();
    expect(errorText).toContain(TD.messages.acknowledgementError);

    // Step 6: Verify Continue button is disabled again
    const isDisabledAfterUncheck = await firstLoginPage.isContinueButtonDisabled();
    expect(isDisabledAfterUncheck).toBeTruthy();
  });
});