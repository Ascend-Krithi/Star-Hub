const { test, expect } = require('../../fixtures');
const DealerLoginPage = require('../../pages/dealer-login.page');
const TD = require('../../data/dealer-app-test-data');

test.describe('[UI] AD-79 TS-005: Acknowledgement - Continue Button State', { tag: ['@regression'] }, () => {
  let loginPage;

  test('[AD-79 TS-005 TC-001] Verify Continue button is disabled initially and enabled after acknowledgement', async ({ page }) => {
    loginPage = new DealerLoginPage(page);

    // Step 1: Launch and login with first-time credentials
    await loginPage.goto(TD.urls.dealerApp);
    await loginPage.login(TD.credentials.firstTimeLogin.email, TD.credentials.firstTimeLogin.password);
    await page.waitForLoadState('domcontentloaded');

    // Step 2: Verify Continue button is initially disabled
    const isInitiallyEnabled = await loginPage.isContinueButtonEnabled();
    expect(isInitiallyEnabled).toBeFalsy();

    // Step 3: Check acknowledgement checkbox
    await loginPage.checkAcknowledgement();
    const isChecked = await loginPage.isAcknowledgementChecked();
    expect(isChecked).toBeTruthy();

    // Step 4: Verify Continue button is now enabled
    await page.waitForTimeout(500);
    const isEnabledAfterCheck = await loginPage.isContinueButtonEnabled();
    expect(isEnabledAfterCheck).toBeTruthy();
  });
});