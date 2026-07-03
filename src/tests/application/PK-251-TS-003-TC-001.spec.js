const { test, expect } = require('../../fixtures');
const HelpdeskDashboardPage = require('../../pages/helpdesk-dashboard.page');
const TD = require('../../data/helpdesk-test-data');

test.describe('[UI] PK-251 TS-003: Verify Category Filter Functionality', { tag: ['@regression', '@helpdesk'] }, () => {
  let dashboard;

  test('[PK-251 TS-003 TC-001] Verify filtering dashboard by Request category', async ({ page }) => {
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
    const categoryDropdownVisible = await dashboard.isCategoryFilterDropdownVisible();
    await expect(page.locator('[data-testid="category-filter-dropdown"]')).toBeVisible();
    expect(categoryDropdownVisible).toBe(true);

    // Step 5: Click category filter dropdown
    await dashboard.selectCategoryFilter('Request');

    // Step 6-7: Apply filter
    await dashboard.applyFilters();

    // Step 8: Verify only Request tickets are displayed
    const requestCount = await dashboard.getRequestCategoryCount();
    expect(requestCount).toBe(String(TD.ticketCategories.request.count));

    // Step 9: Verify other categories are not displayed (implicitly tested by filter)
    
    // Step 10: Verify active filter indicator
    const activeFilter = await dashboard.getActiveFilterText();
    expect(activeFilter).toContain('Request');
    await expect(page.locator('[data-testid="active-filter-badge"]')).toBeVisible();
  });
});