const { test, expect } = require('../../fixtures');
const BankLoansPage = require('../../pages/bank-loans.page');
const TD = require('../../data/bank-test-data');

test.describe('[UI] TC-57: Verify user can successfully navigate to Personal Loans listing page from home page', {
  tag: ['@smoke', '@regression', '@bank-loans']
}, () => {
  let loansPage;

  test('[TC-57] Navigate to Personal Loans listing page from home page', async ({ page }) => {
    loansPage = new BankLoansPage(page);

    // Step 1: Launch the bank's website in a browser
    await loansPage.goto();
    await expect(page).toHaveURL(TD.urlPatterns.homepage);

    // Step 2: Locate and click on 'Loans' in the main navigation menu
    await loansPage.navigateToLoansMenu();

    // Step 3: Click on 'Personal Loans' option from the Loans menu
    await loansPage.clickPersonalLoans();
    await expect(page).toHaveURL(TD.urlPatterns.personalLoans);

    // Step 4: Verify that the Personal Loans listing page contains available loan products
    await expect(loansPage.page.locator('[data-testid="loan-products-list"]')).toBeVisible();
    const isListVisible = await loansPage.isLoanProductsListVisible();
    expect(isListVisible).toBeTruthy();
  });
});