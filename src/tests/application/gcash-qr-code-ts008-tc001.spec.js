const { test, expect } = require('../../fixtures');
const GCashLoginPage = require('../../pages/gcash-login.page');
const GCashHomePage = require('../../pages/gcash-home.page');
const GCashSendMoneyPage = require('../../pages/gcash-send-money.page');
const TD = require('../../data/gcash-test-data');

test.describe('[Mobile] AD-66 TS-008: Unable to Read QR Code Error', { tag: ['@regression', '@gcash'] }, () => {
  let loginPage;
  let homePage;
  let sendMoneyPage;

  test('[AD-66 TS-008 TC-001] Verify system displays error when QR code is damaged or obscured', async ({ page }) => {
    loginPage = new GCashLoginPage(page);
    homePage = new GCashHomePage(page);
    sendMoneyPage = new GCashSendMoneyPage(page);

    // Step 1: Launch the GCash application
    await loginPage.goto();
    await expect(loginPage.isLoginScreenDisplayed()).resolves.toBe(true);

    // Step 2: Login with sender credentials
    await loginPage.loginAsSender();
    await expect(homePage.isHomeScreenDisplayed()).resolves.toBe(true);

    // Step 3: Navigate to Home Tab
    await homePage.navigateToHomeTab();

    // Step 4: Select Send Money option
    await homePage.selectSendMoneyOption();
    await expect(sendMoneyPage.isSendMoneyScreenDisplayed()).resolves.toBe(true);

    // Step 5: Click Scan QR Code
    await sendMoneyPage.clickScanQRButton();
    await expect(sendMoneyPage.isCameraOpen()).resolves.toBe(true);

    // Step 6: Attempt to scan damaged QR code (simulated)
    await sendMoneyPage.scanQRCode();

    // Step 7: Verify unable to read QR error message
    await expect(sendMoneyPage.isUnableToReadQRErrorDisplayed()).resolves.toBe(true);
    const errorMessage = await sendMoneyPage.getErrorMessage();
    const isValidError = errorMessage === TD.errors.unableToReadQR || errorMessage === TD.errors.qrScanFailed;
    await expect(isValidError).toBe(true);
  });
});