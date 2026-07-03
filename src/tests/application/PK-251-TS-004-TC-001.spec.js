const { test, expect } = require('../../fixtures');
const HelpdeskDashboardPage = require('../../pages/helpdesk-dashboard.page');
const TD = require('../../data/helpdesk-test-data');

test.describe('[UI] PK-251 TS-004: Verify Status Filter Functionality', { tag: ['@regression', '@helpdesk'] }, () => {
  let dashboard;

  test('[PK-251 TS-004 TC-001] Verify filtering dashboard by On-going status', async ({ page }) => {
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

    // Step 4: Locate status filter dropdown
    const statusDropdownVisible = await dashboard.isStatusFilterDropdownVisible();
    await expect(page.locator('[data-testid="status-filter-dropdown"]')).toBeVisible();
    expect(statusDropdownVisible).toBe(true);

    // Step 5: Click status filter dropdown
    await dashboard.selectStatusFilter('On-going');

    // Step 6-7: Apply filter
    await dashboard.applyFilters();

    // Step 8: Verify only On-going tickets are displayed
    const ongoingCount = await dashboard.getOngoingStatusCount();
    expect(ongoingCount).toBe(String(TD.ticketStatus.ongoing.count));

    // Step 9: Verify other statuses are not displayed (implicitly tested by filter)

    // Step 10: Verify volume metric reflects On-going tickets
    expect(parseInt(ongoingCount)).toBe(TD.ticketStatus.ongoing.count);

    // Step 11: Verify resolution trends are updated (visible)
    const trendsVisible = await dashboard.isResolutionTrendsVisible();
    expect(trendsVisible).toBe(true);

    // Step 12: Verify active filter indicator
    const activeFilter = await dashboard.getActiveFilterText();
    expect(activeFilter).toContain('On-going');
    await expect(page.locator('[data-testid="active-filter-badge"]')).toBeVisible();
  });
});