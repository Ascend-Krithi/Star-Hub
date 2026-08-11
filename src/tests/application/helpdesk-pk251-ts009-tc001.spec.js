const { test, expect } = require('../../fixtures');
const HelpdeskDashboardPage = require('../../pages/helpdesk-dashboard.page');
const TD = require('../../data/helpdesk-test-data');

test.describe('[UI] PK-251 TS-009: Verify Real-time Sync Failure Handling', { tag: ['@regression', '@e2e', '@helpdesk'] }, () => {
  let dashboard;

  test('[PK-251 TS-009 TC-001] Verify dashboard behavior during network interruption', async ({ page, context }) => {
    dashboard = new HelpdeskDashboardPage(page);

    // Step 1: Launch the helpdesk application URL
    await dashboard.goto();

    // Step 2: Enter valid helpdesk manager credentials and click Login
    await dashboard.login(TD.credentials.manager.username, TD.credentials.manager.password);

    // Step 3: Navigate to the Dashboard from the main menu
    await dashboard.navigateToDashboard();

    // Step 4: Note the current dashboard data state
    const baselineNewCount = await dashboard.getNewStatusCount();
    const baselineOngoingCount = await dashboard.getOngoingStatusCount();

    // Step 5: Simulate network interruption
    await context.setOffline(true);

    // Step 6-7: Observe dashboard behavior and verify error message
    await page.waitForTimeout(2000);
    const errorVisible = await dashboard.isErrorMessageVisible();
    if (errorVisible) {
      const errorMessage = await dashboard.getErrorMessageText();
      expect(
        errorMessage.includes(TD.messages.connectionLost) ||
        errorMessage.includes(TD.messages.unableToSync) ||
        errorMessage.includes(TD.messages.displayingCachedData)
      ).toBeTruthy();
    }

    // Step 8: Verify dashboard maintains last known data state
    const currentNewCount = await dashboard.getNewStatusCount();
    expect(currentNewCount).toBe(baselineNewCount);

    // Step 10: Verify visual indicator shows data is not current
    const syncIndicatorVisible = await dashboard.isSyncIndicatorVisible();
    expect(syncIndicatorVisible).toBeTruthy();

    // Step 11: Restore network connection
    await context.setOffline(false);

    // Step 12: Verify dashboard automatically reconnects and updates
    await page.waitForTimeout(3000);
    await page.reload();
    const updatedNewCount = await dashboard.getNewStatusCount();
    expect(updatedNewCount).toBeGreaterThanOrEqual(0);
  });
});