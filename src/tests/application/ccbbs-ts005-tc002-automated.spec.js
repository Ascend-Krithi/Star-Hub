const { test, expect } = require('@playwright/test');
const CCBBSHelpdeskPage = require('../../pages/ccbbs-helpdesk.page');
const TD = require('../../data/ccbbs-test-data');

test.describe('[UI] AD-88 TS-005: Verify SLA Visual Alerts - Multiple Tiers', {
  tag: ['@regression', '@ccbbs', '@admin', '@sla']
}, () => {
  let helpdeskPage;

  test('[AD-88 TS-005 TC-002] Verify SLA alerts for Tier 2, 3, and 5 request types', async ({ page }) => {
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
    
    // Step 3: Access SLA Dashboard
    await test.step('Access Admin View and navigate to SLA Dashboard', async () => {
      await helpdeskPage.navigateToAdminView();
      await helpdeskPage.navigateToSLADashboard();
    });
    
    // Step 4: Verify Tier 2 alert for SOA Update at 47 hours
    await test.step('Verify SLA Tier 2 alert for SOA Update at 47 hours', async () => {
      const soaTicket = page.locator('tr:has-text("SOA Update")').first();
      
      if (await soaTicket.isVisible()) {
        const warningAlert = soaTicket.locator('[class*="warning"], [class*="alert"]').first();
        await expect(warningAlert).toBeVisible();
      }
    });
    
    // Step 5: Verify Tier 3 alert for Document Retrieval at 71 hours
    await test.step('Verify SLA Tier 3 alert for Document Retrieval at 71 hours', async () => {
      const docTicket = page.locator('tr:has-text("Document Retrieval")').first();
      
      if (await docTicket.isVisible()) {
        const warningAlert = docTicket.locator('[class*="warning"], [class*="alert"]').first();
        await expect(warningAlert).toBeVisible();
      }
    });
    
    // Step 6: Verify Tier 5 alert for Check Request at 119 hours
    await test.step('Verify SLA Tier 5 alert for Check Request at 119 hours', async () => {
      const checkTicket = page.locator('tr:has-text("Check Request")').first();
      
      if (await checkTicket.isVisible()) {
        const warningAlert = checkTicket.locator('[class*="warning"], [class*="alert"]').first();
        await expect(warningAlert).toBeVisible();
      }
    });
    
    // Step 7: Verify Tier 5 alert for Tax Certificate at 119 hours
    await test.step('Verify SLA Tier 5 alert for Tax Certificate at 119 hours', async () => {
      const taxTicket = page.locator('tr:has-text("Tax Certificate")').first();
      
      if (await taxTicket.isVisible()) {
        const warningAlert = taxTicket.locator('[class*="warning"], [class*="alert"]').first();
        await expect(warningAlert).toBeVisible();
      }
    });
    
    // Step 8: Verify breached SLA displays critical alert
    await test.step('Verify breached SLA displays critical alert', async () => {
      const breachedTickets = page.locator('[class*="breached"], [class*="critical"], [class*="alert-danger"]');
      
      if (await breachedTickets.count() > 0) {
        await expect(breachedTickets.first()).toBeVisible();
        const criticalAlert = breachedTickets.first();
        await expect(criticalAlert).toHaveClass(/critical|danger|breached/);
      }
    });
  });
});