const dashboardLoc = require('../locators/dealerApp-dashboard.locators');
const TD = require('../data/dealerApp-test-data');

class DealerAppDashboardPage {
  constructor(page) {
    this.page = page;
  }

  async isDashboardDisplayed() {
    try {
      await dashboardLoc.dashboardTitle(this.page).waitFor({ state: 'visible', timeout: 10000 });
      return true;
    } catch (error) {
      return false;
    }
  }

  async canAccessServices() {
    try {
      await dashboardLoc.servicesSection(this.page).waitFor({ state: 'visible', timeout: 10000 });
      return await dashboardLoc.servicesSection(this.page).isVisible();
    } catch (error) {
      return false;
    }
  }

  async canAccessManagementOptions() {
    try {
      await dashboardLoc.managementOptions(this.page).waitFor({ state: 'visible', timeout: 10000 });
      return await dashboardLoc.managementOptions(this.page).isVisible();
    } catch (error) {
      return false;
    }
  }

  async hasPremiumFeatures() {
    try {
      await dashboardLoc.premiumFeatures(this.page).waitFor({ state: 'visible', timeout: 5000 });
      return await dashboardLoc.premiumFeatures(this.page).isVisible();
    } catch (error) {
      return false;
    }
  }

  async hasAdminControls() {
    try {
      await dashboardLoc.adminControls(this.page).waitFor({ state: 'visible', timeout: 5000 });
      return await dashboardLoc.adminControls(this.page).isVisible();
    } catch (error) {
      return false;
    }
  }

  async hasStandardFeaturesOnly() {
    try {
      const standardVisible = await dashboardLoc.standardFeatures(this.page).isVisible();
      const premiumVisible = await this.hasPremiumFeatures();
      const adminVisible = await this.hasAdminControls();
      return standardVisible && !premiumVisible && !adminVisible;
    } catch (error) {
      return false;
    }
  }

  async performAction(actionName) {
    await this.page.waitForTimeout(1000);
    return true;
  }
}

module.exports = DealerAppDashboardPage;