const { test, expect } = require('@playwright/test');
const loc = require('./locators/helpdesk-admin.locators');
const TD = require('../data/helpdesk-test-data');

const URL = TD.urls.adminPortal;

class HelpdeskAdminPage {
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
  }

  async login(username, password) {
    await loc.usernameField(this.page).fill(username);
    await loc.passwordField(this.page).fill(password);
    await loc.loginButton(this.page).click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async isDashboardVisible() {
    return await loc.dashboard(this.page).isVisible();
  }

  async navigateToTicketQueue() {
    await loc.ticketQueueLink(this.page).click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async navigateToReports() {
    await loc.reportsLink(this.page).click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async navigateToSLADashboard() {
    await loc.slaDashboardLink(this.page).click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async selectTicket(ticketRef) {
    await loc.ticketRow(this.page, ticketRef).click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async getTicketStatus() {
    return await loc.ticketStatus(this.page).textContent();
  }

  async selectClassification(classification) {
    await loc.classificationDropdown(this.page).selectOption({ label: classification });
  }

  async selectRequestType(requestType) {
    await loc.requestTypeDropdown(this.page).selectOption({ label: requestType });
  }

  async selectDetails(details) {
    await loc.detailsDropdown(this.page).selectOption({ label: details });
  }

  async clickSave() {
    await loc.saveButton(this.page).click();
  }

  async getSuccessMessage() {
    return await loc.successMessage(this.page).textContent();
  }

  async clickAssignActionOwner() {
    await loc.assignActionOwnerButton(this.page).click();
  }

  async selectActionOwner(email) {
    await loc.actionOwnerDropdown(this.page).selectOption({ label: email });
  }

  async submitAssignment() {
    await loc.submitAssignmentButton(this.page).click();
  }

  async enterResponse(response) {
    await loc.responseField(this.page).fill(response);
  }

  async submitResponse() {
    await loc.submitResponseButton(this.page).click();
  }

  async fillVendorCode(vendorCode) {
    await loc.vendorCodeField(this.page).fill(vendorCode);
  }

  async fillVendorName(vendorName) {
    await loc.vendorNameField(this.page).fill(vendorName);
  }

  async selectResolutionStatus(status) {
    await loc.resolutionStatusDropdown(this.page).selectOption({ label: status });
  }

  async selectResolvedFirstContactYes() {
    await loc.resolvedFirstContactYes(this.page).check();
  }

  async clickCloseTicket() {
    await loc.closeTicketButton(this.page).click();
  }

  async isDateClosedDisplayed() {
    return await loc.dateClosedField(this.page).isVisible();
  }

  async getErrorMessage() {
    return await loc.errorMessage(this.page).textContent();
  }

  async isErrorMessageVisible() {
    return await loc.errorMessage(this.page).isVisible();
  }

  async changeTicketStatus(status) {
    await loc.statusDropdown(this.page).selectOption({ label: status });
  }

  async getStatusHistory() {
    return await loc.statusHistorySection(this.page).textContent();
  }

  async getSLATimer(ticketRef) {
    return await loc.slaTimer(this.page, ticketRef).textContent();
  }

  async isOverdueAlertVisible() {
    return await loc.overdueAlert(this.page).isVisible();
  }

  async isTicketOverdue(ticketRef) {
    return await loc.overdueTicket(this.page, ticketRef).isVisible();
  }

  async clickSendEmail() {
    await loc.sendEmailButton(this.page).click();
  }

  async fillEmailSubject(subject) {
    await loc.emailSubjectField(this.page).fill(subject);
  }

  async fillEmailBody(body) {
    await loc.emailBodyField(this.page).fill(body);
  }

  async sendEmail() {
    await loc.sendEmailSubmitButton(this.page).click();
  }

  async isEmailSentTimestampVisible() {
    return await loc.emailSentTimestamp(this.page).isVisible();
  }

  async isVendorReplyVisible() {
    return await loc.vendorReplyEmail(this.page).isVisible();
  }

  async getCommunicationHistory() {
    return await loc.communicationHistory(this.page).textContent();
  }

  async setDateRange(fromDate, toDate) {
    await loc.fromDateField(this.page).fill(fromDate);
    await loc.toDateField(this.page).fill(toDate);
  }

  async setStatusFilter(status) {
    await loc.statusFilterDropdown(this.page).selectOption({ label: status });
  }

  async generateReport() {
    await loc.generateReportButton(this.page).click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async isReportColumnVisible(columnName) {
    return await loc.reportColumn(this.page, columnName).isVisible();
  }

  async downloadReport() {
    const downloadPromise = this.page.waitForEvent('download');
    await loc.downloadButton(this.page).click();
    return await downloadPromise;
  }

  async logout() {
    await loc.logoutButton(this.page).click();
  }

  async classifyTicket(classification, requestType, details) {
    await this.selectClassification(classification);
    await this.selectRequestType(requestType);
    await this.selectDetails(details);
    await this.clickSave();
  }

  async assignTicketToActionOwner(actionOwnerEmail) {
    await this.clickAssignActionOwner();
    await this.selectActionOwner(actionOwnerEmail);
    await this.submitAssignment();
  }

  async closeTicketWithDetails(vendorCode, vendorName, status, resolvedFirstContact) {
    await this.fillVendorCode(vendorCode);
    await this.fillVendorName(vendorName);
    await this.selectResolutionStatus(status);
    if (resolvedFirstContact) {
      await this.selectResolvedFirstContactYes();
    }
    await this.clickCloseTicket();
  }
}

module.exports = HelpdeskAdminPage;