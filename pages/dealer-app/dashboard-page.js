const { expect } = require('@playwright/test');

class DashboardPage {
  constructor(page) {
    this.page = page;
    this.servicesSection = page.locator('[data-testid="services-section"], .services-section');
    this.managementOptions = page.locator('[data-testid="management-options"], .management-options');
    this.logoutButton = page.locator('[data-testid="logout-button"], button:has-text("Logout")');
    this.advancedAnalytics = page.locator('[data-testid="advanced-analytics"], .advanced-analytics');
    this.userManagement = page.locator('[data-testid="user-management"], .user-management');
    this.adminControls = page.locator('[data-testid="admin-controls"], .admin-controls');
    this.basicServices = page.locator('[data-testid="basic-services"], .basic-services');
    this.profileName = page.locator('[data-testid="profile-name"], .profile-name');
  }

  async navigateToServices() {
    await this.servicesSection.click();
    await this.page.waitForLoadState('networkidle');
  }

  async logout() {
    await this.logoutButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async getVisibleFeatures() {
    const features = await this.page.locator('[data-testid^="feature-"], .feature-item').all();
    const visibleFeatures = [];
    for (const feature of features) {
      if (await feature.isVisible()) {
        visibleFeatures.push(await feature.textContent());
      }
    }
    return visibleFeatures;
  }

  async updateProfile(name) {
    await this.page.locator('[data-testid="edit-profile"]').click();
    await this.page.locator('[data-testid="profile-name-input"]').fill(name);
    await this.page.locator('[data-testid="save-profile"]').click();
    await this.page.waitForLoadState('networkidle');
  }
}

module.exports = { DashboardPage };