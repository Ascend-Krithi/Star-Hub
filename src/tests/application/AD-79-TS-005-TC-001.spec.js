const { test, expect } = require('../../fixtures');
const DealerAppLoginPage = require('../../pages/DealerAppLoginPage');
const DealerAppFirstLoginPage = require('../../pages/DealerAppFirstLoginPage');
const TD = require('../../data/dealerApp-test-data');

test.describe('[UI] AD-79 TS-005: Acknowledgement and Continue CTA', { tag: ['@smoke', '@regression', '@dealer-app'] }, () => {
  let loginPage;
  let firstLoginPage;

  test('[AD-79 TS-005 TC-001] Test Case 1: Verify Continue CTA enables after checking acknowledgement', async ({ page }) => {
    loginPage = new DealerAppLoginPage(page);
    firstLoginPage = new DealerAppFirstLoginPage(page);

    // Step 1: Complete first-time login authentication
    await loginPage.goto();
    await loginPage.login(TD.credentials.firstTimeUser.email, TD.credentials.firstTimeUser.password);

    // Step 2: Verify initial state - Continue button disabled
    const isInitiallyDisabled = await firstLoginPage.isContinueButtonDisabled();
    expect(isInitiallyDisabled).toBe(true);

    // Step 3: Check acknowledgement checkbox
    await firstLoginPage.checkAcknowledgement();
    const isChecked = await firstLoginPage.isAcknowledgementChecked();
    expect(isChecked).toBe(true);

    // Step 4: Verify Continue button is now enabled
    const isEnabled = await firstLoginPage.isContinueButtonEnabled();
    expect(isEnabled).toBe(true);
  });
});