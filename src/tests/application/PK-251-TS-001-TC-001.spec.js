const { test, expect } = require('../../fixtures');
const HelpdeskDashboardPage = require('../../pages/helpdesk-dashboard.page');
const TD = require('../../data/helpdesk-test-data');

test.describe('[UI] PK-251 TS-001: Verify Dashboard Ticket Status Display', { tag: ['@smoke', '@regression', '@helpdesk'] }, () => {
  let dashboard;

  test('[PK-251 TS-001 TC-001] Verify ticket status counts are displayed correctly on dashboard', async ({ page }) => {
    dashboard = new HelpdeskDashboardPage(page);

    // Step 2: Launch the helpdesk application URL
    await dashboard.goto(TD.urls.base);
    await expect(page).toHaveURL(/helpdesk/);

    // Step 3: Enter valid credentials and login
    await dashboard.login(TD.credentials.manager.username, TD.credentials.manager.password);
    await page.waitForLoadState('networkidle');

    // Step 4: Navigate to Dashboard
    await dashboard.navigateToDashboard();
    await expect(page).toHaveURL(/dashboard/);

    // Step 5: Verify New status ticket count
    const newCount = await dashboard.getNewStatusCount();
    expect(newCount.trim()).toBe(TD.expectedCounts.TS001.new);

    // Step 6: Verify On-going status ticket count
    const ongoingCount = await dashboard.getOngoingStatusCount();
    expect(ongoingCount.trim()).toBe(TD.expectedCounts.TS001.ongoing);

    // Step 7: Verify Reject status ticket count
    const rejectCount = await dashboard.getRejectStatusCount();
    expect(rejectCount.trim()).toBe(TD.expectedCounts.TS001.reject);

    // Step 8: Verify Closed status ticket count
    const closedCount = await dashboard.getClosedStatusCount();
    expect(closedCount.trim()).toBe(TD.expectedCounts.TS001.closed);

    // Step 9: Verify all status counts are displayed in real-time
    const totalCalculated = parseInt(newCount) + parseInt(ongoingCount) + parseInt(rejectCount) + parseInt(closedCount);
    expect(totalCalculated).toBe(TD.expectedCounts.TS001.total);
  });
});