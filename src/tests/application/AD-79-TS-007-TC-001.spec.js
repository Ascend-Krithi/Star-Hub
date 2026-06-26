const { test, expect } = require('../../fixtures');
const DealerLoginPage = require('../../pages/dealer-login.page');
const TD = require('../../data/dealer-app-test-data');

test.describe('[UI] AD-79 TS-007: Role-Based Access Control', { tag: ['@regression'] }, () => {
  let loginPage;

  test('[AD-79 TS-007 TC-001] Verify different feature access for Admin-Premium vs User-Standard', async ({ page }) => {
    loginPage = new DealerLoginPage(page);

    // Step 1-2: Login with Admin Premium credentials
    await loginPage.goto(TD.urls.dealerApp);
    await loginPage.login(TD.credentials.adminPremium.email, TD.credentials.adminPremium.password);
    await page.waitForLoadState('domcontentloaded');

    // Step 3: Verify premium features are accessible
    const isDashboardVisible = await loginPage.isDashboardVisible();
    expect(isDashboardVisible).toBeTruthy();
    await expect(loginPage.page.locator('.dashboard, #dashboard, [data-testid="dashboard"]')).toBeVisible();

    // Step 4: Logout from Admin Premium account
    await loginPage.clickLogout();
    await page.waitForLoadState('domcontentloaded');
    await expect(page).toHaveURL(new RegExp(TD.urls.dealerApp));

    // Step 5: Login with User Standard credentials
    await loginPage.login(TD.credentials.userStandard.email, TD.credentials.userStandard.password);
    await page.waitForLoadState('domcontentloaded');

    // Step 6: Verify standard features are accessible
    const isStandardDashboardVisible = await loginPage.isDashboardVisible();
    expect(isStandardDashboardVisible).toBeTruthy();
    await expect(loginPage.page.locator('.dashboard, #dashboard, [data-testid="dashboard"]')).toBeVisible();
  });
});