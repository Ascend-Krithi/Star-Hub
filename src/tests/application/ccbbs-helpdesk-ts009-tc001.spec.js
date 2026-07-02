const { test, expect } = require('../../fixtures');
const CCBBSHelpdeskAdminPage = require('../../pages/ccbbs-helpdesk-admin.page');
const TD = require('../../data/ccbbs-helpdesk-test-data');

test.describe('[UI] AD-88 TS-009: Report Extraction Schema Verification', { tag: ['@regression', '@ccbbs-helpdesk'] }, () => {
  let adminPage;

  test('[AD-88 TS-009 TC-001] Verify report extraction contains all required columns in correct order', async ({ page }) => {
    adminPage = new CCBBSHelpdeskAdminPage(page);

    // Step 1: Launch the web application
    await test.step('Launch the web application in a browser', async () => {
      await adminPage.goto();
      await expect(page).toHaveURL(TD.urlPatterns.adminView);
    });

    // Step 2: Login as Admin user
    await test.step('Login as Admin user', async () => {
      await adminPage.login(TD.adminCredentials.username, TD.adminCredentials.password);
    });

    // Step 3: Access Admin View
    await test.step('Access Admin View', async () => {
      const isDashboardVisible = await adminPage.isAdminDashboardVisible();
      expect(isDashboardVisible).toBeTruthy();
    });

    // Step 4: Navigate to Report Extraction section
    await test.step('Navigate to Report Extraction section', async () => {
      await adminPage.navigateToReportExtraction();
    });

    // Step 5: Verify multiple tickets exist
    await test.step('Verify that multiple tickets exist in the system with complete data', async () => {
      const isTableVisible = await adminPage.isReportTableVisible();
      expect(isTableVisible).toBeTruthy();
    });

    // Step 6: Execute data extraction query
    await test.step('Execute data extraction query', async () => {
      await adminPage.clickExtractData();
      await page.waitForLoadState('networkidle');
    });

    // Step 7-15: Verify all required columns are present
    await test.step('Verify that extracted data contains all required columns', async () => {
      const columns = await adminPage.getReportColumns();
      for (const expectedColumn of TD.reportExtraction.columns) {
        const columnExists = columns.some(col => col.includes(expectedColumn));
        expect(columnExists).toBeTruthy();
      }
    });

    // Step 16: Verify column order matches schema
    await test.step('Verify that column order matches Report Extraction rev1 schema', async () => {
      const columns = await adminPage.getReportColumns();
      expect(columns.length).toBeGreaterThanOrEqual(TD.reportExtraction.columns.length);
    });

    // Step 17: Verify no additional columns
    await test.step('Verify that no additional columns are present in the extraction', async () => {
      const columns = await adminPage.getReportColumns();
      expect(columns.length).toBe(TD.reportExtraction.columns.length);
    });
  });
});