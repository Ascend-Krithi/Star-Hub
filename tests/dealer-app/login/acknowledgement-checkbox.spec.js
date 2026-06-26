const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../../pages/dealer-app/login-page');
const { FirstLoginPage } = require('../../../pages/dealer-app/first-login-page');
const testData = require('../../../data/dealer-app-test-data');

test.describe('AD-79 TS-005 - Acknowledgement Checkbox Tests', () => {
  let loginPage;
  let firstLoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    firstLoginPage = new FirstLoginPage(page);
    await loginPage.navigate();
    await loginPage.loginAsFirstTime();
  });

  test('TC-001: First login acknowledgement checkbox enables Continue CTA', async ({ page }) => {
    // Step 2: Verify Continue button is initially disabled
    await expect(firstLoginPage.continueButton).toBeDisabled();

    // Step 3: Check acknowledgement checkbox
    await firstLoginPage.acknowledgementCheckbox.check();
    await expect(firstLoginPage.acknowledgementCheckbox).toBeChecked();

    // Step 4: Verify Continue button is enabled
    await expect(firstLoginPage.continueButton).toBeEnabled();
  });

  test('TC-002: Unchecking acknowledgement checkbox shows inline error and disables Continue', async ({ page }) => {
    // Step 2: Check the checkbox
    await firstLoginPage.acknowledgementCheckbox.check();
    await expect(firstLoginPage.continueButton).toBeEnabled();

    // Step 3: Uncheck the checkbox
    await firstLoginPage.acknowledgementCheckbox.uncheck();

    // Step 4: Verify inline error message
    await expect(firstLoginPage.inlineError).toBeVisible();
    await expect(firstLoginPage.inlineError).toContainText('Please acknowledge the information on this page');

    // Step 5: Verify Continue button is disabled
    await expect(firstLoginPage.continueButton).toBeDisabled();
  });
});