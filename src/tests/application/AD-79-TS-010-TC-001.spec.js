const { test, expect } = require('../../fixtures');
const DealerAppLoginPage = require('../../pages/dealer-app-login.page');
const DealerAppDashboardPage = require('../../pages/dealer-app-dashboard.page');
const TD = require('../../data/dealer-app-test-data');

test.describe('[UI] AD-79 TS-010: Security Invalidation', { tag: ['@regression', '@dealer-app'] }, () => {
  let loginPage;
  let dashboardPage;

  test('[AD-79 TS-010 TC-001] Verify session invalidated on security event', async ({ page }) => {
    loginPage = new DealerAppLoginPage(page);
    dashboardPage = new DealerAppDashboardPage(page);

    // Step 1-2: Login on Device 1
    await loginPage.goto();
    await loginPage.login(TD.credentials.validDealer.email, TD.credentials.validDealer.password);
    await page.waitForURL(TD.urlPatterns.dashboard, { timeout: 10000 });

    // Step 3: Trigger security event (simulated by clearing cookies/session)
    await page.context().clearCookies();

    // Step 4: Attempt to perform an action
    await page.goto(TD.urls.dashboard);

    // Step 5: Verify session is invalidated
    await expect(page).toHaveURL(TD.urlPatterns.login);
    const sessionInvalidatedVisible = await dashboardPage.isSessionExpiredMessageVisible();
    if (sessionInvalidatedVisible) {
      const sessionMessage = await dashboardPage.getSessionExpiredMessage();
      expect(sessionMessage).toContain(TD.messages.sessionInvalidated);
    }

    // Step 6: Login with new credentials
    await loginPage.login(TD.credentials.validDealer.email, 'NewSecurePass456!');
    await page.waitForURL(TD.urlPatterns.dashboard, { timeout: 10000 });
    const dashboardVisible = await dashboardPage.isDashboardVisible();
    expect(dashboardVisible).toBe(true);
  });
});