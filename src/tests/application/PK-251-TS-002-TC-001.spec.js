const { test, expect } = require('../../fixtures');
const HelpdeskDashboardPage = require('../../pages/helpdesk-dashboard.page');
const TD = require('../../data/helpdesk-test-data');

test.describe('[UI] PK-251 TS-002: Verify Dashboard Ticket Volume and Trends', { tag: ['@smoke', '@regression', '@helpdesk'] }, () => {
  let dashboard;

  test('[PK-251 TS-002 TC-001] Verify ticket volume by category, backlog, and resolution trends', async ({ page }) => {
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

    // Step 4: Verify Inquiry category count
    const inquiryCount = await dashboard.getInquiryCategoryCount();
    await expect(page.locator('[data-testid="category-inquiry-count"]')).toBeVisible();
    expect(inquiryCount).toBe(String(TD.ticketCategories.inquiry.count));

    // Step 5: Verify Request category count
    const requestCount = await dashboard.getRequestCategoryCount();
    await expect(page.locator('[data-testid="category-request-count"]')).toBeVisible();
    expect(requestCount).toBe(String(TD.ticketCategories.request.count));

    // Step 6: Verify Dispute category count
    const disputeCount = await dashboard.getDisputeCategoryCount();
    await expect(page.locator('[data-testid="category-dispute-count"]')).toBeVisible();
    expect(disputeCount).toBe(String(TD.ticketCategories.dispute.count));

    // Step 7: Verify Nuisance category count
    const nuisanceCount = await dashboard.getNuisanceCategoryCount();
    await expect(page.locator('[data-testid="category-nuisance-count"]')).toBeVisible();
    expect(nuisanceCount).toBe(String(TD.ticketCategories.nuisance.count));

    // Step 8: Verify Invalid category count
    const invalidCount = await dashboard.getInvalidCategoryCount();
    await expect(page.locator('[data-testid="category-invalid-count"]')).toBeVisible();
    expect(invalidCount).toBe(String(TD.ticketCategories.invalid.count));

    // Step 9: Verify backlog count
    const backlogCount = await dashboard.getBacklogCount();
    await expect(page.locator('[data-testid="backlog-count"]')).toBeVisible();
    expect(backlogCount).toBe(String(TD.backlog.count));

    // Step 10: Verify resolution trends are visible
    const trendsVisible = await dashboard.isResolutionTrendsVisible();
    await expect(page.locator('[data-testid="resolution-trends-chart"]')).toBeVisible();
    expect(trendsVisible).toBe(true);

    // Step 11: Verify total volume and real-time accuracy
    const totalVolume = parseInt(inquiryCount) + parseInt(requestCount) + parseInt(disputeCount) + parseInt(nuisanceCount) + parseInt(invalidCount);
    expect(totalVolume).toBe(TD.ticketCategories.totalCategories);
  });
});