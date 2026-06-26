const locators = {
  dashboardContainer: (page) => page.locator('.dashboard, [data-testid="dashboard"], main').first(),
  servicesSection: (page) => page.locator('.services, [data-testid="services"], .service-management').first(),
  managementOptions: (page) => page.locator('.management-options, [data-testid="management-options"]').first()
};

module.exports = locators;