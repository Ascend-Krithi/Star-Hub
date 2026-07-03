const locators = {
  identityVerificationScreen: (page) => page.locator('[data-testid="identity-verification"]').or(page.locator('.identity-verification-screen')).first(),
  businessOwnerDetails: (page) => page.locator('[data-testid="business-owner-details"]').or(page.locator('.business-owner-info')).first(),
  otpInput: (page) => page.locator('[data-testid="otp-input"]').or(page.getByRole('textbox', { name: /otp|code/i })).first(),
  documentUpload: (page) => page.locator('[data-testid="document-upload"]').or(page.locator('input[type="file"]')).first(),
  verifyButton: (page) => page.getByRole('button', { name: /verify|submit/i }).first(),
  verificationSuccess: (page) => page.locator('[data-testid="verification-success"]').or(page.getByText(/verification successful/i)).first()
};

module.exports = locators;