const locators = {
  welcomeMessage: (page) => page.locator('.welcome-message, [data-testid="welcome-message"], h1:has-text("Welcome")').first(),
  businessProfileSection: (page) => page.locator('.business-profile, [data-testid="business-profile"], section:has-text("Business Profile")').first(),
  businessNameField: (page) => page.locator('input[name="businessName"], [data-testid="business-name"], #businessName').first(),
  businessNameValue: (page) => page.locator('.business-name-value, [data-testid="business-name-value"]').first(),
  registrationNumberField: (page) => page.locator('input[name="registrationNumber"], [data-testid="registration-number"], #registrationNumber').first(),
  registrationNumberValue: (page) => page.locator('.registration-number-value, [data-testid="registration-number-value"]').first(),
  gstNumberField: (page) => page.locator('input[name="gstNumber"], [data-testid="gst-number"], #gstNumber').first(),
  gstNumberValue: (page) => page.locator('.gst-number-value, [data-testid="gst-number-value"]').first()
};

module.exports = locators;