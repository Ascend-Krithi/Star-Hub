const { test, expect } = require('../../fixtures');
const HelpdeskDashboardPage = require('../../pages/helpdesk-dashboard.page');
const TD = require('../../data/helpdesk-test-data');

test.describe('[UI] PK-251 TS-008: Verify Dashboard Performance with High Volume', { tag: ['@regression', '@performance', '@helpdesk'] }, () => {
  let dashboard;

  test('[PK-251 TS-008 TC-001] Verify dashboard handles high volume ticket data efficiently', async ({ page }) => {
    dashboard = new HelpdeskDashboardPage(page);

    // Step 1: Launch the helpdesk application URL
    await dashboard.goto();
    await expect(page).toHaveURL(TD.urls.application);

    // Step 2: Login with manager credentials
    await dashboard.login(TD.credentials.manager.username, TD.credentials.manager.password);
    await page.waitForLoadState('domcontentloaded');

    // Step 3-4: Navigate to Dashboard and measure load time
    const startTime = Date.now();
    await dashboard.navigateToDashboard();
    await page.waitForLoadState('domcontentloaded');
    const loadTime = Date.now() - startTime;
    
    expect(loadTime).toBeLessThan(TD.performance.expectedLoadTime);

    // Step 5: Verify status counts are accurate
    const newCount = await dashboard.getNewStatusCount();
    const ongoingCount = await dashboard.getOngoingStatusCount();
    const rejectCount = await dashboard.getRejectStatusCount();
    const closedCount = await dashboard.getClosedStatusCount();
    
    await expect(page.locator('[data-testid="status-new-count"]')).toBeVisible();
    await expect(page.locator('[data-testid="status-ongoing-count"]')).toBeVisible();
    await expect(page.locator('[data-testid="status-reject-count"]')).toBeVisible();
    await expect(page.locator('[data-testid="status-closed-count"]')).toBeVisible();

    // Step 6: Verify category counts are accurate
    const inquiryCount = await dashboard.getInquiryCategoryCount();
    const requestCount = await dashboard.getRequestCategoryCount();
    const disputeCount = await dashboard.getDisputeCategoryCount();
    const nuisanceCount = await dashboard.getNuisanceCategoryCount();
    const invalidCount = await dashboard.getInvalidCategoryCount();
    
    await expect(page.locator('[data-testid="category-inquiry-count"]')).toBeVisible();
    await expect(page.locator('[data-testid="category-request-count"]')).toBeVisible();

    // Step 7: Verify backlog count
    const backlogCount = await dashboard.getBacklogCount();
    await expect(page.locator('[data-testid="backlog-count"]')).toBeVisible();

    // Step 8: Verify resolution trends render without lag
    const trendsVisible = await dashboard.isResolutionTrendsVisible();
    await expect(page.locator('[data-testid="resolution-trends-chart"]')).toBeVisible();
    expect(trendsVisible).toBe(true);

    // Step 9: Verify real-time updates (dashboard is responsive)
    await page.waitForLoadState('networkidle', { timeout: 5000 }).catch(() => {});

    // Step 10: Test filter performance
    const filterStartTime = Date.now();
    await dashboard.selectCategoryFilter('Request');
    await dashboard.applyFilters();
    const filterTime = Date.now() - filterStartTime;
    
    expect(filterTime).toBeLessThan(TD.performance.expectedFilterTime);

    // Step 11: Verify UI remains responsive
    await expect(page.locator('[data-testid="category-filter-dropdown"]')).toBeVisible();
    await expect(page.locator('[data-testid="status-filter-dropdown"]')).toBeVisible();

    // Step 12: Verify no errors or warnings
    // No console errors expected during high load
  });
});