const { test, expect } = require('../../fixtures');
const GCashLoginPage = require('../../pages/gcash-login.page');
const GCashHomePage = require('../../pages/gcash-home.page');
const GCashSendMoneyPage = require('../../pages/gcash-send-money.page');
const TD = require('../../data/gcash-test-data');

test.describe('[Mobile] AD-66 TS-009: Manual Mobile Number Entry After QR Scan Failure', { tag: ['@regression', '@gcash'] }, () => {
  let loginPage;
  let homePage;
  let sendMoneyPage;

  test('[AD-66 TS-009 TC-001] Verify user can enter mobile number manually when QR code scan fails', async ({ page }) => {
    loginPage = new GCashLoginPage(page);
    homePage = new GCashHomePage(page);
    sendMoneyPage = new GCashSendMoneyPage(page);

    // Step 1: Launch the GCash application
    await loginPage.goto();
    await expect(loginPage.isLoginScreenDisplayed()).resolves.toBe(true);

    // Step 2: Login with sender credentials
    await loginPage.loginAsSender();
    await expect(homePage.isHomeScreenDisplayed()).resolves.toBe(true);

    // Step 3: Navigate to Send Money and scan QR
    await homePage.navigateToHomeTab();
    await homePage.selectSendMoneyOption();
    await sendMoneyPage.clickScanQRButton();
    await expect(sendMoneyPage.isCameraOpen()).resolves.toBe(true);

    // Step 4: Attempt to scan damaged QR code
    await sendMoneyPage.scanQRCode();
    await expect(sendMoneyPage.isUnableToReadQRErrorDisplayed()).resolves.toBe(true);

    // Step 5: Verify Enter Mobile Number Manually option is displayed
    await expect(sendMoneyPage.isEnterManuallyButtonDisplayed()).resolves.toBe(true);

    // Step 6: Click Enter Mobile Number Manually
    await sendMoneyPage.clickEnterManuallyButton();

    // Step 7: Enter valid recipient mobile number
    await sendMoneyPage.enterMobileNumberManually(TD.qrCodeData.validRecipientMobile);

    // Step 8: Click Continue to proceed
    await sendMoneyPage.clickContinueButton();
    
    // Verify navigation to amount entry screen
    await page.waitForTimeout(1000);
    const recipientMobile = await sendMoneyPage.getRecipientMobile();
    await expect(recipientMobile).toBe(TD.qrCodeData.validRecipientMobile);
  });
});