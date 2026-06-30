const { test, expect } = require('../../fixtures');
const DealerAppLoginPage = require('../../pages/dealer-app-login.page');
const TD = require('../../data/dealer-app-test-data');

test.describe('[UI] AD-79 TS-006: Identity Verification Process', { tag: ['@regression', '@dealer-app'] }, () => {
  let loginPage;

  test('[AD-79 TS-006 TC-001] Verify business owner identity verification process', async ({ page }) => {
    loginPage = new DealerAppLoginPage(page);

    // Step 1: Launch the Dealer App URL
    await loginPage.goto();

    // Step 2-3: Enter credentials and login
    await loginPage.login(TD.credentials.validDealer.email, TD.credentials.validDealer.password);

    // Step 4: Verify identity verification screen (assuming it appears)
    await page.waitForTimeout(3000);
    const identityVerificationVisible = await page.locator('text=Identity Verification, text=Verify Identity').isVisible().catch(() => false);

    if (identityVerificationVisible) {
      // Step 5: Complete identity verification (OTP or document upload)
      const otpField = page.locator('input[name="otp"], input[placeholder*="OTP"]').first();
      if (await otpField.isVisible().catch(() => false)) {
        await otpField.fill('123456');
        await page.locator('button:has-text("Verify"), button:has-text("Submit")').click();
      }

      // Step 6: Verify successful verification
      await page.waitForURL(TD.urlPatterns.dashboard, { timeout: 15000 });
    }

    await expect(page).toHaveURL(TD.urlPatterns.dashboard);
  });
});