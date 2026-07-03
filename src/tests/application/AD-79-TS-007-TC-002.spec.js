const { test, expect } = require('../../fixtures');
const DealerAppLoginPage = require('../../pages/dealer-app-login.page');
const DealerAppDashboardPage = require('../../pages/dealer-app-dashboard.page');
const TD = require('../../data/dealer-app-test-data');

test.describe('[UI] AD-79 TS-007: Role-Based Access Control', { tag: ['@regression', '@dealer-app'] }, () => {
  let loginPage;
  let dashboardPage;

  test('[AD-79 TS-007 TC-002] Verify Sales role has limited access', async ({ page }) => {
    loginPage = new DealerAppLoginPage(page);
    dashboardPage = new DealerAppDashboardPage(page);

    // Step 1-2: Login with Sales role credentials
    await loginPage.goto();
    await loginPage.login(TD.credentials.salesStandard.email, TD.credentials.salesStandard.password);
    await page.waitForURL(TD.urlPatterns.dashboard, { timeout: 10000 });

    // Step 3: Verify dashboard loads with Sales-specific limited features
    const dashboardVisible = await dashboardPage.isDashboardVisible();
    expect(dashboardVisible).toBe(true);
    const customerMgmtVisible = await dashboardPage.isCustomerManagementVisible();
    expect(customerMgmtVisible).toBe(true);
    const ordersVisible = await dashboardPage.isOrdersVisible();
    expect(ordersVisible).toBe(true);
    const reportsVisible = await dashboardPage.isReportsVisible();
    expect(reportsVisible).toBe(true);

    // Step 4: Attempt to access restricted features
    const userMgmtVisible = await dashboardPage.isUserManagementVisible();
    expect(userMgmtVisible).toBe(false);
    const settingsVisible = await dashboardPage.isSettingsVisible();
    expect(settingsVisible).toBe(false);

    // Step 5: Verify Sales role has limited access
    for (const feature of TD.roles.sales.features) {
      await dashboardPage.navigateToMenu(feature);
      await page.waitForTimeout(1000);
    }
  });
});