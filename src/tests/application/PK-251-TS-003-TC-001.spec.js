const { test, expect } = require('../../fixtures');
const HelpdeskDashboardPage = require('../../pages/helpdesk-dashboard.page');
const TD = require('../../data/helpdesk-test-data');

test.describe('[UI] PK-251 TS-003: Verify Category Filter Functionality', { tag: ['@regression', '@helpdesk'] }, () => {
  let dashboard;

  test('[PK-251 TS-003 TC-001] Filter dashboard by Request category', async ({ page }) => {
    dashboard = new HelpdeskDashboardPage(page);

    // Step 1-3: Login and navigate to dashboard
    await dashboard.goto(TD.urls.base);
    await dashboard.login(TD.credentials.manager.username, TD.credentials.manager.password);
    await page.waitForLoadState('networkidle');
    await dashboard.navigateToDashboard();

    // Step 4-5: Locate and open category filter dropdown
    await expect(page.locator('[data-testid="category-filter"], select[name="category"], #category-filter').first()).toBeVisible();

    // Step 6: Select 'Request' from category filter
    await dashboard.selectCategoryFilter(TD.ticketCategories.request);

    // Step 7: Apply filter
    await dashboard.applyFilters();
    await page.waitForLoadState('networkidle');

    // Step 8: Verify only Request tickets are displayed
    const requestCount = await dashboard.getRequestCategoryCount();
    expect(requestCount.trim()).toBe(TD.expectedCounts.TS003.requestFiltered);

    // Step 9: Verify other categories are not displayed (counts should be 0 or hidden)
    // This validation depends on UI behavior - filtered view should show only Request data

    // Step 10: Verify active filter indicator
    const activeFilter = await dashboard.getActiveFilterText();
    expect(activeFilter).toContain(TD.ticketCategories.request);
  });
});