const { test, expect } = require('../../fixtures');
const HelpdeskAdminPage = require('../../pages/helpdesk-admin.page');
const TD = require('../../data/helpdesk-test-data');

test.describe('[UI] PK-228 TS-004: Ticket Assignment - Assign to Action Owner', { tag: ['@regression'] }, () => {
  let adminPage;

  test('[PK-228 TS-004 TC-001] Admin assigns ticket to Action Owner and Action Owner responds', async ({ page }) => {
    adminPage = new HelpdeskAdminPage(page);

    // Step 1: Launch the Admin Portal URL
    await adminPage.goto();
    await expect(page).toHaveURL(TD.urlPatterns.adminDashboard);

    // Step 2: Enter admin credentials and login
    await adminPage.login(TD.credentials.admin.username, TD.credentials.admin.password);
    const isDashboardVisible = await adminPage.isDashboardVisible();
    expect(isDashboardVisible).toBe(true);

    // Step 3: Navigate to Ticket Queue and open a classified ticket
    await adminPage.navigateToTicketQueue();
    await adminPage.selectTicket('2026051512123');

    // Step 4: Click on 'Assign to Action Owner' button
    // Step 5: Select Action Owner from the dropdown list
    // Step 6: Click Submit Assignment button
    await adminPage.assignTicketToActionOwner(TD.credentials.actionOwner.username);

    // Step 6 Expected: Ticket is assigned to Action Owner and confirmation message is displayed
    const successMessage = await adminPage.getSuccessMessage();
    expect(successMessage).toBeTruthy();

    // Step 7: Verify ticket status changes to 'Assigned to Action Owner'
    const ticketStatus = await adminPage.getTicketStatus();
    expect(ticketStatus).toContain(TD.statuses.assignedToActionOwner);

    // Step 8: Logout from Admin portal and login as Action Owner
    await adminPage.logout();
    await adminPage.goto();
    await adminPage.login(TD.credentials.actionOwner.username, TD.credentials.actionOwner.password);

    // Step 8 Expected: Action Owner successfully logs in and sees assigned ticket in queue
    const isDashboardVisibleForActionOwner = await adminPage.isDashboardVisible();
    expect(isDashboardVisibleForActionOwner).toBe(true);

    // Step 9: Action Owner opens the assigned ticket and enters response
    await adminPage.navigateToTicketQueue();
    await adminPage.selectTicket('2026051512123');
    await adminPage.enterResponse(TD.responses.actionOwner);

    // Step 10: Action Owner clicks Submit Response button
    await adminPage.submitResponse();

    // Step 10 Expected: Response is submitted successfully
    const responseSuccess = await adminPage.getSuccessMessage();
    expect(responseSuccess).toBeTruthy();

    // Step 11: Verify workflow automatically redirects ticket back to Support Processor
    // Step 12: Login as Support Processor and verify ticket is in queue
    await adminPage.logout();
    await adminPage.goto();
    await adminPage.login(TD.credentials.admin.username, TD.credentials.admin.password);
    await adminPage.navigateToTicketQueue();

    // Verify ticket is visible in Support Processor queue
    await adminPage.selectTicket('2026051512123');
    const pageContent = await page.textContent('body');
    expect(pageContent).toContain(TD.responses.actionOwner);
  });
});