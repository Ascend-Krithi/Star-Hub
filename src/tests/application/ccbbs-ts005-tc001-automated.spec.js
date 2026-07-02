const { test, expect } = require('@playwright/test');
const CCBBSHelpdeskPage = require('../../pages/ccbbs-helpdesk.page');
const TD = require('../../data/ccbbs-test-data');

test.describe('[UI] AD-88 TS-005: Verify SLA Visual Alerts - Tier 1', {
  tag: ['@regression', '@ccbbs', '@admin', '@sla']
}, () => {
  let helpdeskPage;

  test('[AD-88 TS-005 TC-001] Verify SLA Tier 1 visual alert for tickets nearing deadline', async ({ page }) => {
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
    
    // Step 4: Navigate to SLA Dashboard
    await test.step('Navigate to SLA Dashboard/Monitor', async () => {
      await helpdeskPage.navigateToSLADashboard();
      const slaDashboard = page.locator('[class*="sla-dashboard"], [id*="sla"]').first();
      await expect(slaDashboard).toBeVisible();
    });
    
    // Step 5: Locate ticket with General Inquiry created 23 hours ago
    await test.step('Locate ticket with Request Type General Inquiry created 23 hours ago', async () => {
      const ticketRow = page.locator('tr:has-text("General Inquiry")').first();
      await expect(ticketRow).toBeVisible();
    });
    
    // Step 6: Verify SLA Tier 1 identification
    await test.step('Verify SLA Tier is identified as Tier 1 (1 Day)', async () => {
      const tierIndicator = page.locator('[class*="tier-1"], [data-tier="1"]').first();
      await expect(tierIndicator).toBeVisible();
      await expect(tierIndicator).toContainText(/Tier 1|1 Day/);
    });
    
    // Step 7: Verify visual warning alert
    await test.step('Verify visual warning alert is triggered', async () => {
      const warningAlert = page.locator('[class*="warning"], [class*="alert-warning"]').first();
      await expect(warningAlert).toBeVisible();
    });
    
    // Step 8: Verify remaining time calculation
    await test.step('Verify remaining time calculation is accurate', async () => {
      const remainingTime = await helpdeskPage.getSLARemainingTime();
      expect(remainingTime).toMatch(/1.*hour|60.*min/);
    });
    
    // Step 9: Verify alert for all Tier 1 request types
    await test.step('Verify alert applies to all SLA Tier 1 request types', async () => {
      const tier1RequestTypes = ['Invoice Payment Status', 'Vendor Resolution', 'Employee Claims'];
      
      for (const requestType of tier1RequestTypes) {
        const ticketRow = page.locator(`tr:has-text("${requestType}")`).first();
        const warningIndicator = ticketRow.locator('[class*="warning"], [class*="alert"]').first();
        
        if (await ticketRow.isVisible()) {
          await expect(warningIndicator).toBeVisible();
        }
      }
    });
  });
});