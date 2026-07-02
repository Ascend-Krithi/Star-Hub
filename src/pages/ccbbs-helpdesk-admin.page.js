const loc = require('./locators/ccbbs-helpdesk.locators');
const { expect } = require('@playwright/test');

const ADMIN_URL = 'https://ccbbs-helpdesk.example.com/admin';

class CCBBSHelpdeskAdminPage {
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto(ADMIN_URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
  }

  async login(username, password) {
    await loc.usernameField(this.page).fill(username);
    await loc.passwordField(this.page).fill(password);
    await loc.loginButton(this.page).click();
    await loc.adminDashboard(this.page).waitFor({ state: 'visible', timeout: 10000 });
  }

  async isAdminDashboardVisible() {
    return await loc.adminDashboard(this.page).isVisible();
  }

  async searchTicket(ticketId) {
    await loc.ticketSearchField(this.page).fill(ticketId);
  }

  async openTicket(ticketId) {
    await loc.ticketLink(ticketId)(this.page).click();
  }

  async fillVendorCode(vendorCode) {
    await loc.vendorCodeField(this.page).fill(vendorCode);
  }

  async fillVendorName(vendorName) {
    await loc.vendorNameField(this.page).fill(vendorName);
  }

  async selectClassificationLevel1(value) {
    await loc.classificationLevel1Dropdown(this.page).selectOption(value);
  }

  async selectRequestTypeLevel2(value) {
    await loc.requestTypeLevel2Dropdown(this.page).selectOption(value);
  }

  async fillInquiriesLevel3(value) {
    await loc.inquiriesLevel3Field(this.page).fill(value);
  }

  async selectResolutionStatus(status) {
    await loc.resolutionStatusDropdown(this.page).selectOption(status);
  }

  async selectResolvedFirstContact(value) {
    await loc.resolvedFirstContactDropdown(this.page).selectOption(value);
  }

  async clickSave() {
    await loc.saveButton(this.page).click();
  }

  async isVendorCodeFieldVisible() {
    return await loc.vendorCodeField(this.page).isVisible();
  }

  async isVendorNameFieldVisible() {
    return await loc.vendorNameField(this.page).isVisible();
  }

  async isClassificationLevel1DropdownVisible() {
    return await loc.classificationLevel1Dropdown(this.page).isVisible();
  }

  async isRequestTypeLevel2DropdownVisible() {
    return await loc.requestTypeLevel2Dropdown(this.page).isVisible();
  }

  async isInquiriesLevel3FieldVisible() {
    return await loc.inquiriesLevel3Field(this.page).isVisible();
  }

  async isResolutionStatusDropdownVisible() {
    return await loc.resolutionStatusDropdown(this.page).isVisible();
  }

  async isResolvedFirstContactDropdownVisible() {
    return await loc.resolvedFirstContactDropdown(this.page).isVisible();
  }

  async getClassificationLevel1Options() {
    const dropdown = loc.classificationLevel1Dropdown(this.page);
    await dropdown.waitFor({ state: 'visible' });
    const options = await dropdown.locator('option').allTextContents();
    return options;
  }

  async getRequestTypeLevel2Options() {
    const dropdown = loc.requestTypeLevel2Dropdown(this.page);
    await dropdown.waitFor({ state: 'visible' });
    const options = await dropdown.locator('option').allTextContents();
    return options;
  }

  async getResolutionStatusOptions() {
    const dropdown = loc.resolutionStatusDropdown(this.page);
    await dropdown.waitFor({ state: 'visible' });
    const options = await dropdown.locator('option').allTextContents();
    return options;
  }

  async getResolvedFirstContactOptions() {
    const dropdown = loc.resolvedFirstContactDropdown(this.page);
    await dropdown.waitFor({ state: 'visible' });
    const options = await dropdown.locator('option').allTextContents();
    return options;
  }

  async isUserViewFieldVisible(fieldName) {
    const locatorMap = {
      'Full Name': loc.displayedFullName,
      'Phone Number': loc.displayedPhoneNumber,
      'Email Address': loc.displayedEmail,
      'Company Name': loc.displayedCompany,
      'Title Message': loc.displayedTitle,
      'Ask your Questions': loc.displayedQuestions,
      'Attachment': loc.displayedAttachment
    };
    const locatorFunc = locatorMap[fieldName];
    if (locatorFunc) {
      return await locatorFunc(this.page).isVisible();
    }
    return false;
  }

  async getLeadTime() {
    return await loc.leadTimeDisplay(this.page).textContent();
  }

  async isSLAWarningAlertVisible() {
    return await loc.slaWarningAlert(this.page).isVisible();
  }

  async isSLACriticalAlertVisible() {
    return await loc.slaCriticalAlert(this.page).isVisible();
  }

  async isValidationErrorModalVisible() {
    return await loc.validationErrorModal(this.page).isVisible();
  }

  async getValidationErrorMessage() {
    return await loc.validationErrorModal(this.page).textContent();
  }

  async getClosureTimestamp() {
    return await loc.closureTimestamp(this.page).textContent();
  }

  async isAuditLogVisible() {
    return await loc.auditLog(this.page).isVisible();
  }

  async navigateToReportExtraction() {
    await loc.reportExtractionSection(this.page).click();
  }

  async clickExtractData() {
    await loc.extractDataButton(this.page).click();
  }

  async getReportColumns() {
    const columns = await loc.reportColumns(this.page);
    const columnTexts = [];
    for (const column of columns) {
      columnTexts.push(await column.textContent());
    }
    return columnTexts;
  }

  async isReportTableVisible() {
    return await loc.reportTable(this.page).isVisible();
  }

  async getVendorCodeValue() {
    return await loc.vendorCodeField(this.page).inputValue();
  }

  async getVendorNameValue() {
    return await loc.vendorNameField(this.page).inputValue();
  }

  async getResolutionStatusValue() {
    return await loc.resolutionStatusDropdown(this.page).inputValue();
  }
}

module.exports = CCBBSHelpdeskAdminPage;