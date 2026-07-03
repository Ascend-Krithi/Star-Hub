const { test, expect } = require('../../fixtures');
const DealerAppLoginPage = require('../../pages/dealer-app-login.page');
const DealerAppDashboardPage = require('../../pages/dealer-app-dashboard.page');
const TD = require('../../data/dealer-app-test-data');

test.describe('[UI] AD-79 TS-007: Role-Based Access Control', { tag: ['@regression', '@dealer-app'] }, () => {
  let loginPage;
  let dashboardPage;

  test('[AD-79 TS-007 TC-001] Verify Admin role has full access to all features', async ({ page }) => {
    loginPage = new DealerAppLoginPage(page);
    dashboardPage = new DealerAppDashboardPage(page);

    // Step 1-2: Login with Admin role credentials
    await loginPage.goto();
    await loginPage.login(TD.credentials.adminPremium.email, TD.credentials.adminPremium.password);
    await page.waitForURL(TD.urlPatterns.dashboard, { timeout: 10000 });

    // Step 3: Verify dashboard loads with Admin-specific features
    const dashboardVisible = await dashboardPage.isDashboardVisible();
    expect(dashboardVisible).toBe(true);
    const userMgmtVisible = await dashboardPage.isUserManagementVisible();
    expect(userMgmtVisible).toBe(true);
    const reportsVisible = await dashboardPage.isReportsVisible();
    expect(reportsVisible).toBe(true);
    const settingsVisible = await dashboardPage.isSettingsVisible();
    expect(settingsVisible).toBe(true);
    const servicesVisible = await dashboardPage.isServicesVisible();
    expect(servicesVisible).toBe(true);

    // Step 4-5: Navigate through available menu options
    for (const feature of TD.roles.admin.features) {
      await dashboardPage.navigateToMenu(feature);
      await page.waitForTimeout(1000);
    }
  });
});