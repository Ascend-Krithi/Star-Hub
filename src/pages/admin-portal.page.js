/**
 * Page Object — Admin Portal
 * Handles all interactions with Admin Portal application
 */

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
    await loc.usernameField(this.page).waitFor({ state: 'visible', timeout: 15000 });
    await loc.usernameField(this.page).fill(username);
    await loc.passwordField(this.page).fill(password);
    await loc.loginButton(this.page).click();
    await this.page.waitForLoadState('domcontentloaded', { timeout: 60000 });
  }

  async isDashboardVisible() {
    await loc.dashboard(this.page).waitFor({ state: 'visible', timeout: 15000 });
    return await loc.dashboard(this.page).isVisible();
  }

  async navigateToReportsMenu() {
    await loc.reportsDropdown(this.page).waitFor({ state: 'visible', timeout: 15000 });
    await loc.reportsDropdown(this.page).click();
  }

  async clickReportListsOption() {
    await loc.reportListsOption(this.page).waitFor({ state: 'visible', timeout: 15000 });
    await loc.reportListsOption(this.page).click();
    await this.page.waitForLoadState('domcontentloaded', { timeout: 60000 });
  }

  async isReportListsPageVisible() {
    await loc.reportListsPage(this.page).waitFor({ state: 'visible', timeout: 15000 });
    return await loc.reportListsPage(this.page).isVisible();
  }

  async searchReportInAuditTrail(reportType, date) {
    if (await loc.reportTypeFilter(this.page).isVisible()) {
      await loc.reportTypeFilter(this.page).fill(reportType);
    }
    if (date && await loc.dateFilter(this.page).isVisible()) {
      await loc.dateFilter(this.page).fill(date);
    }
    if (await loc.searchButton(this.page).isVisible()) {
      await loc.searchButton(this.page).click();
      await this.page.waitForLoadState('networkidle', { timeout: 60000 });
    }
  }

  async verifyAuditTrailEntry(reportType, action, format, operatorId) {
    await loc.auditTrailTable(this.page).waitFor({ state: 'visible', timeout: 15000 });
    
    const reportTypeExists = await loc.reportTypeColumn(this.page).first().isVisible();
    const actionExists = await loc.actionColumn(this.page).first().isVisible();
    const formatExists = await loc.formatColumn(this.page).first().isVisible();
    const operatorExists = await loc.operatorColumn(this.page).first().isVisible();
    
    return {
      reportTypeFound: reportTypeExists,
      actionFound: actionExists,
      formatFound: formatExists,
      operatorFound: operatorExists
    };
  }

  async getAuditTrailRowCount() {
    await loc.auditTrailTable(this.page).waitFor({ state: 'visible', timeout: 15000 });
    const rows = await loc.auditTrailRows(this.page).count();
    return rows;
  }
}

module.exports = AdminPortalPage;