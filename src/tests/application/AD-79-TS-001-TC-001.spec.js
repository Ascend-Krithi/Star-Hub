const { test, expect } = require('../../fixtures');
const DealerLoginPage = require('../../pages/DealerLoginPage');
const DealerDashboardPage = require('../../pages/DealerDashboardPage');
const TD = require('../../data/dealer-test-data');

test.describe('AD-79 TS-001 TC-001 - Valid Dealer Login', () => {
  test('should allow dealer to login with valid credentials and access dashboard @smoke @regression', async ({ page }) => {
    const loginPage = new DealerLoginPage(page);
    const dashboardPage = new DealerDashboardPage(page);

    try {
      // Step 1: Launch the Dealer App
      await loginPage.goto();
      await expect(page).toHaveURL(TD.urls.dealerApp);
      
      // Expected Result 1: Verify login screen is displayed with email and password fields
      const isLoginScreenDisplayed = await loginPage.isLoginScreenDisplayed();
      expect(isLoginScreenDisplayed).toBe(true);
      await expect(loginPage.page.locator('input[type="email"], input[name="email"]').first()).toBeVisible();
      await expect(loginPage.page.locator('input[type="password"], input[name="password"]').first()).toBeVisible();

      // Step 2: Enter valid email address
      await loginPage.enterEmail(TD.credentials.validDealer.email);
      
      // Expected Result 2: Email is accepted and displayed in the email field
      const emailValue = await loginPage.getEmailValue();
      expect(emailValue).toBe(TD.credentials.validDealer.email);

      // Step 3: Enter valid password
      await loginPage.enterPassword(TD.credentials.validDealer.password);
      
      // Expected Result 3: Password is accepted and masked with dots/asterisks
      const passwordType = await loginPage.getPasswordInputType();
      expect(passwordType).toBe('password');

      // Step 4: Click on the Login button
      await loginPage.clickLoginButton();
      await page.waitForLoadState('networkidle', { timeout: 30000 });
      
      // Expected Result 4: Dealer is successfully authenticated and redirected to dashboard
      await expect(page).toHaveURL(TD.urlPatterns.dashboard);
      const isDashboardDisplayed = await dashboardPage.isDashboardDisplayed();
      expect(isDashboardDisplayed).toBe(true);

      // Step 5 & Expected Result 5: Verify dealer can access and manage services
      const canAccessServices = await dashboardPage.canAccessServices();
      expect(canAccessServices).toBe(true);
      await expect(dashboardPage.page.locator('.services, [data-testid="services"]').first()).toBeVisible();

    } catch (error) {
      console.error('Test AD-79 TS-001 TC-001 failed:', error);
      throw error;
    }
  });
});