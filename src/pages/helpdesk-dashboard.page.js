const loc = require('./locators/helpdesk-dashboard.locators');
const TD = require('../data/helpdesk-test-data');

class HelpdeskDashboardPage {
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto(TD.urls.helpdeskHome, { waitUntil: 'domcontentloaded', timeout: TD.timeouts.pageLoad });
  }

  async gotoDashboard() {
    await this.page.goto(TD.urls.dashboard, { waitUntil: 'domcontentloaded', timeout: TD.timeouts.pageLoad });
  }

  async login(username, password) {
    await loc.usernameInput(this.page).fill(username);
    await loc.passwordInput(this.page).fill(password);
    await loc.loginButton(this.page).click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async navigateToDashboard() {
    await loc.dashboardMenu(this.page).click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async getNewStatusCount() {
    const text = await loc.newStatusCount(this.page).textContent();
    return parseInt(text.trim());
  }

  async getOngoingStatusCount() {
    const text = await loc.ongoingStatusCount(this.page).textContent();
    return parseInt(text.trim());
  }

  async getRejectStatusCount() {
    const text = await loc.rejectStatusCount(this.page).textContent();
    return parseInt(text.trim());
  }

  async getClosedStatusCount() {
    const text = await loc.closedStatusCount(this.page).textContent();
    return parseInt(text.trim());
  }

  async getInquiryCategoryCount() {
    const text = await loc.inquiryCategoryCount(this.page).textContent();
    return parseInt(text.trim());
  }

  async getRequestCategoryCount() {
    const text = await loc.requestCategoryCount(this.page).textContent();
    return parseInt(text.trim());
  }

  async getDisputeCategoryCount() {
    const text = await loc.disputeCategoryCount(this.page).textContent();
    return parseInt(text.trim());
  }

  async getNuisanceCategoryCount() {
    const text = await loc.nuisanceCategoryCount(this.page).textContent();
    return parseInt(text.trim());
  }

  async getInvalidCategoryCount() {
    const text = await loc.invalidCategoryCount(this.page).textContent();
    return parseInt(text.trim());
  }

  async getBacklogCount() {
    const text = await loc.backlogCount(this.page).textContent();
    return parseInt(text.trim());
  }

  async isResolutionTrendsVisible() {
    return await loc.resolutionTrendsChart(this.page).isVisible();
  }

  async selectCategoryFilter(category) {
    await loc.categoryFilterDropdown(this.page).selectOption(category);
  }

  async selectStatusFilter(status) {
    await loc.statusFilterDropdown(this.page).selectOption(status);
  }

  async applyFilters() {
    const applyButton = loc.applyFilterButton(this.page);
    if (await applyButton.isVisible()) {
      await applyButton.click();
      await this.page.waitForLoadState('domcontentloaded');
    }
  }

  async clearAllFilters() {
    await loc.clearFiltersButton(this.page).click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async getActiveFilterText() {
    return await loc.activeFilterBadge(this.page).textContent();
  }

  async isNoTicketsMessageVisible() {
    return await loc.noTicketsMessage(this.page).isVisible();
  }

  async getOneDaySLAMetrics() {
    const total = parseInt(await loc.oneDaySLATotal(this.page).textContent());
    const within = parseInt(await loc.oneDaySLAWithin(this.page).textContent());
    const breached = parseInt(await loc.oneDaySLABreached(this.page).textContent());
    return { total, within, breached };
  }

  async getTwoDaySLAMetrics() {
    const total = parseInt(await loc.twoDaySLATotal(this.page).textContent());
    const within = parseInt(await loc.twoDaySLAWithin(this.page).textContent());
    const breached = parseInt(await loc.twoDaySLABreached(this.page).textContent());
    return { total, within, breached };
  }

  async getThreeDaySLAMetrics() {
    const total = parseInt(await loc.threeDaySLATotal(this.page).textContent());
    const within = parseInt(await loc.threeDaySLAWithin(this.page).textContent());
    const breached = parseInt(await loc.threeDaySLABreached(this.page).textContent());
    return { total, within, breached };
  }

  async getFiveDaySLAMetrics() {
    const total = parseInt(await loc.fiveDaySLATotal(this.page).textContent());
    const within = parseInt(await loc.fiveDaySLAWithin(this.page).textContent());
    const breached = parseInt(await loc.fiveDaySLABreached(this.page).textContent());
    return { total, within, breached };
  }

  async isSLAMetricsSectionVisible() {
    return await loc.slaMetricsSection(this.page).isVisible();
  }

  async isErrorMessageVisible() {
    return await loc.errorMessage(this.page).isVisible();
  }

  async getErrorMessageText() {
    return await loc.errorMessage(this.page).textContent();
  }

  async isSyncIndicatorVisible() {
    return await loc.syncIndicator(this.page).isVisible();
  }

  async getLastUpdatedTimestamp() {
    return await loc.lastUpdatedTimestamp(this.page).textContent();
  }
}

module.exports = HelpdeskDashboardPage;