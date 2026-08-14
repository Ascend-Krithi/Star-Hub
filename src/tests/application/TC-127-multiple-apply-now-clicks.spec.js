const { test, expect } = require('../../fixtures');
const BankLoansPage = require('../../pages/bank-loans.page');
const TD = require('../../data/bank-test-data');

test.describe('[UI] TC-127: Verify system behavior when Apply Now button is clicked multiple times rapidly by unauthenticated user', { tag: ['@regression'] }, () => {
  let loansPage;

  test('[TC-127] Verify system behavior when Apply Now button is clicked multiple times rapidly by unauthenticated user', async ({ page }) => {
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

    // Step 5: Click on 'Apply Now' button multiple times rapidly
    await loansPage.clickApplyNowMultipleTimes(5);

    // Step 6: Verify that only one authentication popup is displayed
    await page.waitForTimeout(1500);
    const popupCount = await loansPage.countAuthenticationPopups();
    expect(popupCount).toBeLessThanOrEqual(1);

    // Step 7: Verify the popup contains correct message and buttons
    if (popupCount === 1) {
      const authPopupVisible = await loansPage.isAuthenticationPopupVisible();
      expect(authPopupVisible).toBeTruthy();
      
      const popupMessage = await loansPage.getAuthPopupMessageText();
      expect(popupMessage).toContain(TD.authMessages.loginRequired);
      
      const loginButtonVisible = await loansPage.isLoginButtonVisible();
      expect(loginButtonVisible).toBeTruthy();
      
      const signUpButtonVisible = await loansPage.isSignUpButtonVisible();
      expect(signUpButtonVisible).toBeTruthy();
    }
  });
});