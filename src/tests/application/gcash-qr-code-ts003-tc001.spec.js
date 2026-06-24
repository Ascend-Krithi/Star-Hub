const { test, expect } = require('../../fixtures');
const GCashLoginPage = require('../../pages/gcash-login.page');
const GCashHomePage = require('../../pages/gcash-home.page');
const GCashProfilePage = require('../../pages/gcash-profile.page');
const GCashQRGenerationPage = require('../../pages/gcash-qr-generation.page');
const GCashSendMoneyPage = require('../../pages/gcash-send-money.page');
const TD = require('../../data/gcash-test-data');

test.describe('[Mobile] AD-66 TS-003: Scan QR Code and Verify Mobile Number Population', { tag: ['@e2e', '@regression', '@gcash'] }, () => {
  let loginPage;
  let homePage;
  let profilePage;
  let qrGenerationPage;
  let sendMoneyPage;

  test('[AD-66 TS-003 TC-001] Verify QR code contains correct mobile number and is scannable', async ({ page, context }) => {
    // Recipient Device Setup
    loginPage = new GCashLoginPage(page);
    homePage = new GCashHomePage(page);
    profilePage = new GCashProfilePage(page);
    qrGenerationPage = new GCashQRGenerationPage(page);

    // Step 1-2: Launch and login as recipient
    await loginPage.goto();
    await loginPage.loginAsRecipient();
    await expect(homePage.isHomeScreenDisplayed()).resolves.toBe(true);

    // Step 3: Navigate to Profile and generate QR
    await homePage.navigateToProfileTab();
    await profilePage.selectGenerateQROption();
    await expect(qrGenerationPage.isQRGenerationScreenDisplayed()).resolves.toBe(true);

    // Step 4: Generate QR code without amount
    await qrGenerationPage.generateQRWithoutAmount();
    await expect(qrGenerationPage.isQRCodeDisplayed()).resolves.toBe(true);

    // Sender Device Setup (simulated with new page)
    const senderPage = await context.newPage();
    const senderLoginPage = new GCashLoginPage(senderPage);
    const senderHomePage = new GCashHomePage(senderPage);
    sendMoneyPage = new GCashSendMoneyPage(senderPage);

    // Step 5: Launch and login as sender
    await senderLoginPage.goto();
    await senderLoginPage.loginAsSender();
    await expect(senderHomePage.isHomeScreenDisplayed()).resolves.toBe(true);

    // Step 6: Navigate to Send Money
    await senderHomePage.navigateToHomeTab();
    await senderHomePage.selectSendMoneyOption();
    await expect(sendMoneyPage.isSendMoneyScreenDisplayed()).resolves.toBe(true);

    // Step 7: Scan QR code
    await sendMoneyPage.clickScanQRButton();
    await expect(sendMoneyPage.isCameraOpen()).resolves.toBe(true);
    await sendMoneyPage.scanQRCode();

    // Step 8: Verify recipient mobile number is populated
    const recipientMobile = await sendMoneyPage.getRecipientMobile();
    await expect(recipientMobile).toBe(TD.qrCodeData.validRecipientMobile);

    await senderPage.close();
  });
});