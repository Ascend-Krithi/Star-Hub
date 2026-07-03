const locators = {
  identityVerificationScreen: (page) => page.locator('[data-testid="identity-verification-screen"]').first(),
  businessOwnerName: (page) => page.locator('[data-testid="business-owner-name"]').first(),
  otpField: (page) => page.locator('[data-testid="otp-input"]').first(),
  documentUploadField: (page) => page.locator('[data-testid="document-upload"]').first(),
  verifyButton: (page) => page.getByRole('button', { name: 'Verify' }).first(),
  verificationSuccessMessage: (page) => page.locator('[data-testid="verification-success"]').first()
};

module.exports = locators;