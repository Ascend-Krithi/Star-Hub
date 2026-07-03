const { test, expect } = require('../../fixtures');
const DealerAppLoginPage = require('../../pages/dealer-app-login.page');
const DealerAppBusinessProfilePage = require('../../pages/dealer-app-business-profile.page');
const TD = require('../../data/dealer-app-test-data');

test.describe('[UI] AD-79 TS-005: Acknowledgement Checkbox', { tag: ['@regression', '@dealer-app'] }, () => {
  let loginPage;
  let businessProfilePage;

  test('[AD-79 TS-005 TC-001] Verify Continue button enabled after checking acknowledgement', async ({ page }) => {
    loginPage = new DealerAppLoginPage(page);
    businessProfilePage = new DealerAppBusinessProfilePage(page);

    // Step 1-2: Login with first-time dealer credentials
    await loginPage.goto();
    await loginPage.login(TD.credentials.firstTimeDealer.email, TD.credentials.firstTimeDealer.password);
    await page.waitForURL(TD.urlPatterns.businessProfile, { timeout: 10000 });

    // Step 3: Verify Continue button state without checking acknowledgement
    const continueDisabled = !(await businessProfilePage.isContinueButtonEnabled());
    expect(continueDisabled).toBe(true);

    // Step 4: Check the acknowledgement checkbox
    await businessProfilePage.checkAcknowledgement();
    const isChecked = await businessProfilePage.isAcknowledgementChecked();
    expect(isChecked).toBe(true);

    // Step 5: Verify Continue button is enabled
    const continueEnabled = await businessProfilePage.isContinueButtonEnabled();
    expect(continueEnabled).toBe(true);
  });
});