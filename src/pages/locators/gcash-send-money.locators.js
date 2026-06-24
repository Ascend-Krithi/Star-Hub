const locators = {
  sendMoneyScreen: (page) => page.locator('[data-testid="send-money-screen"]').first(),
  scanQRButton: (page) => page.locator('[data-testid="scan-qr-button"]').first(),
  cameraView: (page) => page.locator('[data-testid="camera-view"]').first(),
  recipientMobileField: (page) => page.locator('[data-testid="recipient-mobile"]').first(),
  amountField: (page) => page.locator('[data-testid="amount-field"]').first(),
  confirmButton: (page) => page.locator('[data-testid="confirm-button"]').first(),
  continueButton: (page) => page.locator('[data-testid="continue-button"]').first(),
  errorMessage: (page) => page.locator('[data-testid="error-message"]').first(),
  qrExpiredError: (page) => page.locator('[data-testid="qr-expired-error"]').first(),
  unableToReadQRError: (page) => page.locator('[data-testid="unable-read-qr-error"]').first(),
  requestNewQRButton: (page) => page.locator('[data-testid="request-new-qr-button"]').first(),
  enterManuallyButton: (page) => page.locator('[data-testid="enter-manually-button"]').first(),
  manualMobileInput: (page) => page.locator('[data-testid="manual-mobile-input"]').first(),
  transactionSuccess: (page) => page.locator('[data-testid="transaction-success"]').first(),
  transactionReference: (page) => page.locator('[data-testid="transaction-reference"]').first(),
  adjustAmountScreen: (page) => page.locator('[data-testid="adjust-amount-screen"]').first(),
  originalAmount: (page) => page.locator('[data-testid="original-amount"]').first(),
  limitMessage: (page) => page.locator('[data-testid="limit-message"]').first(),
  suggestedAmount: (page, amount) => page.locator(`[data-testid="suggested-amount-${amount}"]`).first(),
  customAmountInput: (page) => page.locator('[data-testid="custom-amount-input"]').first()
};

module.exports = locators;