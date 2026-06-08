const loc = require('./locators/admin-portal.locators');
const TD = require('../data/lending-portal-test-data');

class AdminPortalPage {
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto(TD.urls.adminPortal, { waitUntil: 'domcontentloaded', timeout: 60000 });
  }

  async login(username, password) {
    await loc.usernameInput(this.page).waitFor({ state: 'visible', timeout: 10000 });
    await loc.usernameInput(this.page).fill(username);
    await loc.passwordInput(this.page).fill(password);
    await loc.loginButton(this.page).click();
    await loc.dashboard(this.page).waitFor({ state: 'visible', timeout: 30000 });
  }

  async navigateToReportLists() {
    await loc.reportsDropdown(this.page).waitFor({ state: 'visible', timeout: 10000 });
    await loc.reportsDropdown(this.page).click();
    await this.page.waitForTimeout(1000);
    await loc.reportListsOption(this.page).waitFor({ state: 'visible', timeout: 10000 });
    await loc.reportListsOption(this.page).click();
    await loc.reportListsPage(this.page).waitFor({ state: 'visible', timeout: 15000 });
  }

  async searchAuditTrail(reportType, date) {
    if (reportType) {
      await loc.searchReportType(this.page).waitFor({ state: 'visible', timeout: 10000 });
      await loc.searchReportType(this.page).fill(reportType);
    }
    if (date) {
      await loc.searchDateFilter(this.page).fill(date);
    }
    await loc.searchButton(this.page).click();
    await this.page.waitForTimeout(2000);
  }

  async verifyAuditTrailEntry(reportType, action, format, operatorId) {
    await loc.auditTrailEntry(this.page).waitFor({ state: 'visible', timeout: 15000 });
    
    const entryText = await loc.auditTrailEntry(this.page).textContent();
    
    const containsReportType = entryText.includes(reportType);
    const containsAction = entryText.includes(action);
    const containsFormat = entryText.includes(format);
    const containsOperatorId = entryText.includes(operatorId);
    
    return containsReportType && containsAction && containsFormat && containsOperatorId;
  }

  async getAuditTrailReportType() {
    await loc.reportTypeField(this.page).waitFor({ state: 'visible', timeout: 10000 });
    return await loc.reportTypeField(this.page).textContent();
  }

  async getAuditTrailAction() {
    await loc.actionField(this.page).waitFor({ state: 'visible', timeout: 10000 });
    return await loc.actionField(this.page).textContent();
  }

  async getAuditTrailFormat() {
    await loc.formatField(this.page).waitFor({ state: 'visible', timeout: 10000 });
    return await loc.formatField(this.page).textContent();
  }

  async getAuditTrailOperatorId() {
    await loc.operatorIdField(this.page).waitFor({ state: 'visible', timeout: 10000 });
    return await loc.operatorIdField(this.page).textContent();
  }

  async getAuditTrailTimestamp() {
    await loc.timestampField(this.page).waitFor({ state: 'visible', timeout: 10000 });
    return await loc.timestampField(this.page).textContent();
  }
}

module.exports = AdminPortalPage;