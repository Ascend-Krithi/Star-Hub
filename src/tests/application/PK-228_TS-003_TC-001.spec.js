const { test, expect } = require('../../fixtures');
const HelpdeskAdminPage = require('../../pages/helpdesk-admin.page');
const TD = require('../../data/helpdesk-test-data');

test.describe('[UI] PK-228 TS-003: Ticket Classification - 3-Level Classification', { tag: ['@regression'] }, () => {
  let adminPage;

  test('[PK-228 TS-003 TC-001] Admin successfully classifies a ticket using 3-level classification', async ({ page }) => {
    adminPage = new HelpdeskAdminPage(page);

    // Step 1: Launch the Admin Portal URL
    await adminPage.goto();
    await expect(page).toHaveURL(TD.urlPatterns.adminDashboard);

    // Step 2: Enter admin credentials and login
    await adminPage.login(TD.credentials.admin.username, TD.credentials.admin.password);
    const isDashboardVisible = await adminPage.isDashboardVisible();
    expect(isDashboardVisible).toBe(true);

    // Step 3: Navigate to Ticket Queue
    await adminPage.navigateToTicketQueue();
    await expect(page).toHaveURL(TD.urlPatterns.ticketQueue);

    // Step 4: Filter and select a ticket with 'New' status
    await adminPage.selectTicket('2026051512123');
    const ticketStatus = await adminPage.getTicketStatus();
    expect(ticketStatus).toContain(TD.statuses.new);

    // Step 5: Click on Classification dropdown (Level 1)
    // Step 6: Select 'INQUIRY' from Classification dropdown
    await adminPage.selectClassification(TD.classification.level1.inquiry);

    // Step 7: Click on Request Type dropdown (Level 2)
    // Step 8: Select 'General Inquiry' from Request Type dropdown
    await adminPage.selectRequestType(TD.classification.level2.generalInquiry);

    // Step 9: Click on Details dropdown (Level 3)
    // Step 10: Select 'Recall only' from Details dropdown
    await adminPage.selectDetails(TD.classification.level3.recallOnly);

    // Step 11: Click Save button
    await adminPage.clickSave();

    // Step 11 Expected: Ticket classification is saved successfully
    const successMessage = await adminPage.getSuccessMessage();
    expect(successMessage).toBeTruthy();

    // Step 12: Verify the ticket shows updated classification
    const pageContent = await page.textContent('body');
    expect(pageContent).toContain(TD.classification.level1.inquiry);
    expect(pageContent).toContain(TD.classification.level2.generalInquiry);
    expect(pageContent).toContain(TD.classification.level3.recallOnly);
  });
});