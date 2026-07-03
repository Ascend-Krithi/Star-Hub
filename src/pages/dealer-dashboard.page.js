const { expect } = require('@playwright/test');
const loc = require('./locators/dealer-dashboard.locators');
const TD = require('../data/dealer-app-test-data');

class DealerDashboardPage {
  constructor(page) {
    this.page = page;
  }

  async isDashboardVisible() {
    try {
      await loc.dashboardContainer(this.page).waitFor({ state: 'visible', timeout: 10000 });
      return true;
    } catch {
      return false;
    }
  }

  async isUserManagementVisible() {
    try {
      await loc.userManagementMenu(this.page).waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  async isReportsMenuVisible() {
    try {
      await loc.reportsMenu(this.page).waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  async isSettingsMenuVisible() {
    try {
      await loc.settingsMenu(this.page).waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  async isAllServicesMenuVisible() {
    try {
      await loc.allServicesMenu(this.page).waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  async isCustomerManagementVisible() {
    try {
      await loc.customerManagementMenu(this.page).waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  async isOrdersMenuVisible() {
    try {
      await loc.ordersMenu(this.page).waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  async isSalesDashboardVisible() {
    try {
      await loc.salesDashboard(this.page).waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  async clickUserManagement() {
    await loc.userManagementMenu(this.page).click();
  }

  async clickSettings() {
    await loc.settingsMenu(this.page).click();
  }

  async clickLogout() {
    await loc.logoutButton(this.page).waitFor({ state: 'visible', timeout: 10000 });
    await loc.logoutButton(this.page).click();
  }

  async performActivity(activity) {
    await this.page.waitForTimeout(1000);
  }

  async waitForInactivity(duration) {
    const hours = parseInt(duration);
    const milliseconds = hours * 60 * 60 * 1000;
    await this.page.waitForTimeout(milliseconds);
  }
}

module.exports = DealerDashboardPage;