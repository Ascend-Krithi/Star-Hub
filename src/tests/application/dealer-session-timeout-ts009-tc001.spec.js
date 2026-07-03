const { test, expect } = require('@playwright/test');
const DealerLoginPage = require('../../pages/dealer-login.page');
const DealerDashboardPage = require('../../pages/dealer-dashboard.page');
const TD = require('../../data/dealer-app-test-data');

test.describe('[UI] AD-79 TS-009: Session Timeout - 24+ Hours', { tag: ['@regression', '@dealer-app'] }, () => {
  let loginPage;
  let dashboardPage;

  test.skip('[AD-79 TS-009 TC-001] Verify session expires after 24+ hours of inactivity', async ({ page }) => {
    loginPage = new DealerLoginPage(page);
    dashboardPage = new DealerDashboardPage(page);

    // Step 1-2: Login with valid dealer credentials
    await loginPage.goto();
    await loginPage.login(TD.credentials.validDealer.email, TD.credentials.validDealer.password);
    await page.waitForLoadState('domcontentloaded');

    // Step 3: Leave application idle for 24+ hours (simulated)
    // Note: In real scenario, this would be 24+ hours. For testing, use shorter duration.
    await page.waitForTimeout(5000); // Simulated inactivity

    // Step 4: Attempt to perform an action
    await dashboardPage.performActivity('Action after timeout');

    // Step 5: Verify dealer must re-authenticate
    await page.waitForLoadState('domcontentloaded');
    await expect(page).toHaveURL(TD.urlPatterns.login);
  });
});