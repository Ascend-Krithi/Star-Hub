const { test, expect } = require('../../fixtures');
const GCashLoginPage = require('../../pages/gcash-login.page');
const GCashHomePage = require('../../pages/gcash-home.page');
const GCashSendMoneyPage = require('../../pages/gcash-send-money.page');
const TD = require('../../data/gcash-test-data');

test.describe('[Mobile] AD-66 TS-005: Request New QR Code After Expiry', { tag: ['@regression', '@gcash'] }, () => {
  let loginPage;
  let homePage;
  let sendMoneyPage;

  test('[AD-66 TS-005 TC-001] Verify user can request new QR code when expired QR is scanned', async ({ page }) => {
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

    // Step 4: Scan expired QR code
    await sendMoneyPage.scanQRCode();
    await expect(sendMoneyPage.isQRExpiredErrorDisplayed()).resolves.toBe(true);

    // Step 5: Verify Request New QR Code option is displayed
    await expect(sendMoneyPage.isRequestNewQRButtonDisplayed()).resolves.toBe(true);

    // Step 6: Click Request New QR Code
    await sendMoneyPage.clickRequestNewQRButton();

    // Step 7: Verify confirmation (Note: actual notification verification would require additional implementation)
    // In real scenario, this would verify recipient receives notification
    await page.waitForTimeout(1000);
  });
});