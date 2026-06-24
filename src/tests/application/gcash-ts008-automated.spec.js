const { test, expect } = require('../../fixtures');
const GCashPage = require('../../pages/gcash.page');
const TD = require('../../data/gcash-test-data');

test.describe('[UI] AD-34 TS-008: Frozen Recipient Account with Alternative Contact Methods', { tag: ['@regression', '@gcash'] }, () => {
  let gcash;

  test('[AD-34 TS-008 TC-001] Verify frozen account error displays alternative contact methods', async ({ page }) => {
    gcash = new GCashPage(page);

    // Step 1: Launch the GCash application
    await gcash.goto();
    await expect(loc.loginScreen(page)).toBeVisible();

    // Step 2: Login with valid credentials (balance ≥ ₱1000)
    await gcash.login(TD.credentials.fullyVerifiedUser1000.username, TD.credentials.fullyVerifiedUser1000.password);
    await expect(loc.coreWalletDashboard(page)).toBeVisible();

    // Step 3: Navigate to Send Money > Express Send
    await gcash.navigateToSendMoney();
    await gcash.selectExpressSend();
    await expect(loc.expressSendScreen(page)).toBeVisible();

    // Step 4: Enter recipient mobile number with Frozen account status
    await gcash.enterRecipientMobile(TD.recipients.frozenAccount);

    // Step 5: Enter transfer amount
    await gcash.enterTransferAmount(TD.amounts.amount500);

    // Step 6: Confirm transaction with MPIN
    await gcash.confirmTransaction();
    await gcash.enterMPIN(TD.credentials.fullyVerifiedUser1000.mpin);

    // Step 7: Verify transaction is blocked with error message
    await expect(loc.frozenAccountError(page)).toBeVisible();
    const errorText = await gcash.getErrorMessageText();
    expect(errorText).toContain(TD.messages.frozenAccountError);

    // Step 8: Verify alternative contact methods are provided
    const isHotlineVisible = await gcash.isCustomerSupportHotlineVisible();
    const isEmailVisible = await gcash.isCustomerSupportEmailVisible();
    const isChatVisible = await gcash.isInAppChatLinkVisible();
    
    expect(isHotlineVisible).toBe(true);
    expect(isEmailVisible).toBe(true);
    expect(isChatVisible).toBe(true);

    // Step 9: Verify wallet balance remains unchanged
    const balance = await gcash.getWalletBalance();
    expect(balance).toContain('1000');
  });
});