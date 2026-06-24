const { test, expect } = require('../../fixtures');
const GCashPage = require('../../pages/gcash.page');
const TD = require('../../data/gcash-test-data');

test.describe('[UI] AD-34 TS-006: Cash-In Option Navigation', { tag: ['@regression', '@gcash'] }, () => {
  let gcash;

  test('[AD-34 TS-006 TC-001] Verify navigation to cash-in flow from insufficient balance error', async ({ page }) => {
    gcash = new GCashPage(page);

    // Step 1: Launch the GCash application
    await gcash.goto();
    await expect(loc.loginScreen(page)).toBeVisible();

    // Step 2: Login with valid credentials (balance = ₱20)
    await gcash.login(TD.credentials.fullyVerifiedUser20.username, TD.credentials.fullyVerifiedUser20.password);
    await expect(loc.coreWalletDashboard(page)).toBeVisible();

    // Step 3: Navigate to Send Money > Express Send
    await gcash.navigateToSendMoney();
    await gcash.selectExpressSend();
    await expect(loc.expressSendScreen(page)).toBeVisible();

    // Step 4: Enter recipient mobile number and transfer amount
    await gcash.enterRecipientMobile(TD.recipients.validMobile);
    await gcash.enterTransferAmount(TD.amounts.amount100);

    // Step 5: Confirm transaction with MPIN
    await gcash.confirmTransaction();
    await gcash.enterMPIN(TD.credentials.fullyVerifiedUser20.mpin);

    // Step 6: View error message with cash-in options
    await expect(loc.insufficientBalanceError(page)).toBeVisible();
    await expect(loc.cashInOptions(page)).toBeVisible();
    
    const isBankTransferVisible = await gcash.isBankTransferOptionVisible();
    const isOverTheCounterVisible = await gcash.isOverTheCounterOptionVisible();
    const isOnlineBankingVisible = await gcash.isOnlineBankingOptionVisible();
    
    expect(isBankTransferVisible).toBe(true);
    expect(isOverTheCounterVisible).toBe(true);
    expect(isOnlineBankingVisible).toBe(true);

    // Step 7: Select Bank Transfer cash-in option
    await gcash.selectCashInOption(TD.cashInOptions.bankTransfer);

    // Step 8: Verify navigation to cash-in flow
    await expect(page).toHaveURL(/.*cash-in.*/);
    
    // Verify transaction details are preserved
    await page.goBack();
    const recipientValue = await loc.recipientInput(page).inputValue();
    const amountValue = await loc.amountInput(page).inputValue();
    expect(recipientValue).toBe(TD.recipients.validMobile);
    expect(amountValue).toBe(TD.amounts.amount100);
  });
});