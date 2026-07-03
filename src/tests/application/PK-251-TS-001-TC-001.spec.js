const { test, expect } = require('../../fixtures');
const HelpdeskDashboardPage = require('../../pages/helpdesk-dashboard.page');
const TD = require('../../data/helpdesk-test-data');

test.describe('[UI] PK-251 TS-001: Verify Dashboard Ticket Status Distribution', { tag: ['@smoke', '@regression', '@helpdesk'] }, () => {
  let dashboard;

  test('[PK-251 TS-001 TC-001] Verify ticket status counts are displayed correctly on dashboard', async ({ page }) => {
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

    // Step 4: Verify New status count
    const newCount = await dashboard.getNewStatusCount();
    await expect(page.locator('[data-testid="status-new-count"]')).toBeVisible();
    expect(newCount).toBe(String(TD.ticketStatus.new.count));

    // Step 5: Verify On-going status count
    const ongoingCount = await dashboard.getOngoingStatusCount();
    await expect(page.locator('[data-testid="status-ongoing-count"]')).toBeVisible();
    expect(ongoingCount).toBe(String(TD.ticketStatus.ongoing.count));

    // Step 6: Verify Reject status count
    const rejectCount = await dashboard.getRejectStatusCount();
    await expect(page.locator('[data-testid="status-reject-count"]')).toBeVisible();
    expect(rejectCount).toBe(String(TD.ticketStatus.reject.count));

    // Step 7: Verify Closed status count
    const closedCount = await dashboard.getClosedStatusCount();
    await expect(page.locator('[data-testid="status-closed-count"]')).toBeVisible();
    expect(closedCount).toBe(String(TD.ticketStatus.closed.count));

    // Step 8: Verify all status counts are accurate and match real-time state
    const totalTickets = parseInt(newCount) + parseInt(ongoingCount) + parseInt(rejectCount) + parseInt(closedCount);
    expect(totalTickets).toBe(TD.ticketStatus.totalStatuses);
  });
});