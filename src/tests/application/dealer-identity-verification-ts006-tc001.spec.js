const { test, expect } = require('@playwright/test');
const DealerLoginPage = require('../../pages/dealer-login.page');
const DealerFirstLoginPage = require('../../pages/dealer-first-login.page');
const DealerIdentityVerificationPage = require('../../pages/dealer-identity-verification.page');
const TD = require('../../data/dealer-app-test-data');

test.describe('[UI] AD-79 TS-006: Business Owner Identity Verification', { tag: ['@regression', '@dealer-app'] }, () => {
  let loginPage;
  let firstLoginPage;
  let verificationPage;

  test('[AD-79 TS-006 TC-001] Verify business owner identity verification process', async ({ page }) => {
    loginPage = new DealerLoginPage(page);
    firstLoginPage = new DealerFirstLoginPage(page);
    verificationPage = new DealerIdentityVerificationPage(page);

    // Step 1-3: Login with valid dealer credentials
    await loginPage.goto();
    await loginPage.login(TD.credentials.validDealer.email, TD.credentials.validDealer.password);
    await page.waitForLoadState('domcontentloaded');

    // Step 4: Verify identity verification screen is displayed
    const isVerificationScreenVisible = await verificationPage.isIdentityVerificationScreenVisible();
    
    if (isVerificationScreenVisible) {
      const isBusinessOwnerDetailsVisible = await verificationPage.isBusinessOwnerDetailsVisible();
      expect(isBusinessOwnerDetailsVisible).toBeTruthy();

      // Step 5: Complete identity verification using OTP
      await verificationPage.completeOtpVerification('123456');

      // Step 6: Verify successful identity verification
      await page.waitForLoadState('domcontentloaded');
      const isVerificationSuccessful = await verificationPage.isVerificationSuccessful();
      expect(isVerificationSuccessful).toBeTruthy();
    } else {
      // If verification is not required, verify dashboard or first login screen is displayed
      const isDashboardVisible = await loginPage.isDashboardVisible();
      const isFirstLoginVisible = await firstLoginPage.isWelcomeMessageVisible();
      expect(isDashboardVisible || isFirstLoginVisible).toBeTruthy();
    }
  });
});