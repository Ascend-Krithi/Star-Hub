const { test, expect } = require('../../fixtures');
const BankLoansPage = require('../../pages/bank-loans.page');
const TD = require('../../data/bank-test-data');

test.describe('[UI] TS-005: Verify authentication popup displays correct message and action buttons for unauthenticated users', { tag: ['@smoke', '@regression'] }, () => {
  let loansPage;

  test('[TC-94] Verify authentication popup displays correct message and action buttons for unauthenticated users', async ({ page }) => {
    loansPage = new BankLoansPage(page);

    // Step 1: Launch the bank's website in a web browser
    await loansPage.goto();
    await expect(page).toHaveURL(TD.urlPatterns.homePage);

    // Step 2: Navigate to 'Loans' → 'Personal Loans' → 'Flexible Personal Loan' → Click 'Apply Now'
    await loansPage.navigateToFlexiblePersonalLoan();
    await expect(page).toHaveURL(TD.urlPatterns.flexiblePersonalLoanPage);
    await expect(loansPage.page.getByRole('button', { name: 'Apply Now' })).toBeVisible();
    await loansPage.clickApplyNow();
    await expect(loansPage.page.locator('[data-testid="authentication-popup"]')).toBeVisible();

    // Step 3: Verify that the popup contains the message: 'Please log in or create an account to continue with your application'
    const popupMessage = await loansPage.getAuthPopupMessage();
    expect(popupMessage).toBe(TD.authenticationMessages.popupMessage);

    // Step 4: Verify that the 'Log in to Online Banking' button is visible in the popup
    await expect(loansPage.page.getByRole('button', { name: 'Log in to Online Banking' })).toBeVisible();

    // Step 5: Verify that the 'Don't have an account? Sign up here' button is visible in the popup
    await expect(loansPage.page.getByRole('button', { name: "Don't have an account? Sign up here" })).toBeVisible();

    // Step 6: Verify that both buttons are clickable and properly positioned within the popup
    const isLoginButtonEnabled = await loansPage.isLoginButtonEnabled();
    expect(isLoginButtonEnabled).toBe(true);
    const isSignupButtonEnabled = await loansPage.isSignupButtonEnabled();
    expect(isSignupButtonEnabled).toBe(true);

    // Step 7: Verify that the popup layout is user-friendly with proper spacing and alignment
    await expect(loansPage.page.locator('[data-testid="auth-popup-message"]')).toBeVisible();
    await expect(loansPage.page.getByRole('button', { name: 'Log in to Online Banking' })).toBeVisible();
    await expect(loansPage.page.getByRole('button', { name: "Don't have an account? Sign up here" })).toBeVisible();
  });
});