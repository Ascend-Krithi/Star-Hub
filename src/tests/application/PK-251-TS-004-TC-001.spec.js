const { test, expect } = require('../../fixtures');
const HelpdeskDashboardPage = require('../../pages/helpdesk-dashboard.page');
const TD = require('../../data/helpdesk-test-data');

test.describe('[UI] PK-251 TS-004: Verify Status Filter Functionality', { tag: ['@regression', '@helpdesk'] }, () => {
  let dashboard;

  test('[PK-251 TS-004 TC-001] Filter dashboard by On-going status', async ({ page }) => {
    dashboard = new HelpdeskDashboardPage(page);

    // Step 1-3: Login and navigate to dashboard
    await dashboard.goto(TD.urls.base);
    await dashboard.login(TD.credentials.manager.username, TD.credentials.manager.password);
    await page.waitForLoadState('networkidle');
    await dashboard.navigateToDashboard();

    // Step 4-5: Locate and open status filter dropdown
    await expect(page.locator('[data-testid="status-filter"], select[name="status"], #status-filter').first()).toBeVisible();

    // Step 6: Select 'On-going' from status filter
    await dashboard.selectStatusFilter(TD.ticketStatuses.ongoing);

    // Step 7: Apply filter
    await dashboard.applyFilters();
    await page.waitForLoadState('networkidle');

    // Step 8: Verify only On-going tickets are displayed
    const ongoingCount = await dashboard.getOngoingStatusCount();
    expect(ongoingCount.trim()).toBe(TD.expectedCounts.TS004.ongoingFiltered);

    // Step 10: Verify volume metric reflects only On-going tickets
    expect(ongoingCount.trim()).toBe(TD.expectedCounts.TS004.ongoingFiltered);

    // Step 11: Verify resolution trends are updated for On-going tickets
    const trendsVisible = await dashboard.isResolutionTrendsVisible();
    expect(trendsVisible).toBeTruthy();

    // Step 12: Verify active filter indicator
    const activeFilter = await dashboard.getActiveFilterText();
    expect(activeFilter).toContain(TD.ticketStatuses.ongoing);
  });
});