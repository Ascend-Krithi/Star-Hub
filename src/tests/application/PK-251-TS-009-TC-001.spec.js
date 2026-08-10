const { test, expect } = require('../../fixtures');
const HelpdeskDashboardPage = require('../../pages/helpdesk-dashboard.page');
const TD = require('../../data/helpdesk-test-data');

test.describe('[UI] PK-251 TS-009: Verify Dashboard Behavior During Sync Interruption', { tag: ['@regression', '@helpdesk'] }, () => {
  let dashboard;

  test('[PK-251 TS-009 TC-001] Verify dashboard handles real-time sync failure gracefully', async ({ page }) => {
    dashboard = new HelpdeskDashboardPage(page);

    // Step 1-3: Login and navigate to dashboard
    await dashboard.goto(TD.urls.base);
    await dashboard.login(TD.credentials.manager.username, TD.credentials.manager.password);
    await page.waitForLoadState('networkidle');
    await dashboard.navigateToDashboard();

    // Step 4: Capture baseline data
    const baselineNewCount = await dashboard.getNewStatusCount();
    const baselineOngoingCount = await dashboard.getOngoingStatusCount();

    // Step 5: Simulate network interruption
    await page.context().setOffline(true);
    await page.waitForTimeout(2000);

    // Step 6-7: Verify error/warning message is displayed
    const syncErrorVisible = await dashboard.isSyncErrorVisible();
    expect(syncErrorVisible).toBeTruthy();

    // Step 8: Verify dashboard maintains last known data
    const currentNewCount = await dashboard.getNewStatusCount();
    const currentOngoingCount = await dashboard.getOngoingStatusCount();
    expect(currentNewCount).toBe(baselineNewCount);
    expect(currentOngoingCount).toBe(baselineOngoingCount);

    // Step 9: Verify controls remain functional
    await expect(page.locator('[data-testid="category-filter"], select[name="category"], #category-filter').first()).toBeVisible();

    // Step 10: Verify stale data indicator
    const timestamp = await dashboard.getLastUpdatedTimestamp();
    expect(timestamp).toBeTruthy();

    // Step 11: Restore connection
    await page.context().setOffline(false);
    await page.waitForTimeout(2000);

    // Step 12: Verify dashboard reconnects and updates
    await page.reload();
    await page.waitForLoadState('networkidle');
    const updatedNewCount = await dashboard.getNewStatusCount();
    expect(updatedNewCount).toBeTruthy();
  });
});