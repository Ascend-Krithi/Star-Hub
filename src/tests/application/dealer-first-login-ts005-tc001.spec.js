const { test, expect } = require('@playwright/test');
const DealerLoginPage = require('../../pages/dealer-login.page');
const DealerFirstLoginPage = require('../../pages/dealer-first-login.page');
const TD = require('../../data/dealer-app-test-data');

test.describe('[UI] AD-79 TS-005: First-Time Login - Acknowledgement Checkbox Enable', { tag: ['@regression', '@dealer-app'] }, () => {
  let loginPage;
  let firstLoginPage;

  test('[AD-79 TS-005 TC-001] Verify Continue button is enabled after checking acknowledgement', async ({ page }) => {
    loginPage = new DealerLoginPage(page);
    firstLoginPage = new DealerFirstLoginPage(page);

    // Step 1-2: Login with first-time dealer credentials
    await loginPage.goto();
    await loginPage.login(TD.credentials.firstTimeDealer.email, TD.credentials.firstTimeDealer.password);
    await page.waitForLoadState('domcontentloaded');

    // Step 3: Verify Continue button is disabled without checking acknowledgement
    const isDisabledInitially = await firstLoginPage.isContinueButtonDisabled();
    expect(isDisabledInitially).toBeTruthy();

    // Step 4: Check the acknowledgement checkbox
    await firstLoginPage.checkAcknowledgement();
    const isChecked = await firstLoginPage.isAcknowledgementChecked();
    expect(isChecked).toBeTruthy();

    // Step 5: Verify Continue button is enabled after checking
    const isEnabledAfterCheck = await firstLoginPage.isContinueButtonEnabled();
    expect(isEnabledAfterCheck).toBeTruthy();
  });
});