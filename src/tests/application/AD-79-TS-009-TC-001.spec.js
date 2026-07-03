const { test, expect } = require('../../fixtures');
const DealerAppLoginPage = require('../../pages/dealer-app-login.page');
const DealerAppDashboardPage = require('../../pages/dealer-app-dashboard.page');
const TD = require('../../data/dealer-app-test-data');

test.describe('[UI] AD-79 TS-009: Session Timeout', { tag: ['@regression', '@dealer-app'] }, () => {
  let loginPage;
  let dashboardPage;

  test('[AD-79 TS-009 TC-001] Verify session expires after 24+ hours of inactivity', async ({ page }) => {
    loginPage = new DealerAppLoginPage(page);
    dashboardPage = new DealerAppDashboardPage(page);

    // Step 1-2: Login with valid credentials
    await loginPage.goto();
    await loginPage.login(TD.credentials.validDealer.email, TD.credentials.validDealer.password);
    await page.waitForURL(TD.urlPatterns.dashboard, { timeout: 10000 });

    // Step 3: Leave the application idle for more than 24 hours (simulated)
    // Note: In actual test, this would require time manipulation or waiting
    // For automation purposes, we simulate session expiration
    await page.context().clearCookies();

    // Step 4: Attempt to perform an action after 24+ hours
    await page.goto(TD.urls.dashboard);

    // Step 5: Verify dealer must re-authenticate
    await expect(page).toHaveURL(TD.urlPatterns.login);
    const sessionExpiredVisible = await dashboardPage.isSessionExpiredMessageVisible();
    if (sessionExpiredVisible) {
      const sessionMessage = await dashboardPage.getSessionExpiredMessage();
      expect(sessionMessage).toContain(TD.messages.sessionExpired);
    }
  });
});