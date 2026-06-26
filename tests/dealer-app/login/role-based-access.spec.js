const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../../pages/dealer-app/login-page');
const { DashboardPage } = require('../../../pages/dealer-app/dashboard-page');
const testData = require('../../../data/dealer-app-test-data');

test.describe('AD-79 TS-007 - Role and Group Based Access Tests', () => {
  let loginPage;
  let dashboardPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    await loginPage.navigate();
  });

  test('TC-001: Role and group based access for Admin-Premium vs User-Standard', async ({ page }) => {
    // Step 2: Login with Admin Premium credentials
    await loginPage.enterEmail(testData.adminPremium.email);
    await loginPage.enterPassword(testData.adminPremium.password);
    await loginPage.clickLogin();

    // Step 3: Verify premium features accessible
    await expect(dashboardPage.advancedAnalytics).toBeVisible();
    await expect(dashboardPage.userManagement).toBeVisible();
    await expect(dashboardPage.adminControls).toBeVisible();

    // Step 4: Logout
    await dashboardPage.logout();
    await expect(page).toHaveURL(/login/);

    // Step 5: Login with User Standard credentials
    await loginPage.enterEmail(testData.userStandard.email);
    await loginPage.enterPassword(testData.userStandard.password);
    await loginPage.clickLogin();

    // Step 6: Verify limited features
    await expect(dashboardPage.basicServices).toBeVisible();
    await expect(dashboardPage.userManagement).not.toBeVisible();
    await expect(dashboardPage.adminControls).not.toBeVisible();

    // Step 7: Compare feature availability
    const standardFeatures = await dashboardPage.getVisibleFeatures();
    expect(standardFeatures.length).toBeLessThan(10);
  });
});