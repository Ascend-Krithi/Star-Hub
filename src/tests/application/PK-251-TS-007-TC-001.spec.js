const { test, expect } = require('../../fixtures');
const HelpdeskDashboardPage = require('../../pages/helpdesk-dashboard.page');
const TD = require('../../data/helpdesk-test-data');

test.describe('[UI] PK-251 TS-007: Verify No Data Scenario with Filters', { tag: ['@regression', '@helpdesk'] }, () => {
  let dashboard;

  test('[PK-251 TS-007 TC-001] Verify dashboard behavior when no tickets match filter criteria', async ({ page }) => {
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

    // Step 4: Select Invalid category
    await dashboard.selectCategoryFilter('Invalid');

    // Step 5: Select On-going status
    await dashboard.selectStatusFilter('On-going');

    // Step 6: Apply filters
    await dashboard.applyFilters();

    // Step 7: Verify 'No tickets found' message
    const noTicketsVisible = await dashboard.isNoTicketsMessageVisible();
    await expect(page.locator('[data-testid="no-tickets-message"]')).toBeVisible();
    expect(noTicketsVisible).toBe(true);
    
    const message = await dashboard.getNoTicketsMessage();
    expect(message).toContain(TD.messages.noTickets);

    // Step 8: Verify ticket list is empty
    const isEmpty = await dashboard.isTicketListEmpty();
    expect(isEmpty).toBe(true);

    // Step 9: Verify filters are still active
    const activeFilter = await dashboard.getActiveFilterText();
    expect(activeFilter).toContain('Invalid');
    expect(activeFilter).toContain('On-going');

    // Step 10: Verify metrics show zero or no data
    // Metrics should display appropriately for empty dataset

    // Step 11: Verify dashboard remains functional
    await expect(page.locator('[data-testid="category-filter-dropdown"]')).toBeVisible();
    await expect(page.locator('[data-testid="status-filter-dropdown"]')).toBeVisible();
  });
});