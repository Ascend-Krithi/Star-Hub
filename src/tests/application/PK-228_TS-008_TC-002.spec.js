const { test, expect } = require('../../fixtures');
const HelpdeskAdminPage = require('../../pages/helpdesk-admin.page');
const TD = require('../../data/helpdesk-test-data');

test.describe('[UI] PK-228 TS-008: Status Transition - Invalid Status Change', { tag: ['@regression'] }, () => {
  let adminPage;

  test('[PK-228 TS-008 TC-002] System prevents invalid status transition from New directly to Closed', async ({ page }) => {
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
    await adminPage.selectTicket('2026051512126');
    const ticketStatus = await adminPage.getTicketStatus();
    expect(ticketStatus).toContain(TD.statuses.new);

    // Step 4: Attempt to change ticket status directly from 'New' to 'Closed'
    await adminPage.changeTicketStatus(TD.statuses.closed);

    // Step 5: Verify validation error message is displayed
    const isErrorVisible = await adminPage.isErrorMessageVisible();
    expect(isErrorVisible).toBe(true);

    const errorMessage = await adminPage.getErrorMessage();
    expect(errorMessage).toContain(TD.errors.invalidStatusTransition);

    // Step 6: Verify ticket remains in 'New' status
    const currentStatus = await adminPage.getTicketStatus();
    expect(currentStatus).toContain(TD.statuses.new);
  });
});