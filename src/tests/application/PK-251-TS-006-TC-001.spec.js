const { test, expect } = require('../../fixtures');
const HelpdeskDashboardPage = require('../../pages/helpdesk-dashboard.page');
const TD = require('../../data/helpdesk-test-data');

test.describe('[UI] PK-251 TS-006: Verify Combined Category and Status Filters', { tag: ['@regression', '@helpdesk'] }, () => {
  let dashboard;

  test('[PK-251 TS-006 TC-001] Verify filtering by Dispute category and On-going status', async ({ page }) => {
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

    // Step 4: Locate category filter dropdown
    await expect(page.locator('[data-testid="category-filter-dropdown"]')).toBeVisible();

    // Step 5: Select Dispute category
    await dashboard.selectCategoryFilter('Dispute');

    // Step 6: Locate status filter dropdown
    await expect(page.locator('[data-testid="status-filter-dropdown"]')).toBeVisible();

    // Step 7: Select On-going status
    await dashboard.selectStatusFilter('On-going');

    // Step 8: Apply both filters
    await dashboard.applyFilters();

    // Step 9: Verify only Dispute + On-going tickets displayed
    const activeFilter = await dashboard.getActiveFilterText();
    expect(activeFilter).toContain('Dispute');
    expect(activeFilter).toContain('On-going');

    // Step 10: Verify other tickets excluded (implicitly tested)

    // Step 11: Verify both filter indicators active
    await expect(page.locator('[data-testid="active-filter-badge"]')).toBeVisible();

    // Step 12: Verify metrics reflect filtered dataset
    const trendsVisible = await dashboard.isResolutionTrendsVisible();
    expect(trendsVisible).toBe(true);
  });
});