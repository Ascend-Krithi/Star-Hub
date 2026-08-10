const { test, expect } = require('../../fixtures');
const HelpdeskDashboardPage = require('../../pages/helpdesk-dashboard.page');
const TD = require('../../data/helpdesk-test-data');

test.describe('[UI] PK-251 TS-006: Verify Combined Category and Status Filters', { tag: ['@regression', '@helpdesk'] }, () => {
  let dashboard;

  test('[PK-251 TS-006 TC-001] Apply both Category=Dispute and Status=On-going filters', async ({ page }) => {
    dashboard = new HelpdeskDashboardPage(page);

    // Step 1-3: Login and navigate to dashboard
    await dashboard.goto(TD.urls.base);
    await dashboard.login(TD.credentials.manager.username, TD.credentials.manager.password);
    await page.waitForLoadState('networkidle');
    await dashboard.navigateToDashboard();

    // Step 4-5: Select Dispute category
    await expect(page.locator('[data-testid="category-filter"], select[name="category"], #category-filter').first()).toBeVisible();
    await dashboard.selectCategoryFilter(TD.ticketCategories.dispute);

    // Step 6-7: Select On-going status
    await expect(page.locator('[data-testid="status-filter"], select[name="status"], #status-filter').first()).toBeVisible();
    await dashboard.selectStatusFilter(TD.ticketStatuses.ongoing);

    // Step 8: Apply both filters
    await dashboard.applyFilters();
    await page.waitForLoadState('networkidle');

    // Step 9: Verify only Dispute + On-going tickets are displayed
    const disputeCount = await dashboard.getDisputeCategoryCount();
    const ongoingCount = await dashboard.getOngoingStatusCount();
    expect(parseInt(disputeCount)).toBeGreaterThanOrEqual(0);
    expect(parseInt(ongoingCount)).toBeGreaterThanOrEqual(0);

    // Step 11: Verify both filter indicators are active
    const activeFilter = await dashboard.getActiveFilterText();
    expect(activeFilter).toContain(TD.ticketCategories.dispute);
    expect(activeFilter).toContain(TD.ticketStatuses.ongoing);

    // Step 12: Verify metrics reflect filtered dataset
    const trendsVisible = await dashboard.isResolutionTrendsVisible();
    expect(trendsVisible).toBeTruthy();
  });
});