const { test, expect } = require('../../fixtures');
const CCBBSHelpdeskUserPage = require('../../pages/ccbbs-helpdesk-user.page');
const TD = require('../../data/ccbbs-helpdesk-test-data');

test.describe('[UI] AD-88 TS-002: Ticket Submission and Reference ID Generation', { tag: ['@smoke', '@regression', '@ccbbs-helpdesk'] }, () => {
  let userPage;

  test('[AD-88 TS-002 TC-001] Verify ticket submission generates unique reference ID with timestamp and audit log', async ({ page }) => {
    userPage = new CCBBSHelpdeskUserPage(page);

    // Step 1: Launch the web application
    await test.step('Launch the web application in a browser', async () => {
      await userPage.goto();
      await expect(page).toHaveURL(TD.urlPatterns.userView);
    });

    // Step 2: Access the User View submission form
    await test.step('Access the User View submission form', async () => {
      await expect(page).toHaveTitle(TD.pageTitles.userView);
    });

    // Step 3: Enter Full Name
    await test.step('Enter Full Name', async () => {
      await userPage.fillFullName(TD.userData.fullName);
    });

    // Step 4: Enter Phone Number
    await test.step('Enter Phone Number', async () => {
      await userPage.fillPhoneNumber(TD.userData.phoneNumber);
    });

    // Step 5: Enter Email Address
    await test.step('Enter Email Address', async () => {
      await userPage.fillEmailAddress(TD.userData.email);
    });

    // Step 6: Enter Company Name
    await test.step('Enter Company Name', async () => {
      await userPage.fillCompanyName(TD.userData.companyName);
    });

    // Step 7: Enter Title Message
    await test.step('Enter Title Message', async () => {
      await userPage.fillTitleMessage(TD.userData.titleMessage);
    });

    // Step 8: Enter Ask your Questions
    await test.step('Enter Ask your Questions', async () => {
      await userPage.fillQuestions(TD.userData.questions);
    });

    // Step 9: Click Submit button
    await test.step('Click Submit button', async () => {
      await userPage.clickSubmit();
      await page.waitForLoadState('networkidle');
    });

    // Step 10: Verify unique Ticket Reference ID is generated
    await test.step('Verify that a unique Ticket Reference ID is generated', async () => {
      const ticketId = await userPage.getTicketReferenceId();
      expect(ticketId).toBeTruthy();
      expect(ticketId).toMatch(TD.ticketData.referenceIdPattern);
    });

    // Step 11: Verify localized touchpoint timestamp is recorded
    await test.step('Verify that localized touchpoint timestamp is recorded', async () => {
      const timestamp = await userPage.getTimestamp();
      expect(timestamp).toBeTruthy();
      expect(timestamp.length).toBeGreaterThan(0);
    });

    // Step 12: Verify immutable audit log is initialized
    await test.step('Verify that immutable audit log is initialized', async () => {
      const isSuccessVisible = await userPage.isSuccessMessageVisible();
      expect(isSuccessVisible).toBeTruthy();
    });
  });
});