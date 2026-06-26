module.exports = {
  identityVerificationScreen: (page) => page.locator('[data-testid="identity-verification"]').or(page.locator('h1:has-text("Identity Verification")')).first(),
  ownerNameField: (page) => page.locator('[data-testid="owner-name"]').or(page.locator('input[name="ownerName"]')).first(),
  idNumberField: (page) => page.locator('[data-testid="id-number"]').or(page.locator('input[name="idNumber"]')).first(),
  submitButton: (page) => page.locator('[data-testid="submit-verification"]').or(page.locator('button:has-text("Submit")')).first(),
  successMessage: (page) => page.locator('[data-testid="success-message"]').or(page.locator('.success-message')).first()
};