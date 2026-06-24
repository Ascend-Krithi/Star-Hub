const { test, expect } = require('../../fixtures');
const GCashLoginPage = require('../../pages/gcash-login.page');
const GCashHomePage = require('../../pages/gcash-home.page');
const GCashProfilePage = require('../../pages/gcash-profile.page');
const GCashQRGenerationPage = require('../../pages/gcash-qr-generation.page');
const TD = require('../../data/gcash-test-data');

test.describe('[Mobile] AD-66 TS-001: Generate QR Code Without Amount', { tag: ['@smoke', '@regression', '@gcash'] }, () => {
  let loginPage;
  let homePage;
  let profilePage;
  let qrGenerationPage;

  test('[AD-66 TS-001 TC-001] Verify user can generate QR code without preset amount containing mobile number', async ({ page }) => {
    loginPage = new GCashLoginPage(page);
    homePage = new GCashHomePage(page);
    profilePage = new GCashProfilePage(page);
    qrGenerationPage = new GCashQRGenerationPage(page);

    // Step 1: Launch the GCash application
    await loginPage.goto();
    await expect(loginPage.isLoginScreenDisplayed()).resolves.toBe(true);

    // Step 2: Login with valid credentials
    await loginPage.login(TD.credentials.recipient.mobile, TD.credentials.recipient.password);
    await expect(homePage.isHomeScreenDisplayed()).resolves.toBe(true);

    // Step 3: Navigate to Profile Tab
    await homePage.navigateToProfileTab();
    await expect(profilePage.isProfileScreenDisplayed()).resolves.toBe(true);

    // Step 4: Select 'Generate QR Code for Receiving Money' option
    await profilePage.selectGenerateQROption();
    await expect(qrGenerationPage.isQRGenerationScreenDisplayed()).resolves.toBe(true);

    // Step 5: Generate QR code without entering amount
    await qrGenerationPage.generateQRWithoutAmount();

    // Step 6: Verify QR code is displayed and contains mobile number
    await expect(qrGenerationPage.isQRCodeDisplayed()).resolves.toBe(true);
    const displayedMobile = await qrGenerationPage.getDisplayedMobile();
    await expect(displayedMobile).toContain(TD.qrCodeData.validRecipientMobile);
  });
});