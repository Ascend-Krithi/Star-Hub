const { test, expect } = require('../../fixtures');
const DealerAppLoginPage = require('../../pages/dealer-app-login.page');
const DealerAppFirstLoginPage = require('../../pages/dealer-app-first-login.page');
const TD = require('../../data/dealer-app-test-data');

test.describe('[UI] AD-79 TS-005: First Login - Acknowledgement Checkbox Uncheck Error', { tag: ['@regression', '@dealer-app'] }, () => {
  let loginPage;
  let firstLoginPage;

  test('[AD-79 TS-005 TC-002] Verify error message when unchecking acknowledgement', async ({ page }) => {
    loginPage = new DealerAppLoginPage(page);
    firstLoginPage = new DealerAppFirstLoginPage(page);

    // Step 1-2: Launch and login
    await loginPage.goto();
    await loginPage.login(TD.credentials.firstTimeDealer.email, TD.credentials.firstTimeDealer.password);
    await page.waitForURL(TD.urlPatterns.firstLogin, { timeout: 10000 });

    // Step 3: Check the acknowledgement checkbox
    await firstLoginPage.checkAcknowledgement();
    await expect(await firstLoginPage.isContinueButtonEnabled()).toBe(true);

    // Step 4: Uncheck the acknowledgement checkbox
    await firstLoginPage.uncheckAcknowledgement();
    await expect(await firstLoginPage.isAcknowledgementChecked()).toBe(false);

    // Step 5: Verify inline error message
    await page.waitForTimeout(1000);
    await expect(await firstLoginPage.isInlineErrorVisible()).toBe(true);
    const errorText = await firstLoginPage.getInlineErrorText();
    expect(errorText).toContain(TD.messages.acknowledgementError);

    // Step 6: Verify Continue button is disabled
    await expect(await firstLoginPage.isContinueButtonEnabled()).toBe(false);
  });
});