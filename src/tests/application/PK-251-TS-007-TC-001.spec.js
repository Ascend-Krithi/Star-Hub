const { test, expect } = require('../../fixtures');
const HelpdeskDashboardPage = require('../../pages/helpdesk-dashboard.page');
const TD = require('../../data/helpdesk-test-data');

test.describe('[UI] PK-251 TS-007: Verify No Data Scenario with Filters', { tag: ['@regression', '@helpdesk'] }, () => {
  let dashboard;

  test('[PK-251 TS-007 TC-001] Apply filters that return no matching tickets', async ({ page }) => {
    dashboard = new HelpdeskDashboardPage(page);

    // Step 1-3: Login and navigate to dashboard
    await dashboard.goto(TD.urls.base);
    await dashboard.login(TD.credentials.manager.username, TD.credentials.manager.password);
    await page.waitForLoadState('networkidle');
    await dashboard.navigateToDashboard();

    // Step 4: Select Invalid category
    await dashboard.selectCategoryFilter(TD.ticketCategories.invalid);

    // Step 5: Select On-going status
    await dashboard.selectStatusFilter(TD.ticketStatuses.ongoing);

    // Step 6: Apply filters
    await dashboard.applyFilters();
    await page.waitForLoadState('networkidle');

    // Step 7: Verify 'No tickets found' message is displayed
    const noDataVisible = await dashboard.isNoDataMessageVisible();
    expect(noDataVisible).toBeTruthy();

    // Step 9: Verify applied filters are still visible
    const activeFilter = await dashboard.getActiveFilterText();
    expect(activeFilter).toContain(TD.ticketCategories.invalid);
    expect(activeFilter).toContain(TD.ticketStatuses.ongoing);

    // Step 11: Verify dashboard remains functional
    await expect(page.locator('[data-testid="clear-filters"], button:has-text("Clear"), .clear-filters').first()).toBeVisible();
  });
});