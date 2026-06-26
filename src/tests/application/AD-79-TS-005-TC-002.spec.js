const { test, expect } = require('../../fixtures');
const DealerAppLoginPage = require('../../pages/DealerAppLoginPage');
const DealerAppFirstLoginPage = require('../../pages/DealerAppFirstLoginPage');
const TD = require('../../data/dealerApp-test-data');

test.describe('[UI] AD-79 TS-005: Acknowledgement and Continue CTA', { tag: ['@regression', '@dealer-app'] }, () => {
  let loginPage;
  let firstLoginPage;

  test('[AD-79 TS-005 TC-002] Test Case 2: Verify error message when unchecking acknowledgement', async ({ page }) => {
    loginPage = new DealerAppLoginPage(page);
    firstLoginPage = new DealerAppFirstLoginPage(page);

    // Step 1: Complete first-time login authentication
    await loginPage.goto();
    await loginPage.login(TD.credentials.firstTimeUser.email, TD.credentials.firstTimeUser.password);

    // Step 2: Check acknowledgement checkbox
    await firstLoginPage.checkAcknowledgement();
    const isChecked = await firstLoginPage.isAcknowledgementChecked();
    expect(isChecked).toBe(true);

    const isEnabled = await firstLoginPage.isContinueButtonEnabled();
    expect(isEnabled).toBe(true);

    // Step 3: Uncheck acknowledgement checkbox
    await firstLoginPage.uncheckAcknowledgement();
    const isUnchecked = await firstLoginPage.isAcknowledgementChecked();
    expect(isUnchecked).toBe(false);

    // Step 4: Verify inline error message
    const isErrorVisible = await firstLoginPage.isInlineErrorVisible();
    expect(isErrorVisible).toBe(true);

    const errorMessage = await firstLoginPage.getInlineError();
    expect(errorMessage).toContain(TD.messages.acknowledgementError);

    // Step 5: Verify Continue button is disabled
    const isDisabled = await firstLoginPage.isContinueButtonDisabled();
    expect(isDisabled).toBe(true);
  });
});