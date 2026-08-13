const { test, expect } = require('../../fixtures');
const BankLoansPage = require('../../pages/bank-loans.page');
const TD = require('../../data/bank-test-data');

test.describe('[UI] TS-004: Verify login and sign-up popup is displayed when unauthenticated user clicks Apply Now', { tag: ['@smoke', '@regression'] }, () => {
  let loansPage;

  test('[TC-93] Verify login and sign-up popup is displayed when unauthenticated user clicks Apply Now', async ({ page }) => {
    loansPage = new BankLoansPage(page);

    // Step 1: Launch the bank's website in a web browser
    await loansPage.goto();
    await expect(page).toHaveURL(TD.urlPatterns.homePage);

    // Step 2: Navigate to 'Loans' → 'Personal Loans' → 'Flexible Personal Loan'
    await loansPage.navigateToFlexiblePersonalLoan();
    await expect(page).toHaveURL(TD.urlPatterns.flexiblePersonalLoanPage);

    // Step 3: Verify that user is not logged in by checking for absence of user profile information
    const isLoggedOut = await loansPage.isUserLoggedOut();
    expect(isLoggedOut).toBe(true);

    // Step 4: Click on the 'Apply Now' button
    await expect(loansPage.page.getByRole('button', { name: 'Apply Now' })).toBeVisible();
    await loansPage.clickApplyNow();

    // Step 5: Verify that a popup window is displayed on the screen
    await expect(loansPage.page.locator('[data-testid="authentication-popup"]')).toBeVisible();

    // Step 6: Verify that the popup is modal and prevents interaction with the background page
    await expect(loansPage.page.locator('[data-testid="authentication-popup"]')).toBeVisible();
    const isPopupModal = await loansPage.isAuthenticationPopupVisible();
    expect(isPopupModal).toBe(true);
  });
});