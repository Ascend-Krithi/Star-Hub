const { test, expect } = require('@playwright/test');
const CCBBSHelpdeskPage = require('../../pages/ccbbs-helpdesk.page');
const TD = require('../../data/ccbbs-test-data');

test.describe('[UI] AD-88 TS-003: Verify Admin View Fields Display', {
  tag: ['@regression', '@ccbbs', '@admin']
}, () => {
  let helpdeskPage;

  test('[AD-88 TS-003 TC-001] Verify Admin View displays all fields correctly', async ({ page }) => {
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
      const adminDashboard = page.locator('[class*="admin-dashboard"], [id*="admin"]').first();
      await expect(adminDashboard).toBeVisible();
    });
    
    // Step 4: Select existing ticket
    await test.step('Select an existing ticket', async () => {
      const ticketId = '01152512300001';
      await helpdeskPage.searchTicket(ticketId);
      await helpdeskPage.selectTicket(ticketId);
    });
    
    // Step 5: Verify all User View fields are displayed
    await test.step('Verify all User View fields are displayed with data', async () => {
      const fullNameField = page.locator('[name="fullName"], [id="fullName"]').first();
      const phoneField = page.locator('[name="phoneNumber"], [id="phoneNumber"]').first();
      const emailField = page.locator('[name="emailAddress"], [id="emailAddress"]').first();
      const companyField = page.locator('[name="companyName"], [id="companyName"]').first();
      const titleField = page.locator('[name="titleMessage"], [id="titleMessage"]').first();
      const questionField = page.locator('[name="askQuestions"], [id="askQuestions"]').first();
      
      await expect(fullNameField).toBeVisible();
      await expect(phoneField).toBeVisible();
      await expect(emailField).toBeVisible();
      await expect(companyField).toBeVisible();
      await expect(titleField).toBeVisible();
      await expect(questionField).toBeVisible();
    });
    
    // Step 6: Verify Vendor Code field
    await test.step('Verify Vendor Code field is displayed and editable', async () => {
      const vendorCodeField = page.locator('[name="vendorCode"], [id="vendorCode"]').first();
      await expect(vendorCodeField).toBeVisible();
      await expect(vendorCodeField).toBeEditable();
    });
    
    // Step 7: Verify Vendor Name field
    await test.step('Verify Vendor Name field is displayed and editable', async () => {
      const vendorNameField = page.locator('[name="vendorName"], [id="vendorName"]').first();
      await expect(vendorNameField).toBeVisible();
      await expect(vendorNameField).toBeEditable();
    });
    
    // Step 8: Verify Classification Level 1 dropdown
    await test.step('Verify Classification Level 1 dropdown is displayed and editable', async () => {
      const classificationDropdown = page.locator('[name="classificationLevel1"], [id="classification"]').first();
      await expect(classificationDropdown).toBeVisible();
      await expect(classificationDropdown).toBeEditable();
    });
    
    // Step 9: Verify Request Type Level 2 dropdown
    await test.step('Verify Request Type Level 2 dropdown is displayed and editable', async () => {
      const requestTypeDropdown = page.locator('[name="requestType"], [id="requestType"]').first();
      await expect(requestTypeDropdown).toBeVisible();
      await expect(requestTypeDropdown).toBeEditable();
    });
    
    // Step 10: Verify Inquiries/Concerns Level 3 field
    await test.step('Verify Inquiries/Concerns Level 3 field is displayed and editable', async () => {
      const inquiriesField = page.locator('[name="inquiriesLevel3"], [id="inquiries"]').first();
      await expect(inquiriesField).toBeVisible();
      await expect(inquiriesField).toBeEditable();
    });
    
    // Step 11: Verify Resolution Status dropdown
    await test.step('Verify Resolution Status dropdown is displayed and editable', async () => {
      const statusDropdown = page.locator('[name="resolutionStatus"], [id="status"]').first();
      await expect(statusDropdown).toBeVisible();
      await expect(statusDropdown).toBeEditable();
    });
    
    // Step 12: Verify Resolved at First Contact dropdown
    await test.step('Verify Resolved at First Contact dropdown is displayed and editable', async () => {
      const firstContactDropdown = page.locator('[name="resolvedFirstContact"], [id="firstContact"]').first();
      await expect(firstContactDropdown).toBeVisible();
      await expect(firstContactDropdown).toBeEditable();
    });
  });
});