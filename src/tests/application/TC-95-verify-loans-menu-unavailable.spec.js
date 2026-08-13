const { test, expect } = require('../../fixtures');
const BankLoansPage = require('../../pages/bank-loans.page');
const TD = require('../../data/bank-test-data');

test.describe('[UI] TS-006: Verify system handles gracefully when Loans menu is not accessible from home page', { tag: ['@regression'] }, () => {
  let loansPage;

  test('[TC-95] Verify system handles gracefully when Loans menu is not accessible from home page', async ({ page }) => {
    loansPage = new BankLoansPage(page);

    // Step 1: Launch the bank's website in a web browser
    await loansPage.goto();
    await expect(page).toHaveURL(TD.urlPatterns.homePage);

    // Step 2: Locate the main navigation menu on the home page
    const mainMenuVisible = await page.locator('nav').isVisible();
    expect(mainMenuVisible).toBe(true);

    // Step 3: Attempt to locate the 'Loans' option in the main navigation menu
    const isLoansMenuVisible = await loansPage.isLoansMenuVisible();

    // Step 4: Verify that the system displays an appropriate message or alternative navigation options
    if (!isLoansMenuVisible) {
      // Verify graceful degradation - page should remain functional
      await expect(page).toHaveURL(TD.urlPatterns.homePage);
      const pageStable = await page.locator('body').isVisible();
      expect(pageStable).toBe(true);
    }

    // Step 5: Verify that the page remains functional and other navigation options are still accessible
    const mainMenuStillVisible = await page.locator('nav').isVisible();
    expect(mainMenuStillVisible).toBe(true);
    await expect(page).toHaveURL(TD.urlPatterns.homePage);
  });
});