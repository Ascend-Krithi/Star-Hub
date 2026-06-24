const { test, expect } = require('../../fixtures');
const GCashPage = require('../../pages/gcash.page');
const TD = require('../../data/gcash-test-data');

test.describe('[UI] AD-34 TS-004: Insufficient Balance Error with Cash-In Options', { tag: ['@regression', '@gcash'] }, () => {
  let gcash;

  test('[AD-34 TS-004 TC-001] Verify insufficient balance error displays cash-in options', async ({ page }) => {
    gcash = new GCashPage(page);

    // Step 1: Launch the GCash application
    await gcash.goto();
    await expect(loc.loginScreen(page)).toBeVisible();

    // Step 2: Login with valid credentials (balance = ₱50)
    await gcash.login(TD.credentials.fullyVerifiedUser50.username, TD.credentials.fullyVerifiedUser50.password);
    await expect(loc.coreWalletDashboard(page)).toBeVisible();

    // Step 3: Verify current wallet balance
    const balance = await gcash.getWalletBalance();
    expect(balance).toContain('50');

    // Step 4: Navigate to Send Money > Express Send
    await gcash.navigateToSendMoney();
    await gcash.selectExpressSend();
    await expect(loc.expressSendScreen(page)).toBeVisible();

    // Step 5: Enter recipient mobile number
    await gcash.enterRecipientMobile(TD.recipients.validMobile);

    // Step 6: Enter transfer amount greater than wallet balance
    await gcash.enterTransferAmount(TD.amounts.amount100);

    // Step 7: Confirm transaction with MPIN
    await gcash.confirmTransaction();
    await gcash.enterMPIN(TD.credentials.fullyVerifiedUser50.mpin);

    // Step 8: Verify error message is displayed
    await expect(loc.insufficientBalanceError(page)).toBeVisible();
    const errorText = await gcash.getErrorMessageText();
    expect(errorText).toContain(TD.messages.insufficientBalance);

    // Step 9: Verify cash-in options are displayed
    await expect(loc.cashInOptions(page)).toBeVisible();
    const isBankTransferVisible = await gcash.isBankTransferOptionVisible();
    const isOverTheCounterVisible = await gcash.isOverTheCounterOptionVisible();
    const isOnlineBankingVisible = await gcash.isOnlineBankingOptionVisible();
    
    expect(isBankTransferVisible).toBe(true);
    expect(isOverTheCounterVisible).toBe(true);
    expect(isOnlineBankingVisible).toBe(true);
  });
});