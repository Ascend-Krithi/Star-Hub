const { test, expect } = require('../../fixtures');
const HelpdeskDashboardPage = require('../../pages/helpdesk-dashboard.page');
const TD = require('../../data/helpdesk-test-data');

test.describe('[UI] PK-251 TS-006: Verify Combined Category and Status Filters', { tag: ['@regression', '@helpdesk'] }, () => {
  let dashboard;

  test('[PK-251 TS-006 TC-001] Verify filtering by Dispute category and On-going status', async ({ page }) => {
    dashboard = new HelpdeskDashboardPage(page);

    // Step 1: Launch the helpdesk application URL
    await dashboard.goto();

    // Step 2: Enter valid helpdesk manager credentials and click Login
    await dashboard.login(TD.credentials.manager.username, TD.credentials.manager.password);

    // Step 3: Navigate to the Dashboard from the main menu
    await dashboard.navigateToDashboard();

    // Step 4-5: Select 'Dispute' from category filter
    await dashboard.selectCategoryFilter(TD.ticketCategories.dispute);

    // Step 6-7: Select 'On-going' from status filter
    await dashboard.selectStatusFilter(TD.ticketStatus.ongoing);

    // Step 8: Apply both filters
    await dashboard.applyFilters();

    // Step 11: Verify that both filter indicators show active filters
    const activeFilter = await dashboard.getActiveFilterText();
    expect(activeFilter).toContain(TD.ticketCategories.dispute);
    expect(activeFilter).toContain(TD.ticketStatus.ongoing);
  });
});