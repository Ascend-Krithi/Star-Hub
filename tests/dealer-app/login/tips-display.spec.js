const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../../pages/dealer-app/login-page');
const { FirstLoginPage } = require('../../../pages/dealer-app/first-login-page');
const testData = require('../../../data/dealer-app-test-data');

test.describe('AD-79 TS-004 - Tips Display Tests', () => {
  let loginPage;
  let firstLoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    firstLoginPage = new FirstLoginPage(page);
    await loginPage.navigate();
    await loginPage.loginAsFirstTime();
  });

  test('TC-001: Tips for correcting information displayed on first login screen', async ({ page }) => {
    // Step 2: Scroll to tips section
    await firstLoginPage.tipsSection.scrollIntoViewIfNeeded();

    // Step 3: Verify tips are displayed
    await expect(firstLoginPage.tipsSection).toBeVisible();
    await expect(firstLoginPage.tipsSection).toContainText('Contact support');
    await expect(firstLoginPage.tipsSection).toContainText('settings menu');
  });
});