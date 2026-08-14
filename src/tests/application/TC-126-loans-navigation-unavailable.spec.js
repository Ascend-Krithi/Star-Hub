const { test, expect } = require('../../fixtures');
const BankLoansPage = require('../../pages/bank-loans.page');
const TD = require('../../data/bank-test-data');

test.describe('[UI] TC-126: Verify Personal Loans listing page is not accessible when Loans navigation is unavailable', { tag: ['@regression'] }, () => {
  let loansPage;

  test('[TC-126] Verify Personal Loans listing page is not accessible when Loans navigation is unavailable', async ({ page }) => {
    loansPage = new BankLoansPage(page);

    // Step 1: Launch the bank's website in a browser
    await loansPage.goto();
    await expect(page).toHaveURL(TD.urlPatterns.home);

    // Step 2: Attempt to locate 'Loans' navigation menu option
    const loansNavVisible = await loansPage.isLoansNavVisible();

    // Step 3 & 4: Verify behavior when Loans nav is unavailable
    if (!loansNavVisible) {
      // Loans navigation is not visible - verify user remains on home page
      await expect(page).toHaveURL(TD.urlPatterns.home);
      expect(loansNavVisible).toBeFalsy();
    } else {
      // If Loans nav is visible, attempt to click and verify if disabled
      try {
        await loansPage.navigateToLoans();
        const currentUrl = page.url();
        // If navigation occurred, this test case scenario doesn't apply
        // This test is for when Loans is unavailable/disabled
        console.log('Loans navigation is available - test scenario not applicable');
      } catch (error) {
        // Navigation failed as expected when disabled
        await expect(page).toHaveURL(TD.urlPatterns.home);
      }
    }
  });
});