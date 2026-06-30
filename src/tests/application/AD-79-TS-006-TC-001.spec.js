const { test, expect } = require('../../fixtures');
const DealerAppLoginPage = require('../../pages/dealer-app-login.page');
const loc = require('../../pages/locators/dealer-app-login.locators');
const TD = require('../../data/dealer-app-test-data');

test.describe('[UI] AD-79 TS-006: Role-Based Access Control Verification', { tag: ['@regression', '@dealer-app'] }, () => {
  let loginPage;

  test('[AD-79 TS-006 TC-001] Verify role-based access for Admin, Manager, and Sales roles', async ({ page }) => {
    loginPage = new DealerAppLoginPage(page);

    // Admin Role Testing
    // Step 1-4: Login as Admin
    await loginPage.goto(TD.urls.dealerApp);
    await loginPage.enterEmail(TD.credentials.adminRole.email);
    await loginPage.enterPassword(TD.credentials.adminRole.password);
    await loginPage.clickLogin();
    await page.waitForLoadState('networkidle', { timeout: 15000 });

    // Step 5: Verify Admin role has access to all administrative features
    const isDashboardVisible = await loginPage.isDashboardVisible();
    expect(isDashboardVisible).toBeTruthy();
    
    const isUserMgmtVisible = await loginPage.isMenuItemVisible(loc.userManagementMenu);
    expect(isUserMgmtVisible).toBeTruthy();
    
    const isSystemSettingsVisible = await loginPage.isMenuItemVisible(loc.systemSettingsMenu);
    expect(isSystemSettingsVisible).toBeTruthy();
    
    const isReportsVisible = await loginPage.isMenuItemVisible(loc.reportsMenu);
    expect(isReportsVisible).toBeTruthy();

    // Step 6: Logout from Admin account
    await loginPage.clickLogout();
    await expect(page).toHaveURL(TD.urlPatterns.login);

    // Manager Role Testing
    // Step 7-9: Login as Manager
    await loginPage.enterEmail(TD.credentials.managerRole.email);
    await loginPage.enterPassword(TD.credentials.managerRole.password);
    await loginPage.clickLogin();
    await page.waitForLoadState('networkidle', { timeout: 15000 });

    // Step 10: Verify Manager role has limited access
    const isTeamReportsVisible = await loginPage.isMenuItemVisible(loc.teamReportsMenu);
    expect(isTeamReportsVisible).toBeTruthy();
    
    const isInventoryVisible = await loginPage.isMenuItemVisible(loc.inventoryManagementMenu);
    expect(isInventoryVisible).toBeTruthy();

    // Step 11: Logout from Manager account
    await loginPage.clickLogout();
    await expect(page).toHaveURL(TD.urlPatterns.login);

    // Sales Role Testing
    // Step 12-14: Login as Sales
    await loginPage.enterEmail(TD.credentials.salesRole.email);
    await loginPage.enterPassword(TD.credentials.salesRole.password);
    await loginPage.clickLogin();
    await page.waitForLoadState('networkidle', { timeout: 15000 });

    // Step 15: Verify Sales role has basic access
    const isCustomerMgmtVisible = await loginPage.isMenuItemVisible(loc.customerManagementMenu);
    expect(isCustomerMgmtVisible).toBeTruthy();
    
    const isSalesOrdersVisible = await loginPage.isMenuItemVisible(loc.salesOrdersMenu);
    expect(isSalesOrdersVisible).toBeTruthy();
  });
});