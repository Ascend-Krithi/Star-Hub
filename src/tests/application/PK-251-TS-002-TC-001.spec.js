const { test, expect } = require('../../fixtures');
const HelpdeskDashboardPage = require('../../pages/helpdesk-dashboard.page');
const TD = require('../../data/helpdesk-test-data');

test.describe('[UI] PK-251 TS-002: Verify Dashboard Ticket Volume and Metrics Display', { tag: ['@smoke', '@regression', '@helpdesk'] }, () => {
  let dashboard;

  test('[PK-251 TS-002 TC-001] Verify ticket volume by category, backlog, and resolution trends', async ({ page }) => {
    dashboard = new HelpdeskDashboardPage(page);

    // Step 1: Launch application and login
    await dashboard.goto(TD.urls.base);
    await dashboard.login(TD.credentials.manager.username, TD.credentials.manager.password);
    await page.waitForLoadState('networkidle');

    // Step 3: Navigate to Dashboard
    await dashboard.navigateToDashboard();
    await expect(page).toHaveURL(/dashboard/);

    // Step 4: Verify Inquiry category count
    const inquiryCount = await dashboard.getInquiryCategoryCount();
    expect(inquiryCount.trim()).toBe(TD.expectedCounts.TS002.inquiry);

    // Step 5: Verify Request category count
    const requestCount = await dashboard.getRequestCategoryCount();
    expect(requestCount.trim()).toBe(TD.expectedCounts.TS002.request);

    // Step 6: Verify Dispute category count
    const disputeCount = await dashboard.getDisputeCategoryCount();
    expect(disputeCount.trim()).toBe(TD.expectedCounts.TS002.dispute);

    // Step 7: Verify Nuisance category count
    const nuisanceCount = await dashboard.getNuisanceCategoryCount();
    expect(nuisanceCount.trim()).toBe(TD.expectedCounts.TS002.nuisance);

    // Step 8: Verify Invalid category count
    const invalidCount = await dashboard.getInvalidCategoryCount();
    expect(invalidCount.trim()).toBe(TD.expectedCounts.TS002.invalid);

    // Step 9: Verify backlog count
    const backlogCount = await dashboard.getBacklogCount();
    expect(backlogCount.trim()).toBe(TD.expectedCounts.TS002.backlog);

    // Step 10: Verify resolution trends are visible
    const trendsVisible = await dashboard.isResolutionTrendsVisible();
    expect(trendsVisible).toBeTruthy();

    // Step 11: Verify total ticket volume
    const totalVolume = parseInt(inquiryCount) + parseInt(requestCount) + parseInt(disputeCount) + parseInt(nuisanceCount) + parseInt(invalidCount);
    expect(totalVolume).toBe(TD.expectedCounts.TS002.total);
  });
});