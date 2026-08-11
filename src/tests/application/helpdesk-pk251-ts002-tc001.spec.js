const { test, expect } = require('../../fixtures');
const HelpdeskDashboardPage = require('../../pages/helpdesk-dashboard.page');
const TD = require('../../data/helpdesk-test-data');

test.describe('[UI] PK-251 TS-002: Verify Dashboard Ticket Volume by Category', { tag: ['@smoke', '@regression', '@helpdesk'] }, () => {
  let dashboard;

  test('[PK-251 TS-002 TC-001] Verify ticket volume counts by category and resolution trends', async ({ page }) => {
    dashboard = new HelpdeskDashboardPage(page);

    // Step 1: Launch the helpdesk application URL
    await dashboard.goto();

    // Step 2: Enter valid helpdesk manager credentials and click Login
    await dashboard.login(TD.credentials.manager.username, TD.credentials.manager.password);

    // Step 3: Navigate to the Dashboard from the main menu
    await dashboard.navigateToDashboard();

    // Step 4: Verify the ticket volume section displays count for 'Inquiry' category
    const inquiryCount = await dashboard.getInquiryCategoryCount();
    expect(inquiryCount).toBe(TD.expectedCounts.inquiryTickets);

    // Step 5: Verify the ticket volume section displays count for 'Request' category
    const requestCount = await dashboard.getRequestCategoryCount();
    expect(requestCount).toBe(TD.expectedCounts.requestTickets);

    // Step 6: Verify the ticket volume section displays count for 'Dispute' category
    const disputeCount = await dashboard.getDisputeCategoryCount();
    expect(disputeCount).toBe(TD.expectedCounts.disputeTickets);

    // Step 7: Verify the ticket volume section displays count for 'Nuisance' category
    const nuisanceCount = await dashboard.getNuisanceCategoryCount();
    expect(nuisanceCount).toBe(TD.expectedCounts.nuisanceTickets);

    // Step 8: Verify the ticket volume section displays count for 'Invalid' category
    const invalidCount = await dashboard.getInvalidCategoryCount();
    expect(invalidCount).toBe(TD.expectedCounts.invalidTickets);

    // Step 9: Verify the dashboard displays the current backlog count
    const backlogCount = await dashboard.getBacklogCount();
    expect(backlogCount).toBe(TD.expectedCounts.backlog);

    // Step 10: Verify the resolution trends section displays trend data for the last 7 days
    const trendsVisible = await dashboard.isResolutionTrendsVisible();
    expect(trendsVisible).toBeTruthy();

    // Step 11: Verify that all category volumes are displayed in real-time
    const totalCategoryCount = inquiryCount + requestCount + disputeCount + nuisanceCount + invalidCount;
    expect(totalCategoryCount).toBe(TD.expectedCounts.totalCategoryTickets);
  });
});