const { test, expect } = require('../../fixtures');
const DealerLoginPage = require('../../pages/DealerLoginPage');
const TD = require('../../data/dealer-test-data');

test.describe('AD-79 TS-001 TC-003 - Invalid Password Login', () => {
  test('should display error message when logging in with invalid password @regression', async ({ page }) => {
    const loginPage = new DealerLoginPage(page);

    try {
      // Step 1: Launch the Dealer App
      await loginPage.goto();
      
      // Expected Result 1: Dealer App login screen is displayed
      await expect(page).toHaveURL(TD.urls.dealerApp);
      await expect(loginPage.page.locator('input[type="email"], input[name="email"]').first()).toBeVisible();
      await expect(loginPage.page.locator('input[type="password"], input[name="password"]').first()).toBeVisible();

      // Step 2: Enter valid email address
      await loginPage.enterEmail(TD.credentials.invalidPassword.email);
      
      // Expected Result 2: Email is accepted and displayed
      const emailValue = await loginPage.getEmailValue();
      expect(emailValue).toBe(TD.credentials.invalidPassword.email);

      // Step 3: Enter invalid password
      await loginPage.enterPassword(TD.credentials.invalidPassword.password);
      
      // Expected Result 3: Password is entered and masked
      const passwordType = await loginPage.getPasswordInputType();
      expect(passwordType).toBe('password');

      // Step 4: Click on the Login button
      await loginPage.clickLoginButton();
      await page.waitForTimeout(2000);
      
      // Expected Result 4: Error message is displayed indicating invalid credentials
      const isErrorVisible = await loginPage.isErrorMessageVisible();
      expect(isErrorVisible).toBe(true);
      
      const errorMessage = await loginPage.getErrorMessageText();
      expect(errorMessage).toMatch(TD.errors.invalidCredentials);
      
      // Verify login is not successful - should remain on login page
      await expect(page).toHaveURL(TD.urls.dealerApp);

    } catch (error) {
      console.error('Test AD-79 TS-001 TC-003 failed:', error);
      throw error;
    }
  });
});