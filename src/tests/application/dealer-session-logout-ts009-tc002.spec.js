const { test, expect } = require('@playwright/test');
const DealerLoginPage = require('../../pages/dealer-login.page');
const DealerDashboardPage = require('../../pages/dealer-dashboard.page');
const TD = require('../../data/dealer-app-test-data');

test.describe('[UI] AD-79 TS-009: Session Management - Logout', { tag: ['@smoke', '@regression', '@dealer-app'] }, () => {
  let loginPage;
  let dashboardPage;

  test('[AD-79 TS-009 TC-002] Verify dealer must re-authenticate after logout', async ({ page }) => {
    loginPage = new DealerLoginPage(page);
    dashboardPage = new DealerDashboardPage(page);

    // Step 1-2: Login with valid dealer credentials
    await loginPage.goto();
    await loginPage.login(TD.credentials.validDealer.email, TD.credentials.validDealer.password);
    await page.waitForLoadState('domcontentloaded');

    // Step 3: Click on Logout button
    await dashboardPage.clickLogout();
    await page.waitForLoadState('domcontentloaded');

    // Step 4: Verify redirected to login page
    await expect(page).toHaveURL(TD.urlPatterns.login);

    // Step 5: Attempt to access dashboard URL directly
    await page.goto(TD.urls.dashboard);
    await page.waitForLoadState('domcontentloaded');

    // Verify access is denied and redirected to login
    await expect(page).toHaveURL(TD.urlPatterns.login);
  });
});