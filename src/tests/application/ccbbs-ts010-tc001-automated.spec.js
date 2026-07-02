const { test, expect } = require('@playwright/test');
const CCBBSHelpdeskPage = require('../../pages/ccbbs-helpdesk.page');
const TD = require('../../data/ccbbs-test-data');

test.describe('[UI] AD-88 TS-010: Verify Ticket Reference ID Uniqueness', {
  tag: ['@regression', '@ccbbs', '@critical']
}, () => {
  let helpdeskPage;

  test('[AD-88 TS-010 TC-001] Verify unique ticket reference IDs across midnight and concurrent submissions', async ({ page, context }) => {
    helpdeskPage = new CCBBSHelpdeskPage(page);
    
    // Step 1: Launch application
    await test.step('Launch application URL', async () => {
      await helpdeskPage.goto(TD.urls.base);
    });
    
    // Step 2: Access User View at 23:59:50
    await test.step('Access User View Submission Form at 23:59:50', async () => {
      await page.waitForLoadState('domcontentloaded');
    });
    
    // Step 3-4: Fill and submit first form at 23:59:59
    await test.step('Fill and submit first form at 23:59:59', async () => {
      await helpdeskPage.fillFullName('User1');
      await helpdeskPage.fillPhoneNumber('1111111111');
      await helpdeskPage.fillEmailAddress('user1@test.com');
      await helpdeskPage.fillCompanyName('Test1');
      await helpdeskPage.fillTitleMessage('Test1');
      await helpdeskPage.fillAskQuestions('Test1');
      await helpdeskPage.clickSubmit();
      await page.waitForLoadState('networkidle');
    });
    
    // Step 5: Capture first ticket reference ID
    await test.step('Capture generated Ticket Reference ID for first submission', async () => {
      const ticketRef1 = await helpdeskPage.getTicketReferenceId();
      expect(ticketRef1).toMatch(TD.ticketReferenceFormat);
      expect(ticketRef1).toHaveLength(14);
      
      // Store for later comparison
      page.ticketRef1 = ticketRef1;
    });
    
    // Step 6: Open new browser session at 00:00:00
    await test.step('Open another browser session at 00:00:00', async () => {
      const newPage = await context.newPage();
      const helpdeskPage2 = new CCBBSHelpdeskPage(newPage);
      await helpdeskPage2.goto(TD.urls.base);
      await newPage.waitForLoadState('domcontentloaded');
      
      // Step 7-8: Fill and submit second form
      await helpdeskPage2.fillFullName('User2');
      await helpdeskPage2.fillPhoneNumber('2222222222');
      await helpdeskPage2.fillEmailAddress('user2@test.com');
      await helpdeskPage2.fillCompanyName('Test2');
      await helpdeskPage2.fillTitleMessage('Test2');
      await helpdeskPage2.fillAskQuestions('Test2');
      await helpdeskPage2.clickSubmit();
      await newPage.waitForLoadState('networkidle');
      
      // Step 9: Capture second ticket reference ID
      const ticketRef2 = await helpdeskPage2.getTicketReferenceId();
      expect(ticketRef2).toMatch(TD.ticketReferenceFormat);
      expect(ticketRef2).toHaveLength(14);
      
      // Step 10: Verify both IDs are unique
      expect(ticketRef2).not.toBe(page.ticketRef1);
      
      await newPage.close();
    });
    
    // Step 11-12: Test concurrent submissions
    await test.step('Submit multiple forms simultaneously at same timestamp', async () => {
      const page1 = await context.newPage();
      const page2 = await context.newPage();
      const page3 = await context.newPage();
      
      const helpdesk1 = new CCBBSHelpdeskPage(page1);
      const helpdesk2 = new CCBBSHelpdeskPage(page2);
      const helpdesk3 = new CCBBSHelpdeskPage(page3);
      
      // Navigate all pages
      await Promise.all([
        helpdesk1.goto(TD.urls.base),
        helpdesk2.goto(TD.urls.base),
        helpdesk3.goto(TD.urls.base),
      ]);
      
      // Submit all forms concurrently
      await Promise.all([
        helpdesk1.submitUserForm({
          fullName: 'Concurrent1',
          phoneNumber: '3333333333',
          emailAddress: 'concurrent1@test.com',
          companyName: 'Concurrent1',
          titleMessage: 'Concurrent1',
          askQuestions: 'Concurrent1',
        }),
        helpdesk2.submitUserForm({
          fullName: 'Concurrent2',
          phoneNumber: '4444444444',
          emailAddress: 'concurrent2@test.com',
          companyName: 'Concurrent2',
          titleMessage: 'Concurrent2',
          askQuestions: 'Concurrent2',
        }),
        helpdesk3.submitUserForm({
          fullName: 'Concurrent3',
          phoneNumber: '5555555555',
          emailAddress: 'concurrent3@test.com',
          companyName: 'Concurrent3',
          titleMessage: 'Concurrent3',
          askQuestions: 'Concurrent3',
        }),
      ]);
      
      // Wait for all submissions to complete
      await Promise.all([
        page1.waitForLoadState('networkidle'),
        page2.waitForLoadState('networkidle'),
        page3.waitForLoadState('networkidle'),
      ]);
      
      // Get all ticket reference IDs
      const ticketRef1 = await helpdesk1.getTicketReferenceId();
      const ticketRef2 = await helpdesk2.getTicketReferenceId();
      const ticketRef3 = await helpdesk3.getTicketReferenceId();
      
      // Verify all are unique
      expect(ticketRef1).not.toBe(ticketRef2);
      expect(ticketRef2).not.toBe(ticketRef3);
      expect(ticketRef1).not.toBe(ticketRef3);
      
      // Verify sequential numbering in last 2 digits
      const seq1 = parseInt(ticketRef1.slice(-2));
      const seq2 = parseInt(ticketRef2.slice(-2));
      const seq3 = parseInt(ticketRef3.slice(-2));
      
      const sequences = [seq1, seq2, seq3].sort((a, b) => a - b);
      expect(sequences[1]).toBe(sequences[0] + 1);
      expect(sequences[2]).toBe(sequences[1] + 1);
      
      await page1.close();
      await page2.close();
      await page3.close();
    });
  });
});