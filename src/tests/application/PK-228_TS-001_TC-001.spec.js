const { test, expect } = require('../../fixtures');
const HelpdeskSubmitTicketPage = require('../../pages/helpdesk-submit-ticket.page');
const TD = require('../../data/helpdesk-test-data');

test.describe('[UI] PK-228 TS-001: Submit Ticket - Successful Submission', { tag: ['@smoke', '@regression'] }, () => {
  let submitTicketPage;

  test('[PK-228 TS-001 TC-001] Vendor successfully submits a ticket with all mandatory fields', async ({ page }) => {
    submitTicketPage = new HelpdeskSubmitTicketPage(page);

    // Step 1: Launch the Helpdesk Portal URL
    await submitTicketPage.goto();
    await expect(page).toHaveURL(TD.urlPatterns.helpdeskHome);

    // Step 2: Navigate to Submit Ticket Form
    await submitTicketPage.navigateToSubmitTicketForm();
    await expect(page.locator('form, [class*="submit-ticket"]')).toBeVisible();

    // Step 3: Enter Full Name
    await submitTicketPage.fillFullName(TD.ticketData.vendor.fullName);

    // Step 4: Enter Phone Number
    await submitTicketPage.fillPhoneNumber(TD.ticketData.vendor.phoneNumber);

    // Step 5: Enter Email Address (mandatory)
    await submitTicketPage.fillEmail(TD.ticketData.vendor.email);

    // Step 6: Enter Company Name (mandatory)
    await submitTicketPage.fillCompanyName(TD.ticketData.vendor.companyName);

    // Step 7: Enter Title Message (mandatory)
    await submitTicketPage.fillTitleMessage(TD.ticketData.vendor.titleMessage);

    // Step 8: Enter question (mandatory)
    await submitTicketPage.fillQuestion(TD.ticketData.vendor.question);

    // Step 9: Click Submit button
    await submitTicketPage.clickSubmit();

    // Step 9 Expected: Ticket is submitted successfully and confirmation message is displayed
    const confirmationMessage = await submitTicketPage.getConfirmationMessage();
    expect(confirmationMessage).toBeTruthy();

    // Step 10: Verify the ticket reference format
    const ticketReference = await submitTicketPage.getTicketReference();
    expect(ticketReference).toMatch(TD.ticketReferenceFormat);

    // Step 11: Verify timestamp is auto-generated for Date Submitted
    const isDateSubmittedVisible = await submitTicketPage.isDateSubmittedDisplayed();
    expect(isDateSubmittedVisible).toBe(true);
  });
});