const { test, expect } = require('../../fixtures');
const BankLoansPage = require('../../pages/bank-loans.page');
const TD = require('../../data/bank-test-data');

test.describe('[UI] TC-61: Verify Apply Now button is visible and clickable on Flexible Personal Loan details page', {
  tag: ['@smoke', '@regression', '@bank-loans']
}, () => {
  let loansPage;

  test('[TC-61] Apply Now button is visible and clickable', async ({ page }) => {
    loansPage = new BankLoansPage(page);

    // Step 1-4: Navigate to Flexible Personal Loan details page
    await loansPage.goto();
    await loansPage.navigateToFlexiblePersonalLoanDetails();
    await expect(page).toHaveURL(TD.urlPatterns.flexiblePersonalLoan);

    // Step 5: Locate the 'Apply Now' button on the loan details page
    await expect(loansPage.page.locator('[data-testid="apply-now-button"]')).toBeVisible();
    const isApplyNowVisible = await loansPage.isApplyNowButtonVisible();
    expect(isApplyNowVisible).toBeTruthy();

    // Step 6: Verify that the 'Apply Now' button is enabled and clickable
    const isApplyNowEnabled = await loansPage.isApplyNowButtonEnabled();
    expect(isApplyNowEnabled).toBeTruthy();

    // Step 7: Click on the 'Apply Now' button
    await loansPage.clickApplyNow();

    // Verify system initiates the next step (authentication check or application form)
    // Wait for either popup or navigation
    await page.waitForTimeout(1000);
  });
});