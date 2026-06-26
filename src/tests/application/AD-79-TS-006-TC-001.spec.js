const { test, expect } = require('../../fixtures');
const DealerAppLoginPage = require('../../pages/DealerAppLoginPage');
const DealerAppFirstLoginPage = require('../../pages/DealerAppFirstLoginPage');
const DealerAppIdentityVerificationPage = require('../../pages/DealerAppIdentityVerificationPage');
const TD = require('../../data/dealerApp-test-data');

test.describe('[UI] AD-79 TS-006: Identity Verification After Acknowledgement', { tag: ['@smoke', '@regression', '@dealer-app'] }, () => {
  let loginPage;
  let firstLoginPage;
  let identityVerificationPage;

  test('[AD-79 TS-006 TC-001] Test Case 1: Verify identity verification flow after acknowledgement', async ({ page }) => {
    loginPage = new DealerAppLoginPage(page);
    firstLoginPage = new DealerAppFirstLoginPage(page);
    identityVerificationPage = new DealerAppIdentityVerificationPage(page);

    // Step 1: Complete first-time login authentication
    await loginPage.goto();
    await loginPage.login(TD.credentials.firstTimeUser.email, TD.credentials.firstTimeUser.password);

    // Step 2: Check acknowledgement and click Continue
    await firstLoginPage.checkAcknowledgement();
    await firstLoginPage.clickContinue();

    // Step 3: Verify Identity Verification screen
    const isIdentityScreenDisplayed = await identityVerificationPage.isIdentityVerificationScreenDisplayed();
    expect(isIdentityScreenDisplayed).toBe(true);

    await expect(page).toHaveURL(TD.urlPatterns.identityVerification);

    // Step 4: Enter verification credentials
    await identityVerificationPage.fillOwnerName(TD.identityVerification.ownerName);
    await identityVerificationPage.fillIdNumber(TD.identityVerification.idNumber);

    // Step 5: Submit verification
    await identityVerificationPage.submitVerification();

    // Verify successful verification (dashboard or success message)
    await page.waitForLoadState('networkidle', { timeout: 30000 });
  });
});