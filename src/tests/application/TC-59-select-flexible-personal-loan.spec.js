const { test, expect } = require('../../fixtures');
const BankLoansPage = require('../../pages/bank-loans.page');
const TD = require('../../data/bank-test-data');

test.describe('[UI] TC-59: Verify user can select Flexible Personal Loan and view loan details page', {
  tag: ['@smoke', '@regression', '@bank-loans']
}, () => {
  let loansPage;

  test('[TC-59] Select Flexible Personal Loan and view loan details page', async ({ page }) => {
    loansPage = new BankLoansPage(page);

    // Step 1: Launch the bank's website in a browser
    await loansPage.goto();
    await expect(page).toHaveURL(TD.urlPatterns.homepage);

    // Step 2: Navigate to 'Loans' section from main navigation
    await loansPage.navigateToLoansMenu();

    // Step 3: Click on 'Personal Loans' option
    await loansPage.clickPersonalLoans();
    await expect(page).toHaveURL(TD.urlPatterns.personalLoans);

    // Step 4: Locate 'Flexible Personal Loan' from the list of available loan products
    await expect(loansPage.page.locator('[data-testid="flexible-personal-loan"]')).toBeVisible();
    const isFlexibleLoanVisible = await loansPage.isFlexiblePersonalLoanVisible();
    expect(isFlexibleLoanVisible).toBeTruthy();

    // Step 5: Click on 'Flexible Personal Loan' to view details
    await loansPage.clickFlexiblePersonalLoan();
    await expect(page).toHaveURL(TD.urlPatterns.flexiblePersonalLoan);

    // Verify loan configuration options are displayed
    await expect(loansPage.page.locator('[data-testid="loan-amount"]')).toBeVisible();
    await expect(loansPage.page.locator('[data-testid="loan-tenure"]')).toBeVisible();
    await expect(loansPage.page.locator('[data-testid="repayment-frequency"]')).toBeVisible();
  });
});