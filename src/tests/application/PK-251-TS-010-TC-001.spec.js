const { test, expect } = require('../../fixtures');
const HelpdeskDashboardPage = require('../../pages/helpdesk-dashboard.page');
const TD = require('../../data/helpdesk-test-data');

test.describe('[UI] PK-251 TS-010: Verify Clear All Filters Functionality', { tag: ['@regression', '@helpdesk'] }, () => {
  let dashboard;

  test('[PK-251 TS-010 TC-001] Verify clearing filters restores complete unfiltered data view', async ({ page }) => {
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

    // Step 4: Capture baseline unfiltered data
    const baselineNewCount = await dashboard.getNewStatusCount();
    const baselineOngoingCount = await dashboard.getOngoingStatusCount();
    const baselineRejectCount = await dashboard.getRejectStatusCount();
    const baselineClosedCount = await dashboard.getClosedStatusCount();
    const baselineInquiryCount = await dashboard.getInquiryCategoryCount();
    const baselineRequestCount = await dashboard.getRequestCategoryCount();
    const baselineDisputeCount = await dashboard.getDisputeCategoryCount();
    const baselineNuisanceCount = await dashboard.getNuisanceCategoryCount();
    const baselineInvalidCount = await dashboard.getInvalidCategoryCount();

    // Step 5: Apply category filter (Request)
    await dashboard.selectCategoryFilter('Request');

    // Step 6: Apply status filter (Closed)
    await dashboard.selectStatusFilter('Closed');

    // Step 7: Verify filtered data is displayed
    await dashboard.applyFilters();
    const activeFilter = await dashboard.getActiveFilterText();
    expect(activeFilter).toContain('Request');
    expect(activeFilter).toContain('Closed');

    // Step 8: Clear all filters
    await dashboard.clearAllFilters();

    // Step 9: Verify filters are removed
    await expect(page.locator('[data-testid="category-filter-dropdown"]')).toBeVisible();
    await expect(page.locator('[data-testid="status-filter-dropdown"]')).toBeVisible();

    // Step 10: Verify all category counts restored
    const inquiryCount = await dashboard.getInquiryCategoryCount();
    const requestCount = await dashboard.getRequestCategoryCount();
    const disputeCount = await dashboard.getDisputeCategoryCount();
    const nuisanceCount = await dashboard.getNuisanceCategoryCount();
    const invalidCount = await dashboard.getInvalidCategoryCount();
    
    expect(inquiryCount).toBe(baselineInquiryCount);
    expect(requestCount).toBe(baselineRequestCount);
    expect(disputeCount).toBe(baselineDisputeCount);
    expect(nuisanceCount).toBe(baselineNuisanceCount);
    expect(invalidCount).toBe(baselineInvalidCount);

    // Step 11: Verify all status counts restored
    const newCount = await dashboard.getNewStatusCount();
    const ongoingCount = await dashboard.getOngoingStatusCount();
    const rejectCount = await dashboard.getRejectStatusCount();
    const closedCount = await dashboard.getClosedStatusCount();
    
    expect(newCount).toBe(baselineNewCount);
    expect(ongoingCount).toBe(baselineOngoingCount);
    expect(rejectCount).toBe(baselineRejectCount);
    expect(closedCount).toBe(baselineClosedCount);

    // Step 12: Verify RFT metrics displayed (if applicable)
    // RFT metrics should be visible for complete dataset

    // Step 13: Verify resolution trends displayed
    const trendsVisible = await dashboard.isResolutionTrendsVisible();
    await expect(page.locator('[data-testid="resolution-trends-chart"]')).toBeVisible();
    expect(trendsVisible).toBe(true);

    // Step 14: Verify data matches baseline
    expect(newCount).toBe(String(TD.ticketStatus.new.count));
    expect(ongoingCount).toBe(String(TD.ticketStatus.ongoing.count));
    expect(rejectCount).toBe(String(TD.ticketStatus.reject.count));
    expect(closedCount).toBe(String(TD.ticketStatus.closed.count));
  });
});