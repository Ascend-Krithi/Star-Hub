const locators = {
  // Cookie Consent
  cookieConsentBanner: (page) => page.locator('[data-testid="cookie-banner"], .cookie-consent, #cookie-banner').first(),
  acceptCookiesButton: (page) => page.locator('button:has-text("Accept"), button:has-text("OK"), [data-testid="accept-cookies"]').first(),
  
  // Navigation
  mobileTab: (page) => page.locator('nav a:has-text("Mobile"), [data-testid="mobile-tab"]').first(),
  allPhonesLink: (page) => page.locator('a:has-text("All Phones"), [data-testid="all-phones-link"]').first(),
  
  // Mobile Devices Listing Page
  pageHeading: (page) => page.locator('h1:has-text("Mobile Devices"), h2:has-text("Mobile Devices")').first(),
  deviceCount: (page) => page.locator('text=/\\d+ items/, [data-testid="device-count"]').first(),
  
  // Device Cards
  deviceCard: (deviceName) => (page) => page.locator(`[data-testid="device-card"]:has-text("${deviceName}"), .device-card:has-text("${deviceName}"), .product-card:has-text("${deviceName}")`).first(),
  samsungGalaxyA57Card: (page) => page.locator('text=Samsung Galaxy A57 5G').first(),
  
  // Product Detail Page (PDP)
  productTitle: (page) => page.locator('h1, [data-testid="product-title"]').first(),
  
  // Configuration Options
  colourOption: (page) => page.locator('[data-testid="colour-option"], .colour-selector, select[name="colour"]').first(),
  selectedColour: (page) => page.locator('[data-testid="selected-colour"], .colour-selected, .selected-option[data-type="colour"]').first(),
  
  storageOption: (page) => page.locator('[data-testid="storage-option"], .storage-selector, select[name="storage"]').first(),
  selectedStorage: (page) => page.locator('[data-testid="selected-storage"], .storage-selected, .selected-option[data-type="storage"]').first(),
  
  paymentOption: (page) => page.locator('[data-testid="payment-option"], .payment-selector, select[name="payment"]').first(),
  selectedPayment: (page) => page.locator('[data-testid="selected-payment"], .payment-selected, .selected-option[data-type="payment"]').first(),
  
  // Next Button
  nextButton: (page) => page.locator('button:has-text("Next"), [data-testid="next-button"], button[type="submit"]:has-text("Next")').first(),
  
  // Authentication Popup
  authPopup: (page) => page.locator('[data-testid="auth-popup"], .auth-modal, .login-popup, [role="dialog"]').first(),
  popupMessage: (page) => page.locator('text=/Please log in or create an account/i, [data-testid="popup-message"]').first(),
  loginWithHubIdButton: (page) => page.locator('button:has-text("Log in with Hub ID"), [data-testid="login-hub-id"]').first(),
  signupLink: (page) => page.locator('text=/Don\'t have an account\? Sign up here/i, [data-testid="signup-link"]').first(),
  
  // Login Form
  hubIdInput: (page) => page.locator('input[name="hubId"], input[type="email"], [data-testid="hub-id-input"]').first(),
  passwordInput: (page) => page.locator('input[name="password"], input[type="password"], [data-testid="password-input"]').first(),
  loginSubmitButton: (page) => page.locator('button[type="submit"]:has-text("Login"), button:has-text("Sign In")').first()
};

module.exports = locators;