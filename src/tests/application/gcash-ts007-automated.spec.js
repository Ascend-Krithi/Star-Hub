const { test, expect } = require('../../fixtures');
const GCashPage = require('../../pages/gcash.page');
const TD = require('../../data/gcash-test-data');

test.describe('[UI] AD-34 TS-007: Suspended Recipient Account Blocking', { tag: ['@regression', '@gcash'] }, () => {
  let gcash;

  test('[AD-34 TS-007 TC-001] Verify transaction is blocked for suspended recipient account', async ({ page }) => {
    gcash = new GCashPage(page);

    // Step 1: Launch the GCash application
    await gcash.goto();
    await expect(loc.loginScreen(page)).toBeVisible();

    // Step 2: Login with valid credentials (balance ≥ ₱500)
    await gcash.login(TD.credentials.fullyVerifiedUser500.username, TD.credentials.fullyVerifiedUser500.password);
    await expect(loc.coreWalletDashboard(page)).toBeVisible();

    // Step 3: Navigate to Send Money > Express Send
    await gcash.navigateToSendMoney();
    await gcash.selectExpressSend();
    await expect(loc.expressSendScreen(page)).toBeVisible();

    // Step 4: Enter recipient mobile number with Suspended account status
    await gcash.enterRecipientMobile(TD.recipients.suspendedAccount);

    // Step 5: Enter transfer amount
    await gcash.enterTransferAmount(TD.amounts.amount300);

    // Step 6: Confirm transaction with MPIN
    await gcash.confirmTransaction();
    await gcash.enterMPIN(TD.credentials.fullyVerifiedUser500.mpin);

    // Step 7: Verify transaction is blocked
    await expect(loc.suspendedAccountError(page)).toBeVisible();
    const errorText = await gcash.getErrorMessageText();
    expect(errorText).toContain(TD.messages.suspendedAccountError);

    // Step 8: Verify wallet balance remains unchanged
    const balance = await gcash.getWalletBalance();
    expect(balance).toContain('500');
  });
});