const { test, expect } = require('@playwright/test');
const DealerLoginPage = require('../../pages/dealer-login.page');
const DealerDashboardPage = require('../../pages/dealer-dashboard.page');
const TD = require('../../data/dealer-app-test-data');

test.describe('[UI] AD-79 TS-008: Session Management - 23 Hours Inactivity', { tag: ['@regression', '@dealer-app'] }, () => {
  let loginPage;
  let dashboardPage;

  test.skip('[AD-79 TS-008 TC-002] Verify session is active within 24-hour window after 23 hours inactivity', async ({ page }) => {
    loginPage = new DealerLoginPage(page);
    dashboardPage = new DealerDashboardPage(page);

    // Step 1-2: Login with valid dealer credentials
    await loginPage.goto();
    await loginPage.login(TD.credentials.validDealer.email, TD.credentials.validDealer.password);
    await page.waitForLoadState('domcontentloaded');

    // Step 3: Leave application idle for 23 hours (simulated with shorter timeout for testing)
    // Note: In real scenario, this would be 23 hours. For testing, use shorter duration.
    await page.waitForTimeout(5000); // Simulated inactivity

    // Step 4: Perform an action after inactivity
    await dashboardPage.performActivity('Click menu item');

    // Step 5: Verify session is still active
    const isDashboardVisible = await dashboardPage.isDashboardVisible();
    expect(isDashboardVisible).toBeTruthy();
  });
});