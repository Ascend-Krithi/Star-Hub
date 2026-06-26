const { test, expect } = require('../../fixtures');
const DealerLoginPage = require('../../pages/DealerLoginPage');
const DealerBusinessProfilePage = require('../../pages/DealerBusinessProfilePage');
const TD = require('../../data/dealer-test-data');

test.describe('AD-79 TS-002 TC-001 - First Time Login with Business Profile Display', () => {
  test('should display welcome message and business profile for first-time login @smoke @regression', async ({ page }) => {
    const loginPage = new DealerLoginPage(page);
    const profilePage = new DealerBusinessProfilePage(page);

    try {
      // Step 1: Launch the Dealer App
      await loginPage.goto();
      
      // Expected Result 1: Dealer App login screen is displayed
      await expect(page).toHaveURL(TD.urls.dealerApp);
      await expect(loginPage.page.locator('input[type="email"], input[name="email"]').first()).toBeVisible();

      // Step 2: Enter valid email address for first-time login dealer
      await loginPage.enterEmail(TD.credentials.firstTimeLogin.email);
      
      // Expected Result 2: Email is accepted
      const emailValue = await loginPage.getEmailValue();
      expect(emailValue).toBe(TD.credentials.firstTimeLogin.email);

      // Step 3: Enter valid password
      await loginPage.enterPassword(TD.credentials.firstTimeLogin.password);
      
      // Expected Result 3: Password is accepted and masked
      const passwordType = await loginPage.getPasswordInputType();
      expect(passwordType).toBe('password');

      // Step 4: Click on the Login button
      await loginPage.clickLoginButton();
      await page.waitForLoadState('networkidle', { timeout: 30000 });
      
      // Expected Result 4: Dealer is successfully authenticated
      await expect(page).not.toHaveURL(TD.urls.dealerApp);

      // Step 5 & Expected Result 5: Verify welcome message is displayed
      const isWelcomeMessageDisplayed = await profilePage.isWelcomeMessageDisplayed();
      expect(isWelcomeMessageDisplayed).toBe(true);
      
      const welcomeText = await profilePage.getWelcomeMessageText();
      expect(welcomeText).toContain(TD.messages.welcomeMessage);
      await expect(profilePage.page.locator('.welcome-message, [data-testid="welcome-message"]').first()).toBeVisible();

      // Step 6 & Expected Result 6: Verify Business Profile section with Business Name field
      const isProfileSectionDisplayed = await profilePage.isBusinessProfileSectionDisplayed();
      expect(isProfileSectionDisplayed).toBe(true);
      
      const isBusinessNameDisplayed = await profilePage.isBusinessNameFieldDisplayed();
      expect(isBusinessNameDisplayed).toBe(true);
      
      const businessNameValue = await profilePage.getBusinessNameValue();
      expect(businessNameValue).toContain(TD.businessProfile.businessName);

      // Step 7 & Expected Result 7: Verify Registration number field is displayed
      const isRegistrationNumberDisplayed = await profilePage.isRegistrationNumberFieldDisplayed();
      expect(isRegistrationNumberDisplayed).toBe(true);
      
      const registrationNumberValue = await profilePage.getRegistrationNumberValue();
      expect(registrationNumberValue).toContain(TD.businessProfile.registrationNumber);

      // Step 8 & Expected Result 8: Verify GST Registration number field is displayed
      const isGSTNumberDisplayed = await profilePage.isGSTNumberFieldDisplayed();
      expect(isGSTNumberDisplayed).toBe(true);
      
      const gstNumberValue = await profilePage.getGSTNumberValue();
      expect(gstNumberValue).toContain(TD.businessProfile.gstNumber);

    } catch (error) {
      console.error('Test AD-79 TS-002 TC-001 failed:', error);
      throw error;
    }
  });
});