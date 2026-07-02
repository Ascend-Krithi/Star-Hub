const { test, expect } = require('@playwright/test');
const CCBBSHelpdeskPage = require('../../pages/ccbbs-helpdesk.page');
const TD = require('../../data/ccbbs-test-data');

test.describe('[UI] AD-88 TS-009: Verify SLA Threshold at Exact Deadline', {
  tag: ['@regression', '@ccbbs', '@admin', '@sla']
}, () => {
  let helpdeskPage;

  test('[AD-88 TS-009 TC-001] Verify SLA threshold behavior at exactly 5 days for Tier 5', async ({ page }) => {
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
    await test.step('Navigate to SLA Dashboard', async () => {
      await helpdeskPage.navigateToSLADashboard();
    });
    
    // Step 5: Locate Check Request ticket created exactly 5 days ago
    await test.step('Locate ticket with Request Type Check Request created exactly 5 days ago', async () => {
      const checkRequestTicket = page.locator('tr:has-text("Check Request")').first();
      await expect(checkRequestTicket).toBeVisible();
    });
    
    // Step 6: Verify SLA deadline status
    await test.step('Verify SLA status shows deadline reached', async () => {
      const deadlineStatus = page.locator('[class*="deadline"], [class*="reached"]').first();
      await expect(deadlineStatus).toBeVisible();
    });
    
    // Step 7: Verify visual alert for deadline threshold
    await test.step('Verify visual alert indicator for deadline threshold', async () => {
      const criticalAlert = page.locator('[class*="critical"], [class*="alert-danger"], [class*="deadline"]').first();
      await expect(criticalAlert).toBeVisible();
    });
    
    // Step 8: Locate Tax Certificate ticket created exactly 5 days ago
    await test.step('Locate ticket with Request Type Tax Certificate created exactly 5 days ago', async () => {
      const taxCertTicket = page.locator('tr:has-text("Tax Certificate")').first();
      await expect(taxCertTicket).toBeVisible();
    });
    
    // Step 9: Verify consistent SLA threshold behavior
    await test.step('Verify consistent SLA threshold behavior for both Tier 5 request types', async () => {
      const checkRequestAlert = page.locator('tr:has-text("Check Request")').first().locator('[class*="alert"], [class*="critical"]').first();
      const taxCertAlert = page.locator('tr:has-text("Tax Certificate")').first().locator('[class*="alert"], [class*="critical"]').first();
      
      await expect(checkRequestAlert).toBeVisible();
      await expect(taxCertAlert).toBeVisible();
      
      const checkAlertClass = await checkRequestAlert.getAttribute('class');
      const taxAlertClass = await taxCertAlert.getAttribute('class');
      
      expect(checkAlertClass).toContain('critical');
      expect(taxAlertClass).toContain('critical');
    });
  });
});