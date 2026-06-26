const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../../pages/dealer-app/login-page');
const { FirstLoginPage } = require('../../../pages/dealer-app/first-login-page');
const { IdentityVerificationPage } = require('../../../pages/dealer-app/identity-verification-page');
const testData = require('../../../data/dealer-app-test-data');

test.describe('AD-79 TS-006 - Identity Verification Tests', () => {
  let loginPage;
  let firstLoginPage;
  let identityVerificationPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    firstLoginPage = new FirstLoginPage(page);
    identityVerificationPage = new IdentityVerificationPage(page);
    await loginPage.navigate();
    await loginPage.loginAsFirstTime();
  });

  test('TC-001: First login identity verification flow and screen', async ({ page }) => {
    // Step 2: Check acknowledgement and click Continue
    await firstLoginPage.acknowledgementCheckbox.check();
    await firstLoginPage.continueButton.click();

    // Step 3: Verify Identity Verification screen
    await expect(identityVerificationPage.verificationScreen).toBeVisible();
    await expect(identityVerificationPage.ownerNameField).toBeVisible();

    // Step 4: Enter verification credentials
    await identityVerificationPage.ownerNameField.fill('John Doe');
    await identityVerificationPage.idNumberField.fill('ID123456');

    // Step 5: Submit verification
    await identityVerificationPage.submitButton.click();
    await expect(page).toHaveURL(/dashboard/);
  });
});