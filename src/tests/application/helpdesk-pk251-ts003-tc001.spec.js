const { test, expect } = require('../../fixtures');
const HelpdeskDashboardPage = require('../../pages/helpdesk-dashboard.page');
const TD = require('../../data/helpdesk-test-data');

test.describe('[UI] PK-251 TS-003: Verify Category Filter Functionality', { tag: ['@regression', '@helpdesk'] }, () => {
  let dashboard;

  test('[PK-251 TS-003 TC-001] Verify filtering dashboard by Request category', async ({ page }) => {
    dashboard = new HelpdeskDashboardPage(page);

    // Step 1: Launch the helpdesk application URL
    await dashboard.goto();

    // Step 2: Ensure user is not logged in - skipping as we need to login
    // Step 3: Enter valid helpdesk manager credentials and click Login
    await dashboard.login(TD.credentials.manager.username, TD.credentials.manager.password);

    // Step 3: Navigate to the Dashboard from the main menu
    await dashboard.navigateToDashboard();

    // Step 4-5: Locate and click on the category filter dropdown
    await dashboard.selectCategoryFilter(TD.ticketCategories.request);

    // Step 6-7: Apply the filter
    await dashboard.applyFilters();

    // Step 8: Verify that only Request type tickets are displayed
    const requestCount = await dashboard.getRequestCategoryCount();
    expect(requestCount).toBe(TD.expectedCounts.requestTickets);

    // Step 10: Verify that the filter indicator shows 'Request' as the active filter
    const activeFilter = await dashboard.getActiveFilterText();
    expect(activeFilter).toContain(TD.ticketCategories.request);
  });
});