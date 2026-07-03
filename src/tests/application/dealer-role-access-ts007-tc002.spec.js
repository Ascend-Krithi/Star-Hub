const { test, expect } = require('@playwright/test');
const DealerLoginPage = require('../../pages/dealer-login.page');
const DealerDashboardPage = require('../../pages/dealer-dashboard.page');
const TD = require('../../data/dealer-app-test-data');

test.describe('[UI] AD-79 TS-007: Role-Based Access - Sales Standard', { tag: ['@regression', '@dealer-app'] }, () => {
  let loginPage;
  let dashboardPage;

  test('[AD-79 TS-007 TC-002] Verify Sales role with Standard group has limited access', async ({ page }) => {
    loginPage = new DealerLoginPage(page);
    dashboardPage = new DealerDashboardPage(page);

    // Step 1-2: Login with Sales role dealer credentials
    await loginPage.goto();
    await loginPage.login(TD.credentials.salesStandard.email, TD.credentials.salesStandard.password);
    await page.waitForLoadState('domcontentloaded');

    // Step 3: Verify dashboard loads with Sales-specific limited features
    const isDashboardVisible = await dashboardPage.isDashboardVisible();
    expect(isDashboardVisible).toBeTruthy();

    const isCustomerManagementVisible = await dashboardPage.isCustomerManagementVisible();
    const isOrdersVisible = await dashboardPage.isOrdersMenuVisible();
    const isReportsVisible = await dashboardPage.isReportsMenuVisible();

    expect(isCustomerManagementVisible || isOrdersVisible || isReportsVisible).toBeTruthy();

    // Step 4: Verify restricted features are not visible
    const isUserManagementVisible = await dashboardPage.isUserManagementVisible();
    const isSettingsVisible = await dashboardPage.isSettingsMenuVisible();

    expect(isUserManagementVisible).toBeFalsy();
    expect(isSettingsVisible).toBeFalsy();
  });
});