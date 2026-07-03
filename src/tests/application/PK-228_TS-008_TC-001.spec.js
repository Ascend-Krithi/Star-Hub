const { test, expect } = require('../../fixtures');
const HelpdeskAdminPage = require('../../pages/helpdesk-admin.page');
const TD = require('../../data/helpdesk-test-data');

test.describe('[UI] PK-228 TS-008: Status Transition - Valid Status Change', { tag: ['@regression'] }, () => {
  let adminPage;

  test('[PK-228 TS-008 TC-001] Admin successfully transitions ticket status from New to On-going to Closed', async ({ page }) => {
    adminPage = new HelpdeskAdminPage(page);

    // Step 1: Launch the Admin Portal URL
    await adminPage.goto();
    await expect(page).toHaveURL(TD.urlPatterns.adminDashboard);

    // Step 2: Enter admin credentials and login
    await adminPage.login(TD.credentials.admin.username, TD.credentials.admin.password);
    const isDashboardVisible = await adminPage.isDashboardVisible();
    expect(isDashboardVisible).toBe(true);

    // Step 3: Navigate to Ticket Queue and open a ticket with 'New' status
    await adminPage.navigateToTicketQueue();
    await adminPage.selectTicket('2026051512124');
    let ticketStatus = await adminPage.getTicketStatus();
    expect(ticketStatus).toContain(TD.statuses.new);

    // Step 4: Change ticket status from 'New' to 'On-going'
    await adminPage.changeTicketStatus(TD.statuses.ongoing);

    // Step 5: Verify ticket status is updated to 'On-going'
    ticketStatus = await adminPage.getTicketStatus();
    expect(ticketStatus).toContain(TD.statuses.ongoing);

    // Step 6: Enter resolution details and mandatory fields
    await adminPage.fillVendorCode(TD.ticketData.vendorCode);
    await adminPage.fillVendorName(TD.ticketData.vendorName);

    // Step 7: Change ticket status from 'On-going' to 'Closed'
    await adminPage.changeTicketStatus(TD.statuses.closed);
    await adminPage.selectResolvedFirstContactYes();
    await adminPage.clickSave();

    // Step 8: Verify ticket status is updated to 'Closed'
    ticketStatus = await adminPage.getTicketStatus();
    expect(ticketStatus).toContain(TD.statuses.closed);

    // Step 9: Verify complete status transition history is recorded
    const statusHistory = await adminPage.getStatusHistory();
    expect(statusHistory).toContain(TD.statuses.new);
    expect(statusHistory).toContain(TD.statuses.ongoing);
    expect(statusHistory).toContain(TD.statuses.closed);
  });
});