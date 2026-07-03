const { test, expect } = require('../../fixtures');
const HelpdeskAdminPage = require('../../pages/helpdesk-admin.page');
const TD = require('../../data/helpdesk-test-data');

test.describe('[UI] PK-228 TS-005: Ticket Closure - Successful Closure', { tag: ['@regression'] }, () => {
  let adminPage;

  test('[PK-228 TS-005 TC-001] Admin successfully closes a ticket with all mandatory fields', async ({ page }) => {
    adminPage = new HelpdeskAdminPage(page);

    // Step 1: Launch the Admin Portal URL
    await adminPage.goto();
    await expect(page).toHaveURL(TD.urlPatterns.adminDashboard);

    // Step 2: Enter admin credentials and login
    await adminPage.login(TD.credentials.admin.username, TD.credentials.admin.password);
    const isDashboardVisible = await adminPage.isDashboardVisible();
    expect(isDashboardVisible).toBe(true);

    // Step 3: Navigate to Ticket Queue and open a ticket in 'On-going' status
    await adminPage.navigateToTicketQueue();
    await adminPage.selectTicket('2026051512124');
    const ticketStatus = await adminPage.getTicketStatus();
    expect(ticketStatus).toContain(TD.statuses.ongoing);

    // Step 4: Enter Vendor Code (mandatory)
    await adminPage.fillVendorCode(TD.ticketData.vendorCode);

    // Step 5: Enter Vendor Name (mandatory)
    await adminPage.fillVendorName(TD.ticketData.vendorName);

    // Step 6: Select Resolution Status from dropdown
    // Step 7: Select 'Closed' from Resolution Status dropdown
    await adminPage.selectResolutionStatus(TD.statuses.closed);

    // Step 8: Select 'Yes' for 'Resolved at First Contact' field
    await adminPage.selectResolvedFirstContactYes();

    // Step 9: Click Close Ticket button
    await adminPage.clickCloseTicket();

    // Step 9 Expected: Ticket is closed successfully and confirmation message is displayed
    const successMessage = await adminPage.getSuccessMessage();
    expect(successMessage).toBeTruthy();

    // Step 10: Verify Date Closed timestamp is auto-generated
    const isDateClosedVisible = await adminPage.isDateClosedDisplayed();
    expect(isDateClosedVisible).toBe(true);

    // Step 11: Verify ticket status changes to 'Closed'
    const updatedStatus = await adminPage.getTicketStatus();
    expect(updatedStatus).toContain(TD.statuses.closed);
  });
});