const { test, expect } = require('../../fixtures');
const GCashPage = require('../../pages/gcash.page');
const TD = require('../../data/gcash-test-data');

test.describe('[UI] AD-34 TS-009: Actionable Alternative Contact Methods', { tag: ['@regression', '@gcash'] }, () => {
  let gcash;

  test('[AD-34 TS-009 TC-001] Verify alternative contact methods are actionable for suspended account', async ({ page }) => {
    gcash = new GCashPage(page);

    // Step 1: Launch the GCash application
    await gcash.goto();
    await expect(loc.loginScreen(page)).toBeVisible();

    // Step 2: Login with valid credentials (balance ≥ ₱400)
    await gcash.login(TD.credentials.fullyVerifiedUser400.username, TD.credentials.fullyVerifiedUser400.password);
    await expect(loc.coreWalletDashboard(page)).toBeVisible();

    // Step 3: Navigate to Send Money > Express Send
    await gcash.navigateToSendMoney();
    await gcash.selectExpressSend();
    await expect(loc.expressSendScreen(page)).toBeVisible();

    // Step 4: Enter recipient mobile number with Suspended account status
    await gcash.enterRecipientMobile(TD.recipients.suspendedAccount);

    // Step 5: Enter transfer amount
    await gcash.enterTransferAmount(TD.amounts.amount250);

    // Step 6: Confirm transaction with MPIN
    await gcash.confirmTransaction();
    await gcash.enterMPIN(TD.credentials.fullyVerifiedUser400.mpin);

    // Step 7: View blocked transaction message
    await expect(loc.suspendedAccountError(page)).toBeVisible();
    const errorText = await gcash.getErrorMessageText();
    expect(errorText).toContain(TD.messages.suspendedAccountError);

    // Step 8: Verify alternative contact methods are displayed
    const isHotlineVisible = await gcash.isCustomerSupportHotlineVisible();
    const isEmailVisible = await gcash.isCustomerSupportEmailVisible();
    const isChatVisible = await gcash.isInAppChatLinkVisible();
    
    expect(isHotlineVisible).toBe(true);
    expect(isEmailVisible).toBe(true);
    expect(isChatVisible).toBe(true);

    // Step 9: Verify contact methods are actionable
    await expect(loc.customerSupportHotline(page)).toBeEnabled();
    await expect(loc.customerSupportEmail(page)).toBeEnabled();
    await expect(loc.inAppChatLink(page)).toBeEnabled();
    
    // Test clicking each contact method
    await gcash.clickCustomerSupportHotline();
    await page.goBack();
    
    await gcash.clickCustomerSupportEmail();
    await page.goBack();
    
    await gcash.clickInAppChatLink();
  });
});