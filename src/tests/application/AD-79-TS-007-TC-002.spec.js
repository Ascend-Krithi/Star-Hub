const { test, expect } = require('../../fixtures');
const DealerAppLoginPage = require('../../pages/dealer-app-login.page');
const DealerAppDashboardPage = require('../../pages/dealer-app-dashboard.page');
const TD = require('../../data/dealer-app-test-data');

test.describe('[UI] AD-79 TS-007: Role-Based Access - Sales Role', { tag: ['@regression', '@dealer-app'] }, () => {
  let loginPage;
  let dashboardPage;

  test('[AD-79 TS-007 TC-002] Verify Sales role has limited access', async ({ page }) => {
    loginPage = new DealerAppLoginPage(page);
    dashboardPage = new DealerAppDashboardPage(page);

    // Step 1: Launch the Dealer App URL
    await loginPage.goto();

    // Step 2: Login with Sales credentials
    await loginPage.login(TD.credentials.salesDealer.email, TD.credentials.salesDealer.password);
    await page.waitForURL(TD.urlPatterns.dashboard, { timeout: 10000 });

    // Step 3: Verify dashboard loads with Sales features only
    await expect(await dashboardPage.isDashboardVisible()).toBe(true);
    const salesFeatures = await dashboardPage.verifySalesFeatures();

    expect(salesFeatures.customerManagement).toBe(true);
    expect(salesFeatures.orders).toBe(true);

    // Step 4: Verify restricted features are not accessible
    expect(await dashboardPage.isUserManagementVisible()).toBe(false);
    expect(await dashboardPage.isSettingsVisible()).toBe(false);
  });
});