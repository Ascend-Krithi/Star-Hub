const loc = require('./locators/dealer-app-dashboard.locators');
const TD = require('../data/dealer-app-test-data');

class DealerAppDashboardPage {
  constructor(page) {
    this.page = page;
  }

  async isDashboardVisible() {
    return await loc.dashboardTitle(this.page).isVisible();
  }

  async isDealerInfoVisible() {
    return await loc.dealerInfo(this.page).isVisible();
  }

  async isUserManagementVisible() {
    try {
      return await loc.userManagementMenu(this.page).isVisible({ timeout: 5000 });
    } catch {
      return false;
    }
  }

  async isReportsVisible() {
    try {
      return await loc.reportsMenu(this.page).isVisible({ timeout: 5000 });
    } catch {
      return false;
    }
  }

  async isSettingsVisible() {
    try {
      return await loc.settingsMenu(this.page).isVisible({ timeout: 5000 });
    } catch {
      return false;
    }
  }

  async isAllServicesVisible() {
    try {
      return await loc.allServicesMenu(this.page).isVisible({ timeout: 5000 });
    } catch {
      return false;
    }
  }

  async isCustomerManagementVisible() {
    try {
      return await loc.customerManagementMenu(this.page).isVisible({ timeout: 5000 });
    } catch {
      return false;
    }
  }

  async isOrdersVisible() {
    try {
      return await loc.ordersMenu(this.page).isVisible({ timeout: 5000 });
    } catch {
      return false;
    }
  }

  async clickLogout() {
    await loc.logoutButton(this.page).click();
  }

  async navigateToMenu(menuName) {
    await this.page.click(`a:has-text("${menuName}")`);
  }

  async verifyAdminFeatures() {
    const features = {
      userManagement: await this.isUserManagementVisible(),
      reports: await this.isReportsVisible(),
      settings: await this.isSettingsVisible(),
      allServices: await this.isAllServicesVisible()
    };
    return features;
  }

  async verifySalesFeatures() {
    const features = {
      customerManagement: await this.isCustomerManagementVisible(),
      orders: await this.isOrdersVisible(),
      reports: await this.isReportsVisible()
    };
    return features;
  }
}

module.exports = DealerAppDashboardPage;