const { test, expect } = require('../../fixtures');
const DealerAppLoginPage = require('../../pages/dealer-app-login.page');
const DealerAppDashboardPage = require('../../pages/dealer-app-dashboard.page');
const TD = require('../../data/dealer-app-test-data');

test.describe('[UI] AD-79 TS-007: Role-Based Access - Admin Role', { tag: ['@regression', '@dealer-app'] }, () => {
  let loginPage;
  let dashboardPage;

  test('[AD-79 TS-007 TC-001] Verify Admin role has full access to all features', async ({ page }) => {
    loginPage = new DealerAppLoginPage(page);
    dashboardPage = new DealerAppDashboardPage(page);

    // Step 1: Launch the Dealer App URL
    await loginPage.goto();

    // Step 2: Login with Admin credentials
    await loginPage.login(TD.credentials.adminDealer.email, TD.credentials.adminDealer.password);
    await page.waitForURL(TD.urlPatterns.dashboard, { timeout: 10000 });

    // Step 3: Verify dashboard loads with Admin features
    await expect(await dashboardPage.isDashboardVisible()).toBe(true);
    const adminFeatures = await dashboardPage.verifyAdminFeatures();

    // Step 4-5: Verify all admin features are accessible
    expect(adminFeatures.userManagement).toBe(true);
    expect(adminFeatures.reports).toBe(true);
    expect(adminFeatures.settings).toBe(true);
    expect(adminFeatures.allServices).toBe(true);
  });
});