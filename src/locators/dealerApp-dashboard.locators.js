module.exports = {
  dashboardTitle: (page) => page.locator('[data-testid="dashboard-title"]').or(page.locator('h1')).first(),
  servicesSection: (page) => page.locator('[data-testid="services-section"]').or(page.locator('[class*="services"]')).first(),
  managementOptions: (page) => page.locator('[data-testid="management-options"]').or(page.locator('[class*="management"]')).first(),
  premiumFeatures: (page) => page.locator('[data-testid="premium-features"]').or(page.locator('[class*="premium"]')).first(),
  adminControls: (page) => page.locator('[data-testid="admin-controls"]').or(page.locator('[class*="admin"]')).first(),
  standardFeatures: (page) => page.locator('[data-testid="standard-features"]').or(page.locator('[class*="standard"]')).first()
};