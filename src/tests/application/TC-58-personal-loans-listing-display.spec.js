const { test, expect } = require('../../fixtures');
const BankLoansPage = require('../../pages/bank-loans.page');
const TD = require('../../data/bank-test-data');

test.describe('[UI] TC-58: Verify Personal Loans listing page displays all available personal loan products', {
  tag: ['@smoke', '@regression', '@bank-loans']
}, () => {
  let loansPage;

  test('[TC-58] Personal Loans listing page displays all available loan products', async ({ page }) => {
    loansPage = new BankLoansPage(page);

    // Step 1: Launch the bank's website in a browser
    await loansPage.goto();
    await expect(page).toHaveURL(TD.urlPatterns.homepage);

    // Step 2: Navigate to 'Loans' section from main navigation
    await loansPage.navigateToLoansMenu();

    // Step 3: Click on 'Personal Loans' option
    await loansPage.clickPersonalLoans();
    await expect(page).toHaveURL(TD.urlPatterns.personalLoans);

    // Step 4: Verify that a list of personal loan products is displayed on the page
    await expect(loansPage.page.locator('[data-testid="loan-products-list"]')).toBeVisible();
    const productCount = await loansPage.getLoanProductCardsCount();
    expect(productCount).toBeGreaterThan(0);

    // Verify Flexible Personal Loan is visible
    await expect(loansPage.page.locator('[data-testid="flexible-personal-loan"]')).toBeVisible();

    // Step 5: Verify that each loan product displays relevant information
    const loanCards = loansPage.page.locator('[data-testid="loan-product-card"]');
    const firstCard = loanCards.first();
    await expect(firstCard).toBeVisible();
  });
});