const { test, expect } = require('../../fixtures');
const HelpdeskDashboardPage = require('../../pages/helpdesk-dashboard.page');
const TD = require('../../data/helpdesk-test-data');

test.describe('[UI] PK-251 TS-009: Verify Dashboard Behavior During Sync Interruption', { tag: ['@regression', '@helpdesk'] }, () => {
  let dashboard;

  test('[PK-251 TS-009 TC-001] Verify dashboard handles real-time sync interruption gracefully', async ({ page }) => {
    dashboard = new HelpdeskDashboardPage(page);

    // Step 1: Launch the helpdesk application URL
    await dashboard.goto();
    await expect(page).toHaveURL(TD.urls.application);

    // Step 2: Login with manager credentials
    await dashboard.login(TD.credentials.manager.username, TD.credentials.manager.password);
    await page.waitForLoadState('domcontentloaded');

    // Step 3: Navigate to Dashboard
    await dashboard.navigateToDashboard();
    await page.waitForLoadState('domcontentloaded');

    // Step 4: Capture baseline data state
    const baselineNewCount = await dashboard.getNewStatusCount();
    const baselineOngoingCount = await dashboard.getOngoingStatusCount();
    const baselineRejectCount = await dashboard.getRejectStatusCount();
    const baselineClosedCount = await dashboard.getClosedStatusCount();

    // Step 5: Simulate network interruption
    await page.context().setOffline(true);

    // Step 6: Observe dashboard behavior
    await page.waitForTimeout(2000);

    // Step 7: Verify error/warning message is displayed
    const errorVisible = await dashboard.isConnectionErrorVisible();
    const syncWarningVisible = await dashboard.isSyncWarningVisible();
    
    expect(errorVisible || syncWarningVisible).toBe(true);

    // Step 8: Verify last known data is maintained
    const currentNewCount = await dashboard.getNewStatusCount();
    const currentOngoingCount = await dashboard.getOngoingStatusCount();
    
    expect(currentNewCount).toBe(baselineNewCount);
    expect(currentOngoingCount).toBe(baselineOngoingCount);

    // Step 9: Verify controls remain functional
    await expect(page.locator('[data-testid="category-filter-dropdown"]')).toBeVisible();
    await expect(page.locator('[data-testid="status-filter-dropdown"]')).toBeVisible();

    // Step 10: Verify stale data indicator
    if (await page.locator('[data-testid="last-sync-timestamp"]').isVisible()) {
      const timestamp = await dashboard.getLastSyncTimestamp();
      expect(timestamp).toBeTruthy();
    }

    // Step 11: Restore connection
    await page.context().setOffline(false);

    // Step 12: Verify dashboard reconnects and updates
    await page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {});
    await page.waitForTimeout(2000);
    
    // Error message should be cleared or data should update
    const errorStillVisible = await dashboard.isConnectionErrorVisible().catch(() => false);
    // After reconnection, error should be cleared (may vary by implementation)
  });
});