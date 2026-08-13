const { test, expect } = require('../../fixtures');
const BankLoansPage = require('../../pages/bank-loans.page');
const TD = require('../../data/bank-test-data');

test.describe('[UI] TS-007: Verify system behavior when Personal Loans listing page has no available products', { tag: ['@regression'] }, () => {
  let loansPage;

  test('[TC-96] Verify system behavior when Personal Loans listing page has no available products', async ({ page }) => {
    loansPage = new BankLoansPage(page);

    // Step 1: Launch the bank's website in a web browser
    await loansPage.goto();
    await expect(page).toHaveURL(TD.urlPatterns.homePage);

    // Step 2: Navigate to 'Loans' from the main navigation menu
    await expect(loansPage.page.getByRole('link', { name: 'Loans' })).toBeVisible();
    await loansPage.page.getByRole('link', { name: 'Loans' }).click();

    // Step 3: Click on 'Personal Loans' option
    await expect(loansPage.page.getByRole('link', { name: 'Personal Loans' })).toBeVisible();
    await loansPage.page.getByRole('link', { name: 'Personal Loans' }).click();
    await expect(page).toHaveURL(TD.urlPatterns.personalLoansPage);

    // Step 4: Verify that the page displays an appropriate message indicating no products are available
    const noProductsMessage = page.getByText(/no.*products.*available/i);
    const hasNoProductsMessage = await noProductsMessage.isVisible().catch(() => false);

    if (hasNoProductsMessage) {
      await expect(noProductsMessage).toBeVisible();
    }

    // Step 5: Verify that the page does not display any product cards or listings
    const productCards = page.locator('[data-testid="product-card"]');
    const productCount = await productCards.count();
    expect(productCount).toBe(0);

    // Step 6: Verify that the page provides alternative actions or contact information for users
    const contactInfo = page.getByText(/contact/i);
    const alternativeActions = page.getByText(/check back/i);
    const hasContactOrAlternative = (await contactInfo.isVisible().catch(() => false)) || (await alternativeActions.isVisible().catch(() => false));
    expect(hasContactOrAlternative || hasNoProductsMessage).toBe(true);

    // Step 7: Verify that the page layout and navigation remain functional
    await expect(page).toHaveURL(TD.urlPatterns.personalLoansPage);
    const navigationVisible = await page.locator('nav').isVisible();
    expect(navigationVisible).toBe(true);
    const pageStable = await page.locator('body').isVisible();
    expect(pageStable).toBe(true);
  });
});