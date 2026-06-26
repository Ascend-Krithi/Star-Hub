const { test, expect } = require('../../fixtures');
const DealerAppLoginPage = require('../../pages/DealerAppLoginPage');
const DealerAppDashboardPage = require('../../pages/DealerAppDashboardPage');
const TD = require('../../data/dealerApp-test-data');

test.describe('[UI] AD-79 TS-001: Dealer Authentication and Login', { tag: ['@smoke', '@regression', '@dealer-app'] }, () => {
  let loginPage;
  let dashboardPage;

  test('[AD-79 TS-001 TC-001] Test Case 1: Verify successful dealer login with valid credentials', async ({ page }) => {
    loginPage = new DealerAppLoginPage(page);
    dashboardPage = new DealerAppDashboardPage(page);

    // Step 2: Launch the Dealer App
    await loginPage.goto();
    await expect(page).toHaveURL(TD.urlPatterns.login);
    const isLoginScreenDisplayed = await loginPage.isLoginScreenDisplayed();
    expect(isLoginScreenDisplayed).toBe(true);

    // Step 3: Enter valid email address
    await loginPage.fillEmail(TD.credentials.validDealer.email);
    const emailField = await page.locator('input[type="email"]').or(page.locator('[data-testid="email-input"]')).first();
    await expect(emailField).toHaveValue(TD.credentials.validDealer.email);

    // Step 4: Enter valid password
    await loginPage.fillPassword(TD.credentials.validDealer.password);
    const isPasswordMasked = await loginPage.isPasswordMasked();
    expect(isPasswordMasked).toBe(true);

    // Step 5: Click on the Login button
    await loginPage.clickLogin();
    await expect(page).toHaveURL(TD.urlPatterns.dashboard);

    // Step 6: Verify dashboard and service access
    const isDashboardDisplayed = await dashboardPage.isDashboardDisplayed();
    expect(isDashboardDisplayed).toBe(true);

    const canAccessServices = await dashboardPage.canAccessServices();
    expect(canAccessServices).toBe(true);

    const canAccessManagement = await dashboardPage.canAccessManagementOptions();
    expect(canAccessManagement).toBe(true);
  });
});