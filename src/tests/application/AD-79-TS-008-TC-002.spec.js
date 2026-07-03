const { test, expect } = require('../../fixtures');
const DealerAppLoginPage = require('../../pages/dealer-app-login.page');
const DealerAppDashboardPage = require('../../pages/dealer-app-dashboard.page');
const TD = require('../../data/dealer-app-test-data');

test.describe('[UI] AD-79 TS-008: Session Management - Active Session', { tag: ['@regression', '@dealer-app'] }, () => {
  let loginPage;
  let dashboardPage;

  test('[AD-79 TS-008 TC-002] Verify session active within 24-hour window after inactivity', async ({ page }) => {
    loginPage = new DealerAppLoginPage(page);
    dashboardPage = new DealerAppDashboardPage(page);

    // Step 1-2: Login with valid credentials
    await loginPage.goto();
    await loginPage.login(TD.credentials.validDealer.email, TD.credentials.validDealer.password);
    await page.waitForURL(TD.urlPatterns.dashboard, { timeout: 10000 });

    // Step 3: Leave the application idle (simulated with shorter duration)
    await page.waitForTimeout(5000);

    // Step 4: Perform an action after inactivity
    await dashboardPage.navigateToMenu('Orders');

    // Step 5: Verify session is still active
    const dashboardVisible = await dashboardPage.isDashboardVisible();
    expect(dashboardVisible).toBe(true);
    await expect(page).toHaveURL(/dashboard/);
  });
});