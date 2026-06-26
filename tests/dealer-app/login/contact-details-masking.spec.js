const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../../pages/dealer-app/login-page');
const { FirstLoginPage } = require('../../../pages/dealer-app/first-login-page');
const testData = require('../../../data/dealer-app-test-data');

test.describe('AD-79 TS-003 - Contact Details Masking Tests', () => {
  let loginPage;
  let firstLoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    firstLoginPage = new FirstLoginPage(page);
    await loginPage.navigate();
    await loginPage.loginAsFirstTime();
  });

  test('TC-001: Masking of contact details on first login contact details section', async ({ page }) => {
    // Step 2: Navigate to Contact Details section
    await expect(firstLoginPage.contactDetailsSection).toBeVisible();

    // Step 3: Verify Contact Person name
    await expect(firstLoginPage.contactPersonField).toBeVisible();
    await expect(firstLoginPage.contactPersonField).toContainText('John Doe');

    // Step 4: Verify Mobile number masking
    const mobileText = await firstLoginPage.mobileNumberField.textContent();
    expect(mobileText).toMatch(/\*{6}1234/);

    // Step 5: Verify Email masking
    const emailText = await firstLoginPage.emailField.textContent();
    expect(emailText).toMatch(/j\*+n@e\*+e\.com/);
  });
});