const { test, expect } = require('@playwright/test');
const CCBBSHelpdeskPage = require('../../pages/ccbbs-helpdesk.page');
const TD = require('../../data/ccbbs-test-data');

test.describe('[UI] AD-88 TS-007: Verify Report Extraction Schema', {
  tag: ['@regression', '@ccbbs', '@admin', '@reports']
}, () => {
  let helpdeskPage;

  test('[AD-88 TS-007 TC-001] Verify extracted report data contains all required columns', async ({ page }) => {
    helpdeskPage = new CCBBSHelpdeskPage(page);
    
    // Step 1: Launch application
    await test.step('Launch application URL', async () => {
      await helpdeskPage.goto(TD.urls.base);
    });
    
    // Step 2: Login with Admin credentials
    await test.step('Login with Admin credentials', async () => {
      await helpdeskPage.login(TD.credentials.admin.username, TD.credentials.admin.password);
      await page.waitForLoadState('networkidle');
    });
    
    // Step 3: Access Admin View
    await test.step('Access Admin View dashboard', async () => {
      await helpdeskPage.navigateToAdminView();
    });
    
    // Step 4: Navigate to Reports section
    await test.step('Navigate to Reports section', async () => {
      await helpdeskPage.navigateToReports();
      const reportsSection = page.locator('[href*="report"], a:has-text("Report")').first();
      await expect(reportsSection).toBeVisible();
    });
    
    // Step 5: Select Extract Data option
    await test.step('Select Extract Data or Generate Report option', async () => {
      const extractButton = page.getByRole('button', { name: /extract|generate|export/i }).first();
      await expect(extractButton).toBeVisible();
    });
    
    // Step 6: Execute data extraction
    await test.step('Execute data extraction query for all tickets', async () => {
      await helpdeskPage.extractData();
      await page.waitForLoadState('networkidle');
    });
    
    // Step 7-15: Verify all required columns
    await test.step('Verify extracted data contains Ticket Reference column', async () => {
      const headers = await helpdeskPage.getReportHeaders();
      expect(headers).toContain('Ticket Reference');
    });
    
    await test.step('Verify extracted data contains Full Name column', async () => {
      const headers = await helpdeskPage.getReportHeaders();
      expect(headers).toContain('Full Name');
    });
    
    await test.step('Verify extracted data contains Phone Number column', async () => {
      const headers = await helpdeskPage.getReportHeaders();
      expect(headers).toContain('Phone Number');
    });
    
    await test.step('Verify extracted data contains Email Address column', async () => {
      const headers = await helpdeskPage.getReportHeaders();
      expect(headers).toContain('Email Address');
    });
    
    await test.step('Verify extracted data contains Company Name column', async () => {
      const headers = await helpdeskPage.getReportHeaders();
      expect(headers).toContain('Company Name');
    });
    
    await test.step('Verify extracted data contains Title Message column', async () => {
      const headers = await helpdeskPage.getReportHeaders();
      expect(headers).toContain('Title Message');
    });
    
    await test.step('Verify extracted data contains Ask your Questions column', async () => {
      const headers = await helpdeskPage.getReportHeaders();
      expect(headers).toContain('Ask your Questions');
    });
    
    await test.step('Verify extracted data contains Status column', async () => {
      const headers = await helpdeskPage.getReportHeaders();
      expect(headers).toContain('Status');
    });
    
    await test.step('Verify extracted data contains Resolved at First Contact column', async () => {
      const headers = await helpdeskPage.getReportHeaders();
      expect(headers).toContain('Resolved at First Contact?');
    });
    
    // Step 16: Verify column order
    await test.step('Verify column order matches Report Extraction rev1 schema', async () => {
      const headers = await helpdeskPage.getReportHeaders();
      const expectedOrder = TD.reportHeaders;
      
      for (let i = 0; i < expectedOrder.length; i++) {
        expect(headers[i]).toBe(expectedOrder[i]);
      }
    });
  });
});