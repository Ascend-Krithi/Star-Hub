const { test, expect } = require('../../fixtures');
const BankLoansPage = require('../../pages/bank-loans.page');
const TD = require('../../data/bank-test-data');

test.describe('[UI] TC-124: Verify login or sign-up popup is displayed when unauthenticated user clicks Apply Now', { tag: ['@regression'] }, () => {
  let loansPage;

  test('[TC-124] Verify login or sign-up popup is displayed when unauthenticated user clicks Apply Now', async ({ page }) => {
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

    // Verify authentication popup is displayed
    await page.waitForTimeout(1000);
    const authPopupVisible = await loansPage.isAuthenticationPopupVisible();
    expect(authPopupVisible).toBeTruthy();
  });
});