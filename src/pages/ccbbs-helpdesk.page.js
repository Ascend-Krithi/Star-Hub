const loc = require('./locators/ccbbs-helpdesk.locators');

class CCBBSHelpdeskPage {
  constructor(page) {
    this.page = page;
  }

  async goto(url) {
    await this.page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
  }

  // User View Actions
  async fillFullName(name) {
    await loc.fullNameField(this.page).fill(name);
  }

  async fillPhoneNumber(phone) {
    await loc.phoneNumberField(this.page).fill(phone);
  }

  async fillEmailAddress(email) {
    await loc.emailAddressField(this.page).fill(email);
  }

  async fillCompanyName(company) {
    await loc.companyNameField(this.page).fill(company);
  }

  async fillTitleMessage(title) {
    await loc.titleMessageField(this.page).fill(title);
  }

  async fillAskQuestions(question) {
    await loc.askQuestionsField(this.page).fill(question);
  }

  async uploadAttachment(filePath) {
    await loc.attachmentField(this.page).setInputFiles(filePath);
  }

  async clickSubmit() {
    await loc.submitButton(this.page).click();
  }

  async submitUserForm(data) {
    if (data.fullName) await this.fillFullName(data.fullName);
    if (data.phoneNumber) await this.fillPhoneNumber(data.phoneNumber);
    if (data.emailAddress) await this.fillEmailAddress(data.emailAddress);
    if (data.companyName) await this.fillCompanyName(data.companyName);
    if (data.titleMessage) await this.fillTitleMessage(data.titleMessage);
    if (data.askQuestions) await this.fillAskQuestions(data.askQuestions);
    if (data.attachment) await this.uploadAttachment(data.attachment);
    await this.clickSubmit();
  }

  async getTicketReferenceId() {
    const text = await loc.ticketReferenceId(this.page).textContent();
    const match = text.match(/\d{14}/);
    return match ? match[0] : null;
  }

  async getTimestamp() {
    return await loc.timestamp(this.page).textContent();
  }

  // Admin Login Actions
  async login(username, password) {
    await loc.usernameField(this.page).fill(username);
    await loc.passwordField(this.page).fill(password);
    await loc.loginButton(this.page).click();
  }

  // Admin View Actions
  async navigateToAdminView() {
    await this.page.waitForSelector('[class*="admin-dashboard"], [id*="admin"]', { timeout: 10000 });
  }

  async searchTicket(ticketId) {
    await loc.ticketSearchField(this.page).fill(ticketId);
    await this.page.keyboard.press('Enter');
  }

  async selectTicket(ticketId) {
    await loc.ticketRow(this.page, ticketId).click();
  }

  async fillVendorCode(code) {
    await loc.vendorCodeField(this.page).fill(code);
  }

  async fillVendorName(name) {
    await loc.vendorNameField(this.page).fill(name);
  }

  async selectClassificationLevel1(option) {
    await loc.classificationLevel1Dropdown(this.page).selectOption(option);
  }

  async selectRequestTypeLevel2(option) {
    await loc.requestTypeLevel2Dropdown(this.page).selectOption(option);
  }

  async fillInquiriesLevel3(text) {
    await loc.inquiriesLevel3Field(this.page).fill(text);
  }

  async selectResolutionStatus(status) {
    await loc.resolutionStatusDropdown(this.page).selectOption(status);
  }

  async selectResolvedFirstContact(option) {
    await loc.resolvedFirstContactDropdown(this.page).selectOption(option);
  }

  async isFieldEditable(locator) {
    return await locator.isEditable();
  }

  async getDropdownOptions(dropdown) {
    return await dropdown.locator('option').allTextContents();
  }

  // SLA Dashboard Actions
  async navigateToSLADashboard() {
    await this.page.click('[href*="sla"], a:has-text("SLA")');
  }

  async isSLAWarningVisible() {
    return await loc.slaWarningAlert(this.page).isVisible();
  }

  async isSLACriticalVisible() {
    return await loc.slaCriticalAlert(this.page).isVisible();
  }

  async getSLARemainingTime() {
    return await loc.slaRemainingTime(this.page).textContent();
  }

  // Reports Actions
  async navigateToReports() {
    await loc.reportsSection(this.page).click();
  }

  async extractData() {
    await loc.extractDataButton(this.page).click();
  }

  async getReportData() {
    const rows = await loc.reportTable(this.page).locator('tr').all();
    const data = [];
    for (const row of rows) {
      const cells = await row.locator('td, th').allTextContents();
      data.push(cells);
    }
    return data;
  }

  async getReportHeaders() {
    return await loc.reportTable(this.page).locator('th').allTextContents();
  }
}

module.exports = CCBBSHelpdeskPage;