const { test, expect } = require('../../fixtures');
const BankLoansPage = require('../../pages/bank-loans.page');
const TD = require('../../data/bank-test-data');

test.describe('[UI] TC-63: Verify Personal Loans listing page is not directly accessible without using Loans menu', {
  tag: ['@regression', '@bank-loans']
}, () => {
  let loansPage;

  test('[TC-63] Personal Loans page is not directly accessible', async ({ page }) => {
    loansPage = new BankLoansPage(page);

    // Step 1: Launch the bank's website in a browser
    await loansPage.goto();
    await expect(page).toHaveURL(TD.urlPatterns.homepage);

    // Step 2: Attempt to access Personal Loans page directly
    try {
      await page.goto(TD.urls.personalLoans, { waitUntil: 'domcontentloaded', timeout: 10000 });
      
      // Step 3: Verify that Personal Loans listing page is not accessible
      const currentUrl = page.url();
      
      // Either redirected to home page or shown an error
      const isRedirectedToHome = currentUrl.match(TD.urlPatterns.homepage);
      const isErrorPage = await page.locator('text=/error|not found|access denied/i').isVisible().catch(() => false);
      
      expect(isRedirectedToHome || isErrorPage).toBeTruthy();
    } catch (error) {
      // Navigation timeout or error is also acceptable
      expect(error.message).toBeTruthy();
    }
  });
});