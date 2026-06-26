const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../../pages/dealer-app/login-page');
const { FirstLoginPage } = require('../../../pages/dealer-app/first-login-page');
const testData = require('../../../data/dealer-app-test-data');

test.describe('AD-79 TS-002 - First-Time Dealer Login Tests', () => {
  let loginPage;
  let firstLoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    firstLoginPage = new FirstLoginPage(page);
    await loginPage.navigate();
  });

  test('TC-001: First-time dealer login with welcome message and business profile fields', async ({ page }) => {
    // Step 1-2: Launch and enter first-time email
    await loginPage.enterEmail(testData.firstTimeCredentials.email);

    // Step 3: Enter password
    await loginPage.enterPassword(testData.firstTimeCredentials.password);

    // Step 4: Click login
    await loginPage.clickLogin();

    // Step 5: Verify welcome message
    await expect(firstLoginPage.welcomeMessage).toBeVisible();
    await expect(firstLoginPage.welcomeMessage).toContainText('Welcome to Dealer App!');

    // Step 6: Verify Business Name field
    await expect(firstLoginPage.businessNameField).toBeVisible();
    await expect(firstLoginPage.businessNameField).toContainText('ABC Dealers');

    // Step 7: Verify Registration number field
    await expect(firstLoginPage.registrationNumberField).toBeVisible();
    await expect(firstLoginPage.registrationNumberField).toContainText('REG12345');

    // Step 8: Verify GST Registration number field
    await expect(firstLoginPage.gstNumberField).toBeVisible();
    await expect(firstLoginPage.gstNumberField).toContainText('GST67890');
  });
});