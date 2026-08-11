const { test, expect } = require('../../fixtures');
const HelpdeskDashboardPage = require('../../pages/helpdesk-dashboard.page');
const TD = require('../../data/helpdesk-test-data');

test.describe('[UI] PK-251 TS-010: Verify Clear All Filters Functionality', { tag: ['@regression', '@helpdesk'] }, () => {
  let dashboard;

  test('[PK-251 TS-010 TC-001] Verify clearing filters restores complete unfiltered data', async ({ page }) => {
    dashboard = new HelpdeskDashboardPage(page);

    // Step 1: Launch the helpdesk application URL
    await dashboard.goto();

    // Step 2: Enter valid helpdesk manager credentials and click Login
    await dashboard.login(TD.credentials.manager.username, TD.credentials.manager.password);

    // Step 3: Navigate to the Dashboard from the main menu
    await dashboard.navigateToDashboard();

    // Step 4: Note the complete unfiltered data state
    const baselineInquiryCount = await dashboard.getInquiryCategoryCount();
    const baselineRequestCount = await dashboard.getRequestCategoryCount();
    const baselineNewCount = await dashboard.getNewStatusCount();
    const baselineClosedCount = await dashboard.getClosedStatusCount();

    // Step 5: Apply category filter 'Request'
    await dashboard.selectCategoryFilter(TD.ticketCategories.request);

    // Step 6: Apply status filter 'Closed'
    await dashboard.selectStatusFilter(TD.ticketStatus.closed);

    // Step 7: Verify filtered data is displayed
    await dashboard.applyFilters();

    // Step 8: Locate and click 'Clear All Filters' button
    await dashboard.clearAllFilters();

    // Step 10: Verify dashboard displays complete unfiltered ticket data across all categories
    const inquiryCount = await dashboard.getInquiryCategoryCount();
    expect(inquiryCount).toBe(baselineInquiryCount);

    const requestCount = await dashboard.getRequestCategoryCount();
    expect(requestCount).toBe(baselineRequestCount);

    // Step 11: Verify dashboard displays complete unfiltered ticket data across all statuses
    const newCount = await dashboard.getNewStatusCount();
    expect(newCount).toBe(baselineNewCount);

    const closedCount = await dashboard.getClosedStatusCount();
    expect(closedCount).toBe(baselineClosedCount);

    // Step 13: Verify resolution trends are displayed correctly
    const trendsVisible = await dashboard.isResolutionTrendsVisible();
    expect(trendsVisible).toBeTruthy();
  });
});