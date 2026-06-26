const { test, expect } = require('../../fixtures');
const DealerLoginPage = require('../../pages/dealer-login.page');
const TD = require('../../data/dealer-app-test-data');

test.describe('[UI] AD-79 TS-006: Identity Verification Flow', { tag: ['@regression'] }, () => {
  let loginPage;

  test('[AD-79 TS-006 TC-001] Verify identity verification screen after acknowledgement', async ({ page }) => {
    loginPage = new DealerLoginPage(page);

    // Step 1: Launch and login with first-time credentials
    await loginPage.goto(TD.urls.dealerApp);
    await loginPage.login(TD.credentials.firstTimeLogin.email, TD.credentials.firstTimeLogin.password);
    await page.waitForLoadState('domcontentloaded');

    // Step 2: Check acknowledgement and click Continue
    await loginPage.checkAcknowledgement();
    await loginPage.clickContinueButton();
    await page.waitForLoadState('domcontentloaded');

    // Step 3: Verify Identity Verification screen is displayed
    const isVerificationScreenVisible = await loginPage.isIdentityVerificationScreenVisible();
    expect(isVerificationScreenVisible).toBeTruthy();
    await expect(loginPage.page.locator('.identity-verification, [data-testid="identity-verification"]')).toBeVisible();

    // Step 4: Enter business owner verification credentials
    await loginPage.enterOwnerName(TD.identityVerification.ownerName);
    await loginPage.enterIdNumber(TD.identityVerification.idNumber);

    // Step 5: Submit identity verification
    await loginPage.submitIdentityVerification();
    await page.waitForLoadState('domcontentloaded');
  });
});