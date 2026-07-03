const { test, expect } = require('../../fixtures');
const DealerAppLoginPage = require('../../pages/dealer-app-login.page');
const DealerAppBusinessProfilePage = require('../../pages/dealer-app-business-profile.page');
const DealerAppIdentityVerificationPage = require('../../pages/dealer-app-identity-verification.page');
const TD = require('../../data/dealer-app-test-data');

test.describe('[UI] AD-79 TS-006: Business Owner Identity Verification', { tag: ['@regression', '@dealer-app'] }, () => {
  let loginPage;
  let businessProfilePage;
  let identityVerificationPage;

  test('[AD-79 TS-006 TC-001] Verify business owner identity verification process', async ({ page }) => {
    loginPage = new DealerAppLoginPage(page);
    businessProfilePage = new DealerAppBusinessProfilePage(page);
    identityVerificationPage = new DealerAppIdentityVerificationPage(page);

    // Step 1-2: Launch the Dealer App URL
    await loginPage.goto();

    // Step 3: Click on Login button
    await loginPage.login(TD.credentials.validDealer.email, TD.credentials.validDealer.password);

    // Step 4: Verify identity verification screen is displayed
    await page.waitForURL(TD.urlPatterns.identityVerification, { timeout: 10000 });
    const verificationScreenVisible = await identityVerificationPage.isIdentityVerificationScreenVisible();
    expect(verificationScreenVisible).toBe(true);
    const businessOwner = await identityVerificationPage.getBusinessOwnerName();
    expect(businessOwner).toContain('Jane Smith');

    // Step 5: Complete identity verification using OTP
    await identityVerificationPage.completeVerification('OTP', '123456');

    // Step 6: Verify successful identity verification
    await page.waitForURL(TD.urlPatterns.dashboard, { timeout: 10000 });
    const verificationSuccess = await identityVerificationPage.isVerificationSuccessful();
    expect(verificationSuccess).toBe(true);
  });
});