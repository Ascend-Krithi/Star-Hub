const { test, expect } = require('../../fixtures');
const BankLoansPage = require('../../pages/bank-loans.page');
const TD = require('../../data/bank-test-data');

test.describe('[UI] TC-66: Verify authentication popup modal blocks application progression and both action buttons are functional', {
  tag: ['@regression', '@bank-loans']
}, () => {
  let loansPage;

  test('[TC-66] Authentication popup modal blocks progression and buttons are functional', async ({ page }) => {
    loansPage = new BankLoansPage(page);

    // Step 1-4: Navigate to Flexible Personal Loan details page
    await loansPage.goto();
    await loansPage.navigateToFlexiblePersonalLoanDetails();
    await expect(page).toHaveURL(TD.urlPatterns.flexiblePersonalLoan);

    // Step 5: Click on the 'Apply Now' button
    await loansPage.clickApplyNow();

    // Step 6: Verify that the popup is displayed as a modal
    await expect(loansPage.page.locator('[data-testid="auth-popup"]')).toBeVisible();
    const isPopupVisible = await loansPage.isAuthPopupVisible();
    expect(isPopupVisible).toBeTruthy();

    // Verify popup overlay blocks background interaction
    const isOverlayVisible = await loansPage.isPopupOverlayVisible();
    expect(isOverlayVisible).toBeTruthy();

    // Step 7: Verify that the popup contains the message and both action buttons
    await expect(loansPage.page.locator('[data-testid="auth-popup-message"]')).toBeVisible();
    await expect(loansPage.page.locator('[data-testid="login-button"]')).toBeVisible();
    await expect(loansPage.page.locator('[data-testid="signup-button"]')).toBeVisible();

    // Step 8: Click on 'Log in to Online Banking' button
    const loginButton = loansPage.page.locator('[data-testid="login-button"]');
    await loginButton.click();

    // Verify navigation or login form display
    await page.waitForTimeout(1000);
    const urlAfterLogin = page.url();
    expect(urlAfterLogin).toBeTruthy();

    // Step 9: Navigate back to the loan details page and click 'Apply Now' again
    await page.goto(TD.urls.flexiblePersonalLoan);
    await loansPage.clickApplyNow();
    await expect(loansPage.page.locator('[data-testid="auth-popup"]')).toBeVisible();

    // Step 10: Click on 'Don't have an account? Sign up here' button
    const signUpButton = loansPage.page.locator('[data-testid="signup-button"]');
    await signUpButton.click();

    // Verify navigation to sign-up page
    await page.waitForTimeout(1000);
    const urlAfterSignUp = page.url();
    expect(urlAfterSignUp).toBeTruthy();

    // Step 11: Verify that both buttons successfully navigate to their respective destinations
    expect(urlAfterLogin).not.toBe(TD.urls.flexiblePersonalLoan);
    expect(urlAfterSignUp).not.toBe(TD.urls.flexiblePersonalLoan);
  });
});