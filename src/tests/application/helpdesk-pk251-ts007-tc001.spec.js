const { test, expect } = require('../../fixtures');
const HelpdeskDashboardPage = require('../../pages/helpdesk-dashboard.page');
const TD = require('../../data/helpdesk-test-data');

test.describe('[UI] PK-251 TS-007: Verify No Data Scenario with Filters', { tag: ['@regression', '@helpdesk'] }, () => {
  let dashboard;

  test('[PK-251 TS-007 TC-001] Verify no tickets found message for Invalid category and On-going status', async ({ page }) => {
    dashboard = new HelpdeskDashboardPage(page);

    // Step 1: Launch the helpdesk application URL
    await dashboard.goto();

    // Step 2: Enter valid helpdesk manager credentials and click Login
    await dashboard.login(TD.credentials.manager.username, TD.credentials.manager.password);

    // Step 3: Navigate to the Dashboard from the main menu
    await dashboard.navigateToDashboard();

    // Step 4: Select 'Invalid' from category filter
    await dashboard.selectCategoryFilter(TD.ticketCategories.invalid);

    // Step 5: Select 'On-going' from status filter
    await dashboard.selectStatusFilter(TD.ticketStatus.ongoing);

    // Step 6: Apply both filters
    await dashboard.applyFilters();

    // Step 7: Verify that the dashboard displays 'No tickets found' message
    const noTicketsVisible = await dashboard.isNoTicketsMessageVisible();
    expect(noTicketsVisible).toBeTruthy();

    // Step 9: Verify that the applied filters are still visible and active
    const activeFilter = await dashboard.getActiveFilterText();
    expect(activeFilter).toContain(TD.ticketCategories.invalid);
    expect(activeFilter).toContain(TD.ticketStatus.ongoing);
  });
});