const { test, expect } = require('../../fixtures');
const BankLoansPage = require('../../pages/bank-loans.page');
const TD = require('../../data/bank-test-data');

test.describe('[UI] TC-125: Verify authentication popup displays correct message and action buttons for unauthenticated users', { tag: ['@regression'] }, () => {
  let loansPage;

  test('[TC-125] Verify authentication popup displays correct message and action buttons for unauthenticated users', async ({ page }) => {
    loansPage = new BankLoansPage(page);

    // Step 1: Launch the bank's website in a browser without logging in
    await loansPage.goto();
    await expect(page).toHaveURL(TD.urlPatterns.home);

    // Step 2: Navigate to 'Loans' section
    await loansPage.navigateToLoans();
    await expect(page).toHaveURL(TD.urlPatterns.loans);

    // Step 3: Click on 'Personal Loans' option
    await loansPage.navigateToPersonalLoans();
    await expect(page).toHaveURL(TD.urlPatterns.personalLoans);

    // Step 4: Select 'Flexible Personal Loan' from the list
    await loansPage.selectFlexiblePersonalLoan();
    await expect(page).toHaveURL(TD.urlPatterns.flexiblePersonalLoan);

    // Step 5: Click on 'Apply Now' button
    await loansPage.clickApplyNow();

    // Step 6: Verify the popup displays the message
    await page.waitForTimeout(1000);
    const authPopupVisible = await loansPage.isAuthenticationPopupVisible();
    expect(authPopupVisible).toBeTruthy();
    const popupMessage = await loansPage.getAuthPopupMessageText();
    expect(popupMessage).toContain(TD.authMessages.loginRequired);

    // Step 7: Verify 'Log in to Online Banking' button is visible in the popup
    const loginButtonVisible = await loansPage.isLoginButtonVisible();
    expect(loginButtonVisible).toBeTruthy();

    // Step 8: Verify 'Don't have an account? Sign up here' button is visible in the popup
    const signUpButtonVisible = await loansPage.isSignUpButtonVisible();
    expect(signUpButtonVisible).toBeTruthy();
  });
});