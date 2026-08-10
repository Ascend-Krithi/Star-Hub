const { test, expect } = require('../../fixtures');
const HelpdeskDashboardPage = require('../../pages/helpdesk-dashboard.page');
const TD = require('../../data/helpdesk-test-data');

test.describe('[UI] PK-251 TS-010: Verify Clear Filters Restores Complete Dashboard Data', { tag: ['@regression', '@helpdesk'] }, () => {
  let dashboard;

  test('[PK-251 TS-010 TC-001] Clear all filters and verify complete unfiltered data is restored', async ({ page }) => {
    dashboard = new HelpdeskDashboardPage(page);

    // Step 1-3: Login and navigate to dashboard
    await dashboard.goto(TD.urls.base);
    await dashboard.login(TD.credentials.manager.username, TD.credentials.manager.password);
    await page.waitForLoadState('networkidle');
    await dashboard.navigateToDashboard();

    // Step 4: Capture baseline unfiltered data
    const baselineNewCount = await dashboard.getNewStatusCount();
    const baselineOngoingCount = await dashboard.getOngoingStatusCount();
    const baselineRejectCount = await dashboard.getRejectStatusCount();
    const baselineClosedCount = await dashboard.getClosedStatusCount();
    const baselineInquiryCount = await dashboard.getInquiryCategoryCount();
    const baselineRequestCount = await dashboard.getRequestCategoryCount();
    const baselineDisputeCount = await dashboard.getDisputeCategoryCount();

    // Step 5: Apply category filter
    await dashboard.selectCategoryFilter(TD.ticketCategories.request);

    // Step 6: Apply status filter
    await dashboard.selectStatusFilter(TD.ticketStatuses.closed);

    // Step 7: Verify filtered data is displayed
    await dashboard.applyFilters();
    await page.waitForLoadState('networkidle');
    const activeFilter = await dashboard.getActiveFilterText();
    expect(activeFilter).toContain(TD.ticketCategories.request);
    expect(activeFilter).toContain(TD.ticketStatuses.closed);

    // Step 8: Clear all filters
    await dashboard.clearAllFilters();
    await page.waitForLoadState('networkidle');

    // Step 9: Verify filters are removed
    await expect(page.locator('[data-testid="category-filter"], select[name="category"], #category-filter').first()).toBeVisible();

    // Step 10: Verify all category counts match baseline
    const restoredInquiryCount = await dashboard.getInquiryCategoryCount();
    const restoredRequestCount = await dashboard.getRequestCategoryCount();
    const restoredDisputeCount = await dashboard.getDisputeCategoryCount();
    expect(restoredInquiryCount).toBe(baselineInquiryCount);
    expect(restoredRequestCount).toBe(baselineRequestCount);
    expect(restoredDisputeCount).toBe(baselineDisputeCount);

    // Step 11: Verify all status counts match baseline
    const restoredNewCount = await dashboard.getNewStatusCount();
    const restoredOngoingCount = await dashboard.getOngoingStatusCount();
    const restoredRejectCount = await dashboard.getRejectStatusCount();
    const restoredClosedCount = await dashboard.getClosedStatusCount();
    expect(restoredNewCount).toBe(baselineNewCount);
    expect(restoredOngoingCount).toBe(baselineOngoingCount);
    expect(restoredRejectCount).toBe(baselineRejectCount);
    expect(restoredClosedCount).toBe(baselineClosedCount);

    // Step 12: Verify RFT metrics are displayed
    const backlogCount = await dashboard.getBacklogCount();
    expect(backlogCount).toBeTruthy();

    // Step 13: Verify resolution trends are displayed
    const trendsVisible = await dashboard.isResolutionTrendsVisible();
    expect(trendsVisible).toBeTruthy();
  });
});