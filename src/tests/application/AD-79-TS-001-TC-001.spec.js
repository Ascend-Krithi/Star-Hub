const { test, expect } = require('../../fixtures');
const DealerAppLoginPage = require('../../pages/dealer-app-login.page');
const TD = require('../../data/dealer-app-test-data');

test.describe('[UI] AD-79 TS-001: Dealer Login', { tag: ['@smoke', '@regression', '@dealer-app'] }, () => {
  let loginPage;

  test('[AD-79 TS-001 TC-001] Verify successful login with valid credentials', async ({ page }) => {
    loginPage = new DealerAppLoginPage(page);

    // Step 1-2: Launch the Dealer App URL
    await loginPage.goto();
    await expect(page).toHaveURL(TD.urlPatterns.login);

    // Step 3: Enter valid email address
    await loginPage.enterEmail(TD.credentials.validDealer.email);
    const emailField = await page.locator('[data-testid="email-input"]');
    await expect(emailField).toHaveValue(TD.credentials.validDealer.email);

    // Step 4: Enter valid password
    await loginPage.enterPassword(TD.credentials.validDealer.password);
    const passwordMasked = await loginPage.isPasswordMasked();
    expect(passwordMasked).toBe(true);

    // Step 5: Click on the Login button
    await loginPage.clickLogin();

    // Step 6: Verify successful login
    await page.waitForURL(TD.urlPatterns.dashboard, { timeout: 10000 });
    const dashboardVisible = await loginPage.isDashboardVisible();
    expect(dashboardVisible).toBe(true);
  });
});