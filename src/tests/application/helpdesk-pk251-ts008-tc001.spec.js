const { test, expect } = require('../../fixtures');
const HelpdeskDashboardPage = require('../../pages/helpdesk-dashboard.page');
const TD = require('../../data/helpdesk-test-data');

test.describe('[UI] PK-251 TS-008: Verify Dashboard Performance with High Volume', { tag: ['@regression', '@performance', '@helpdesk'] }, () => {
  let dashboard;

  test('[PK-251 TS-008 TC-001] Verify dashboard handles 1500+ tickets efficiently', async ({ page }) => {
    dashboard = new HelpdeskDashboardPage(page);

    // Step 1: Launch the helpdesk application URL
    await dashboard.goto();

    // Step 2: Enter valid helpdesk manager credentials and click Login
    await dashboard.login(TD.credentials.manager.username, TD.credentials.manager.password);

    // Step 3: Navigate to the Dashboard during peak load time
    const startTime = Date.now();
    await dashboard.navigateToDashboard();
    const loadTime = Date.now() - startTime;

    // Step 4: Measure and verify the dashboard page load time
    expect(loadTime).toBeLessThan(5000);

    // Step 5: Verify that all ticket status counts are displayed accurately
    const newCount = await dashboard.getNewStatusCount();
    const ongoingCount = await dashboard.getOngoingStatusCount();
    const rejectCount = await dashboard.getRejectStatusCount();
    const closedCount = await dashboard.getClosedStatusCount();
    const totalStatusCount = newCount + ongoingCount + rejectCount + closedCount;
    expect(totalStatusCount).toBeGreaterThanOrEqual(1500);

    // Step 6: Verify that all category volume counts are displayed accurately
    const inquiryCount = await dashboard.getInquiryCategoryCount();
    const requestCount = await dashboard.getRequestCategoryCount();
    const disputeCount = await dashboard.getDisputeCategoryCount();
    const nuisanceCount = await dashboard.getNuisanceCategoryCount();
    const invalidCount = await dashboard.getInvalidCategoryCount();
    const totalCategoryCount = inquiryCount + requestCount + disputeCount + nuisanceCount + invalidCount;
    expect(totalCategoryCount).toBeGreaterThanOrEqual(1500);

    // Step 7: Verify that the backlog count is calculated and displayed correctly
    const backlogCount = await dashboard.getBacklogCount();
    expect(backlogCount).toBeGreaterThan(0);

    // Step 8: Verify that resolution trends are rendered properly
    const trendsVisible = await dashboard.isResolutionTrendsVisible();
    expect(trendsVisible).toBeTruthy();

    // Step 10: Apply a filter and verify performance
    const filterStartTime = Date.now();
    await dashboard.selectCategoryFilter(TD.ticketCategories.request);
    await dashboard.applyFilters();
    const filterTime = Date.now() - filterStartTime;
    expect(filterTime).toBeLessThan(3000);
  });
});