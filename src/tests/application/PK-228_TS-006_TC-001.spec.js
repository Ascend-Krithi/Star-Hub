const { test, expect } = require('../../fixtures');
const HelpdeskAdminPage = require('../../pages/helpdesk-admin.page');
const TD = require('../../data/helpdesk-test-data');

test.describe('[UI] PK-228 TS-006: Ticket Closure - Validation for Missing Mandatory Fields', { tag: ['@regression'] }, () => {
  let adminPage;

  test('[PK-228 TS-006 TC-001] Ticket closure fails when Vendor Code and Vendor Name are empty', async ({ page }) => {
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
    await adminPage.selectTicket('2026051512125');
    const ticketStatus = await adminPage.getTicketStatus();
    expect(ticketStatus).toContain(TD.statuses.ongoing);

    // Step 4: Leave Vendor Code field empty (mandatory field)
    // Step 5: Leave Vendor Name field empty (mandatory field)
    // Fields are intentionally not filled

    // Step 6: Select 'Closed' from Resolution Status dropdown
    await adminPage.selectResolutionStatus(TD.statuses.closed);

    // Step 7: Select 'Yes' for 'Resolved at First Contact' field
    await adminPage.selectResolvedFirstContactYes();

    // Step 8: Click Close Ticket button
    await adminPage.clickCloseTicket();

    // Step 8 Expected: Ticket closure fails and validation error message is displayed
    const isErrorVisible = await adminPage.isErrorMessageVisible();
    expect(isErrorVisible).toBe(true);

    // Step 9: Verify validation error message for Vendor Code
    // Step 10: Verify validation error message for Vendor Name
    const errorMessage = await adminPage.getErrorMessage();
    const hasVendorCodeError = errorMessage.includes(TD.errors.vendorCodeRequired);
    const hasVendorNameError = errorMessage.includes(TD.errors.vendorNameRequired);
    expect(hasVendorCodeError || hasVendorNameError).toBe(true);

    // Step 11: Verify ticket remains in 'On-going' status
    const currentStatus = await adminPage.getTicketStatus();
    expect(currentStatus).toContain(TD.statuses.ongoing);
  });
});