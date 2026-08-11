const { test, expect } = require('../../fixtures');
const HelpdeskDashboardPage = require('../../pages/helpdesk-dashboard.page');
const TD = require('../../data/helpdesk-test-data');

test.describe('[UI] PK-251 TS-001: Verify Dashboard Ticket Status Display', { tag: ['@smoke', '@regression', '@helpdesk'] }, () => {
  let dashboard;

  test('[PK-251 TS-001 TC-001] Verify real-time ticket status counts on dashboard', async ({ page }) => {
    dashboard = new HelpdeskDashboardPage(page);

    // Step 2: Launch the helpdesk application URL
    await dashboard.goto();
    await expect(page).toHaveURL(TD.urls.helpdeskHome);

    // Step 3: Enter valid helpdesk manager credentials and click Login
    await dashboard.login(TD.credentials.manager.username, TD.credentials.manager.password);

    // Step 4: Navigate to the Dashboard from the main menu
    await dashboard.navigateToDashboard();
    await expect(page).toHaveURL(TD.urls.dashboard);

    // Step 5: Verify the ticket status section displays count for 'New' status tickets
    const newCount = await dashboard.getNewStatusCount();
    expect(newCount).toBe(TD.expectedCounts.newTickets);

    // Step 6: Verify the ticket status section displays count for 'On-going' status tickets
    const ongoingCount = await dashboard.getOngoingStatusCount();
    expect(ongoingCount).toBe(TD.expectedCounts.ongoingTickets);

    // Step 7: Verify the ticket status section displays count for 'Reject' status tickets
    const rejectCount = await dashboard.getRejectStatusCount();
    expect(rejectCount).toBe(TD.expectedCounts.rejectTickets);

    // Step 8: Verify the ticket status section displays count for 'Closed' status tickets
    const closedCount = await dashboard.getClosedStatusCount();
    expect(closedCount).toBe(TD.expectedCounts.closedTickets);

    // Step 9: Verify that all ticket status counts are displayed in real-time
    const totalCount = newCount + ongoingCount + rejectCount + closedCount;
    expect(totalCount).toBe(TD.expectedCounts.totalTickets);
  });
});