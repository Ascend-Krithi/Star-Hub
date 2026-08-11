const { test, expect } = require('../../fixtures');
const HelpdeskDashboardPage = require('../../pages/helpdesk-dashboard.page');
const TD = require('../../data/helpdesk-test-data');

test.describe('[UI] PK-251 TS-004: Verify Status Filter Functionality', { tag: ['@regression', '@helpdesk'] }, () => {
  let dashboard;

  test('[PK-251 TS-004 TC-001] Verify filtering dashboard by On-going status', async ({ page }) => {
    dashboard = new HelpdeskDashboardPage(page);

    // Step 1: Launch the helpdesk application URL
    await dashboard.goto();

    // Step 2: Enter valid helpdesk manager credentials and click Login
    await dashboard.login(TD.credentials.manager.username, TD.credentials.manager.password);

    // Step 3: Navigate to the Dashboard from the main menu
    await dashboard.navigateToDashboard();

    // Step 4-5: Locate and click on the status filter dropdown
    await dashboard.selectStatusFilter(TD.ticketStatus.ongoing);

    // Step 6-7: Apply the filter
    await dashboard.applyFilters();

    // Step 8: Verify that only On-going status tickets are displayed
    const ongoingCount = await dashboard.getOngoingStatusCount();
    expect(ongoingCount).toBe(TD.expectedCounts.ongoingTickets);

    // Step 12: Verify that the filter indicator shows 'On-going' as the active filter
    const activeFilter = await dashboard.getActiveFilterText();
    expect(activeFilter).toContain(TD.ticketStatus.ongoing);
  });
});