const { test, expect } = require('../../fixtures');
const BankLoansPage = require('../../pages/bank-loans.page');
const TD = require('../../data/bank-test-data');

test.describe('[UI] TC-120: Verify selecting Flexible Personal Loan displays the loan details page', { tag: ['@smoke', '@regression'] }, () => {
  let loansPage;

  test('[TC-120] Verify selecting Flexible Personal Loan displays the loan details page', async ({ page }) => {
    loansPage = new BankLoansPage(page);

    // Step 1: Launch the bank's website in a browser
    await loansPage.goto();
    await expect(page).toHaveURL(TD.urlPatterns.home);

    // Step 2: Navigate to 'Loans' section
    await expect(page.locator('body')).toBeVisible();
    await loansPage.navigateToLoans();
    await expect(page).toHaveURL(TD.urlPatterns.loans);

    // Step 3: Click on 'Personal Loans' option
    const personalLoansVisible = await loansPage.isPersonalLoansLinkVisible();
    expect(personalLoansVisible).toBeTruthy();
    await loansPage.navigateToPersonalLoans();
    await expect(page).toHaveURL(TD.urlPatterns.personalLoans);

    // Step 4: Locate and click on 'Flexible Personal Loan' from the list
    const flexibleLoanVisible = await loansPage.isFlexiblePersonalLoanVisible();
    expect(flexibleLoanVisible).toBeTruthy();
    await loansPage.selectFlexiblePersonalLoan();
    await expect(page).toHaveURL(TD.urlPatterns.flexiblePersonalLoan);

    // Verify loan details page is displayed
    const loanDetailsDisplayed = await loansPage.isLoanDetailsPageDisplayed();
    expect(loanDetailsDisplayed).toBeTruthy();
  });
});