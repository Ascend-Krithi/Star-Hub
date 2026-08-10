const { test, expect } = require('../../fixtures');
const HelpdeskDashboardPage = require('../../pages/helpdesk-dashboard.page');
const TD = require('../../data/helpdesk-test-data');

test.describe('[UI] PK-251 TS-008: Verify Dashboard Performance with High Volume', { tag: ['@regression', '@performance', '@helpdesk'] }, () => {
  let dashboard;

  test('[PK-251 TS-008 TC-001] Verify dashboard handles 1500+ tickets with acceptable performance', async ({ page }) => {
    dashboard = new HelpdeskDashboardPage(page);

    // Step 1-2: Login
    await dashboard.goto(TD.urls.base);
    await dashboard.login(TD.credentials.manager.username, TD.credentials.manager.password);
    await page.waitForLoadState('networkidle');

    // Step 3-4: Navigate to dashboard and measure load time
    const startTime = Date.now();
    await dashboard.navigateToDashboard();
    await page.waitForLoadState('networkidle');
    const loadTime = Date.now() - startTime;

    // Verify load time is under 5 seconds
    expect(loadTime).toBeLessThan(TD.performance.maxLoadTime);

    // Step 5: Verify status counts are accurate for high volume
    const newCount = await dashboard.getNewStatusCount();
    const ongoingCount = await dashboard.getOngoingStatusCount();
    const rejectCount = await dashboard.getRejectStatusCount();
    const closedCount = await dashboard.getClosedStatusCount();

    const totalStatus = parseInt(newCount) + parseInt(ongoingCount) + parseInt(rejectCount) + parseInt(closedCount);
    expect(totalStatus).toBeGreaterThanOrEqual(TD.expectedCounts.TS008.highVolume);

    // Step 6: Verify category counts are accurate
    const inquiryCount = await dashboard.getInquiryCategoryCount();
    const requestCount = await dashboard.getRequestCategoryCount();
    const disputeCount = await dashboard.getDisputeCategoryCount();
    const nuisanceCount = await dashboard.getNuisanceCategoryCount();
    const invalidCount = await dashboard.getInvalidCategoryCount();

    const totalCategory = parseInt(inquiryCount) + parseInt(requestCount) + parseInt(disputeCount) + parseInt(nuisanceCount) + parseInt(invalidCount);
    expect(totalCategory).toBeGreaterThanOrEqual(TD.expectedCounts.TS008.highVolume);

    // Step 7: Verify backlog is calculated correctly
    const backlogCount = await dashboard.getBacklogCount();
    expect(parseInt(backlogCount)).toBeGreaterThan(0);

    // Step 8: Verify resolution trends render without lag
    const trendsVisible = await dashboard.isResolutionTrendsVisible();
    expect(trendsVisible).toBeTruthy();

    // Step 10: Test filter performance with high volume
    const filterStartTime = Date.now();
    await dashboard.selectCategoryFilter(TD.ticketCategories.request);
    await dashboard.applyFilters();
    await page.waitForLoadState('networkidle');
    const filterTime = Date.now() - filterStartTime;

    expect(filterTime).toBeLessThan(TD.performance.maxFilterTime);

    // Step 11: Verify UI remains responsive
    await expect(page.locator('[data-testid="category-filter"], select[name="category"], #category-filter').first()).toBeVisible();
    await expect(page.locator('[data-testid="status-filter"], select[name="status"], #status-filter').first()).toBeVisible();
  });
});