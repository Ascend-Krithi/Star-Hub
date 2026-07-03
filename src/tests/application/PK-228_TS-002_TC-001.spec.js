const { test, expect } = require('../../fixtures');
const HelpdeskSubmitTicketPage = require('../../pages/helpdesk-submit-ticket.page');
const TD = require('../../data/helpdesk-test-data');

test.describe('[UI] PK-228 TS-002: Submit Ticket - Validation for Missing Email', { tag: ['@regression'] }, () => {
  let submitTicketPage;

  test('[PK-228 TS-002 TC-001] Ticket submission fails when Email Address field is empty', async ({ page }) => {
    submitTicketPage = new HelpdeskSubmitTicketPage(page);

    // Step 1: Launch the Helpdesk Portal URL
    await submitTicketPage.goto();
    await expect(page).toHaveURL(TD.urlPatterns.helpdeskHome);

    // Step 2: Navigate to Submit Ticket Form
    await submitTicketPage.navigateToSubmitTicketForm();
    await expect(page.locator('form, [class*="submit-ticket"]')).toBeVisible();

    // Step 3: Enter Full Name
    await submitTicketPage.fillFullName(TD.ticketData.vendor2.fullName);

    // Step 4: Leave Email Address field empty (mandatory field)
    // Email field is intentionally not filled

    // Step 5: Enter Company Name
    await submitTicketPage.fillCompanyName(TD.ticketData.vendor2.companyName);

    // Step 6: Enter Title Message
    await submitTicketPage.fillTitleMessage(TD.ticketData.vendor2.titleMessage);

    // Step 7: Enter question
    await submitTicketPage.fillQuestion(TD.ticketData.vendor2.question);

    // Step 8: Click Submit button
    await submitTicketPage.clickSubmit();

    // Step 8 Expected: Ticket submission fails and validation error message is displayed
    const isErrorVisible = await submitTicketPage.isValidationErrorVisible();
    expect(isErrorVisible).toBe(true);

    // Step 9: Verify the validation error message
    const errorMessage = await submitTicketPage.getValidationError();
    expect(errorMessage).toContain(TD.errors.emailRequired);

    // Step 10: Verify ticket is not created
    await expect(page).toHaveURL(TD.urlPatterns.helpdeskHome);
  });
});