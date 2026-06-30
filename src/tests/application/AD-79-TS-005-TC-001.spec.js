const { test, expect } = require('../../fixtures');
const DealerAppLoginPage = require('../../pages/dealer-app-login.page');
const DealerAppFirstLoginPage = require('../../pages/dealer-app-first-login.page');
const TD = require('../../data/dealer-app-test-data');

test.describe('[UI] AD-79 TS-005: First Login - Acknowledgement Checkbox Enable', { tag: ['@regression', '@dealer-app'] }, () => {
  let loginPage;
  let firstLoginPage;

  test('[AD-79 TS-005 TC-001] Verify Continue button is enabled after checking acknowledgement', async ({ page }) => {
    loginPage = new DealerAppLoginPage(page);
    firstLoginPage = new DealerAppFirstLoginPage(page);

    // Step 1: Launch and login
    await loginPage.goto();
    await loginPage.login(TD.credentials.firstTimeDealer.email, TD.credentials.firstTimeDealer.password);
    await page.waitForURL(TD.urlPatterns.firstLogin, { timeout: 10000 });

    // Step 3: Verify Continue button is disabled without checkbox
    await expect(await firstLoginPage.isContinueButtonEnabled()).toBe(false);

    // Step 4: Check the acknowledgement checkbox
    await firstLoginPage.checkAcknowledgement();
    await expect(await firstLoginPage.isAcknowledgementChecked()).toBe(true);

    // Step 5: Verify Continue button is enabled
    await expect(await firstLoginPage.isContinueButtonEnabled()).toBe(true);
  });
});