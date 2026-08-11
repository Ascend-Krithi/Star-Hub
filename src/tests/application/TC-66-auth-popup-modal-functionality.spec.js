const { test, expect } = require('../../fixtures');
const BankHomePage = require('../../pages/bank-home.page');
const PersonalLoansPage = require('../../pages/personal-loans.page');
const FlexibleLoanDetailsPage = require('../../pages/flexible-loan-details.page');
const TD = require('../../data/bank-test-data');

test.describe('[UI] TC-66: Verify authentication popup modal blocks application progression and both action buttons are functional', { tag: ['@regression'] }, () => {
  let homePage;
  let personalLoansPage;
  let loanDetailsPage;

  test('[TC-66] Verify authentication popup modal and button functionality', async ({ page }) => {
    homePage = new BankHomePage(page);
    personalLoansPage = new PersonalLoansPage(page);
    loanDetailsPage = new FlexibleLoanDetailsPage(page);

    // Step 1: Launch the bank's website without logging in
    await homePage.goto(TD.urls.bankHome);
    await expect(page).toHaveURL(TD.urls.bankHome);

    // Step 2: Navigate to 'Loans' section
    await homePage.clickLoansMenu();
    await page.waitForTimeout(1000);

    // Step 3: Click on 'Personal Loans' option
    await homePage.clickPersonalLoansSubmenu();
    await page.waitForLoadState('domcontentloaded');

    // Step 4: Select 'Flexible Personal Loan'
    await personalLoansPage.clickFlexiblePersonalLoan();
    await page.waitForLoadState('domcontentloaded');

    // Step 5: Click on 'Apply Now' button
    await loanDetailsPage.clickApplyNowButton();
    await page.waitForTimeout(2000);

    // Step 6: Verify popup is displayed as modal
    await expect(loanDetailsPage.isAuthPopupVisible()).resolves.toBeTruthy();

    // Step 7: Verify message and both action buttons are visible
    const popupMessage = await loanDetailsPage.getAuthPopupMessage();
    expect(popupMessage).toContain(TD.authPopup.message);
    await expect(loanDetailsPage.isLoginButtonVisible()).resolves.toBeTruthy();
    await expect(loanDetailsPage.isSignupButtonVisible()).resolves.toBeTruthy();

    // Step 8: Click on 'Log in to Online Banking' button
    await loanDetailsPage.clickLoginButton();
    await page.waitForTimeout(2000);
    await expect(page).toHaveURL(TD.urlPatterns.login);

    // Step 9: Navigate back and click 'Apply Now' again
    await page.goBack();
    await page.waitForLoadState('domcontentloaded');
    await loanDetailsPage.clickApplyNowButton();
    await page.waitForTimeout(2000);

    // Step 10: Click on 'Don't have an account? Sign up here' button
    await loanDetailsPage.clickSignupButton();
    await page.waitForTimeout(2000);
    await expect(page).toHaveURL(TD.urlPatterns.signup);

    // Step 11: Verify both buttons successfully navigate
    const currentUrl = page.url();
    expect(currentUrl).toMatch(TD.urlPatterns.signup);
  });
});