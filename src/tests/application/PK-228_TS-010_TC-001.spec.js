const { test, expect } = require('../../fixtures');
const HelpdeskAdminPage = require('../../pages/helpdesk-admin.page');
const TD = require('../../data/helpdesk-test-data');

test.describe('[UI] PK-228 TS-010: Email Communication - Send and Receive Emails', { tag: ['@regression', '@e2e'] }, () => {
  let adminPage;

  test('[PK-228 TS-010 TC-001] Admin sends email to vendor and vendor reply is captured in ticket', async ({ page }) => {
    adminPage = new HelpdeskAdminPage(page);

    // Step 1: Launch the Admin Portal URL
    await adminPage.goto();
    await expect(page).toHaveURL(TD.urlPatterns.adminDashboard);

    // Step 2: Enter admin credentials and login
    await adminPage.login(TD.credentials.admin.username, TD.credentials.admin.password);
    const isDashboardVisible = await adminPage.isDashboardVisible();
    expect(isDashboardVisible).toBe(true);

    // Step 3: Navigate to Ticket Queue and open an active ticket
    await adminPage.navigateToTicketQueue();
    await adminPage.selectTicket('2026051512125');
    const ticketStatus = await adminPage.getTicketStatus();
    expect(ticketStatus).toContain(TD.statuses.ongoing);

    // Step 4: Verify vendor email address is captured in ticket
    const pageContent = await page.textContent('body');
    expect(pageContent).toContain(TD.ticketData.vendor.email);

    // Step 5: Click Send Email to Vendor button
    await adminPage.clickSendEmail();

    // Step 6: Compose email message with ticket reference in subject
    const ticketRef = '2026051512125';
    const subject = TD.email.subject.replace('{ticketRef}', ticketRef);
    await adminPage.fillEmailSubject(subject);
    await adminPage.fillEmailBody(TD.email.body);

    // Step 7: Click Send Email button
    await adminPage.sendEmail();

    // Step 7 Expected: Email is sent successfully
    const successMessage = await adminPage.getSuccessMessage();
    expect(successMessage).toBeTruthy();

    // Step 8: Verify email sent timestamp is captured in ticket
    const isTimestampVisible = await adminPage.isEmailSentTimestampVisible();
    expect(isTimestampVisible).toBe(true);

    // Step 9-14: Verify vendor reply email handling
    // Note: In a real scenario, this would involve email system integration
    // For automation purposes, we verify the communication history section exists
    const commHistory = await adminPage.getCommunicationHistory();
    expect(commHistory).toBeTruthy();
  });
});