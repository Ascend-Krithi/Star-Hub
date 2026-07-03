const { test, expect } = require('../../fixtures');
const HelpdeskSubmitTicketPage = require('../../pages/helpdesk-submit-ticket.page');
const TD = require('../../data/helpdesk-test-data');

test.describe('[UI] PK-228 TS-002: Submit Ticket - Validation for Missing Company Name', { tag: ['@regression'] }, () => {
  let submitTicketPage;

  test('[PK-228 TS-002 TC-002] Ticket submission fails when Company Name field is empty', async ({ page }) => {
    submitTicketPage = new HelpdeskSubmitTicketPage(page);

    // Step 1: Launch the Helpdesk Portal URL
    await submitTicketPage.goto();
    await expect(page).toHaveURL(TD.urlPatterns.helpdeskHome);

    // Step 2: Navigate to Submit Ticket Form
    await submitTicketPage.navigateToSubmitTicketForm();
    await expect(page.locator('form, [class*="submit-ticket"]')).toBeVisible();

    // Step 3: Enter Email Address
    await submitTicketPage.fillEmail(TD.ticketData.vendor2.email);

    // Step 4: Leave Company Name field empty (mandatory field)
    // Company Name field is intentionally not filled

    // Step 5: Enter Title Message
    await submitTicketPage.fillTitleMessage(TD.ticketData.vendor2.titleMessage);

    // Step 6: Enter question
    await submitTicketPage.fillQuestion(TD.ticketData.vendor2.question);

    // Step 7: Click Submit button
    await submitTicketPage.clickSubmit();

    // Step 7 Expected: Ticket submission fails and validation error message is displayed
    const isErrorVisible = await submitTicketPage.isValidationErrorVisible();
    expect(isErrorVisible).toBe(true);

    // Step 8: Verify the validation error message
    const errorMessage = await submitTicketPage.getValidationError();
    expect(errorMessage).toContain(TD.errors.companyNameRequired);
  });
});