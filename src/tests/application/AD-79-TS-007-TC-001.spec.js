const { test, expect } = require('../../fixtures');
const DealerAppLoginPage = require('../../pages/DealerAppLoginPage');
const DealerAppDashboardPage = require('../../pages/DealerAppDashboardPage');
const TD = require('../../data/dealerApp-test-data');

test.describe('[UI] AD-79 TS-007: Role and Group-Based Feature Access', { tag: ['@smoke', '@regression', '@dealer-app'] }, () => {
  let loginPage;
  let dashboardPage;

  test('[AD-79 TS-007 TC-001] Test Case 1: Verify feature access based on role and group', async ({ page }) => {
    loginPage = new DealerAppLoginPage(page);
    dashboardPage = new DealerAppDashboardPage(page);

    // Step 2: Login with Admin Premium credentials
    await loginPage.goto();
    await loginPage.login(TD.credentials.adminPremium.email, TD.credentials.adminPremium.password);

    await expect(page).toHaveURL(TD.urlPatterns.dashboard);

    // Step 3: Verify premium features and admin controls
    const hasPremiumFeatures = await dashboardPage.hasPremiumFeatures();
    expect(hasPremiumFeatures).toBe(true);

    const hasAdminControls = await dashboardPage.hasAdminControls();
    expect(hasAdminControls).toBe(true);

    // Step 4: Logout from Admin Premium
    await loginPage.logout();
    await expect(page).toHaveURL(TD.urlPatterns.login);

    // Step 5: Login with User Standard credentials
    await loginPage.login(TD.credentials.userStandard.email, TD.credentials.userStandard.password);
    await expect(page).toHaveURL(TD.urlPatterns.dashboard);

    // Step 6: Verify only standard features accessible
    const hasStandardOnly = await dashboardPage.hasStandardFeaturesOnly();
    expect(hasStandardOnly).toBe(true);

    const noPremiumFeatures = await dashboardPage.hasPremiumFeatures();
    expect(noPremiumFeatures).toBe(false);

    const noAdminControls = await dashboardPage.hasAdminControls();
    expect(noAdminControls).toBe(false);
  });
});