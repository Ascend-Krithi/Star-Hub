const locators = {
  qrGenerationScreen: (page) => page.locator('[data-testid="qr-generation-screen"]').first(),
  amountInput: (page) => page.locator('[data-testid="amount-input"]').first(),
  generateQRButton: (page) => page.locator('[data-testid="generate-qr-button"]').first(),
  generatedQRCode: (page) => page.locator('[data-testid="generated-qr-code"]').first(),
  qrCodeImage: (page) => page.locator('[data-testid="qr-code-image"]').first(),
  displayedAmount: (page) => page.locator('[data-testid="displayed-amount"]').first(),
  displayedMobile: (page) => page.locator('[data-testid="displayed-mobile"]').first()
};

module.exports = locators;