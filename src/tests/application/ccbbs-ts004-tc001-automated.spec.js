const { test, expect } = require('@playwright/test');
const CCBBSHelpdeskPage = require('../../pages/ccbbs-helpdesk.page');
const TD = require('../../data/ccbbs-test-data');

test.describe('[UI] AD-88 TS-004: Verify Dropdown Options in Admin View', {
  tag: ['@regression', '@ccbbs', '@admin']
}, () => {
  let helpdeskPage;

  test('[AD-88 TS-004 TC-001] Verify all dropdown options are displayed correctly', async ({ page }) => {
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
    
    // Step 4: Open existing ticket
    await test.step('Open existing ticket for editing', async () => {
      const ticketId = '01152512300001';
      await helpdeskPage.searchTicket(ticketId);
      await helpdeskPage.selectTicket(ticketId);
    });
    
    // Step 5-6: Verify Level 1 options
    await test.step('Click on Classification Level 1 dropdown and verify options', async () => {
      const classificationDropdown = page.locator('[name="classificationLevel1"], [id="classification"]').first();
      await classificationDropdown.click();
      
      const options = await helpdeskPage.getDropdownOptions(classificationDropdown);
      
      for (const expectedOption of TD.classificationLevel1Options) {
        expect(options).toContain(expectedOption);
      }
    });
    
    // Step 7-9: Select INQUIRY and verify Level 2 options
    await test.step('Select INQUIRY from Level 1 and verify Level 2 options', async () => {
      await helpdeskPage.selectClassificationLevel1('INQUIRY');
      
      const requestTypeDropdown = page.locator('[name="requestType"], [id="requestType"]').first();
      await requestTypeDropdown.click();
      
      const level2Options = await helpdeskPage.getDropdownOptions(requestTypeDropdown);
      
      for (const expectedOption of TD.requestTypeLevel2Options) {
        expect(level2Options).toContain(expectedOption);
      }
    });
    
    // Step 10: Verify Resolution Status options
    await test.step('Verify Resolution Status dropdown options', async () => {
      const statusDropdown = page.locator('[name="resolutionStatus"], [id="status"]').first();
      await statusDropdown.click();
      
      const statusOptions = await helpdeskPage.getDropdownOptions(statusDropdown);
      
      for (const expectedOption of TD.resolutionStatusOptions) {
        expect(statusOptions).toContain(expectedOption);
      }
    });
    
    // Step 11: Verify Resolved at First Contact options
    await test.step('Verify Resolved at First Contact dropdown options', async () => {
      const firstContactDropdown = page.locator('[name="resolvedFirstContact"], [id="firstContact"]').first();
      await firstContactDropdown.click();
      
      const firstContactOptions = await helpdeskPage.getDropdownOptions(firstContactDropdown);
      
      for (const expectedOption of TD.resolvedFirstContactOptions) {
        expect(firstContactOptions).toContain(expectedOption);
      }
    });
  });
});