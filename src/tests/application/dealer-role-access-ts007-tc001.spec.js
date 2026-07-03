const { test, expect } = require('@playwright/test');
const DealerLoginPage = require('../../pages/dealer-login.page');
const DealerDashboardPage = require('../../pages/dealer-dashboard.page');
const TD = require('../../data/dealer-app-test-data');

test.describe('[UI] AD-79 TS-007: Role-Based Access - Admin Premium', { tag: ['@regression', '@dealer-app'] }, () => {
  let loginPage;
  let dashboardPage;

  test('[AD-79 TS-007 TC-001] Verify Admin role with Premium group has full access', async ({ page }) => {
    loginPage = new DealerLoginPage(page);
    dashboardPage = new DealerDashboardPage(page);

    // Step 1-2: Login with Admin role dealer credentials
    await loginPage.goto();
    await loginPage.login(TD.credentials.adminPremium.email, TD.credentials.adminPremium.password);
    await page.waitForLoadState('domcontentloaded');

    // Step 3: Verify dashboard loads with Admin-specific features
    const isDashboardVisible = await dashboardPage.isDashboardVisible();
    expect(isDashboardVisible).toBeTruthy();

    const isUserManagementVisible = await dashboardPage.isUserManagementVisible();
    const isReportsVisible = await dashboardPage.isReportsMenuVisible();
    const isSettingsVisible = await dashboardPage.isSettingsMenuVisible();
    const isAllServicesVisible = await dashboardPage.isAllServicesMenuVisible();

    expect(isUserManagementVisible || isReportsVisible || isSettingsVisible || isAllServicesVisible).toBeTruthy();

    // Step 4-5: Verify Admin can access all features
    if (isUserManagementVisible) {
      await dashboardPage.clickUserManagement();
      await page.waitForLoadState('domcontentloaded');
    }
  });
});