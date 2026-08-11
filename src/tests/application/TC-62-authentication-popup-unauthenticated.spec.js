const { test, expect } = require('../../fixtures');
const BankLoansPage = require('../../pages/bank-loans.page');
const TD = require('../../data/bank-test-data');

test.describe('[UI] TC-62: Verify authentication popup displays when unauthenticated user clicks Apply Now', {
  tag: ['@smoke', '@regression', '@bank-loans']
}, () => {
  let loansPage;

  test('[TC-62] Authentication popup displays for unauthenticated user', async ({ page }) => {
    loansPage = new BankLoansPage(page);

    // Step 1: Launch the bank's website in a browser without logging in
    await loansPage.goto();
    await expect(page).toHaveURL(TD.urlPatterns.homepage);

    // Step 2-4: Navigate to Flexible Personal Loan details page
    await loansPage.navigateToFlexiblePersonalLoanDetails();
    await expect(page).toHaveURL(TD.urlPatterns.flexiblePersonalLoan);

    // Step 5: Click on the 'Apply Now' button without being logged in
    await loansPage.clickApplyNow();

    // Verify popup window is displayed
    await expect(loansPage.page.locator('[data-testid="auth-popup"]')).toBeVisible();
    const isPopupVisible = await loansPage.isAuthPopupVisible();
    expect(isPopupVisible).toBeTruthy();

    // Step 6: Verify the popup contains the message
    await expect(loansPage.page.locator('[data-testid="auth-popup-message"]')).toBeVisible();
    const popupMessage = await loansPage.getAuthPopupMessage();
    expect(popupMessage).toContain(TD.authPopup.message);

    // Step 7: Verify that 'Log in to Online Banking' button is visible
    await expect(loansPage.page.locator('[data-testid="login-button"]')).toBeVisible();
    const isLoginButtonVisible = await loansPage.isLoginButtonVisible();
    expect(isLoginButtonVisible).toBeTruthy();

    // Step 8: Verify that 'Don't have an account? Sign up here' button is visible
    await expect(loansPage.page.locator('[data-testid="signup-button"]')).toBeVisible();
    const isSignUpButtonVisible = await loansPage.isSignUpButtonVisible();
    expect(isSignUpButtonVisible).toBeTruthy();

    // Step 9: Verify both buttons are clickable and functional
    await expect(loansPage.page.locator('[data-testid="login-button"]')).toBeEnabled();
    await expect(loansPage.page.locator('[data-testid="signup-button"]')).toBeEnabled();
  });
});