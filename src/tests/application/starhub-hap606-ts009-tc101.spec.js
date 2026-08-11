const { test, expect } = require('../../fixtures');
const StarHubStorePage = require('../../pages/starhub-store.page');
const TD = require('../../data/starhub-test-data');

test.describe('[UI] HAP-606 TS-009: Verify Multiple Rapid Clicks on Next Button', { tag: ['@regression', '@starhub'] }, () => {
  let store;

  test('[HAP-606 TS-009 TC-101] Verify single popup instance on multiple rapid Next button clicks', async ({ page, context }) => {
    store = new StarHubStorePage(page);

    // Step 1: Launch the StarHub personal homepage
    await store.gotoPersonalHome();

    // Step 2: Ensure user is not logged in
    await context.clearCookies();

    // Step 3: Hover over Mobile tab and click 'All Phones'
    await store.navigateToAllPhones();

    // Step 4: Click on Samsung Galaxy A57 5G device card
    await store.clickSamsungGalaxyA57Card();

    // Step 5: Verify Next button is visible
    const nextButtonVisible = await store.isNextButtonVisible();
    expect(nextButtonVisible).toBeTruthy();

    // Step 6: Click Next button multiple times rapidly
    await store.clickNextButton();
    await store.clickNextButton();
    await store.clickNextButton();

    // Step 7: Verify only a single popup instance is displayed
    await page.waitForTimeout(1000);
    const popupCount = await page.locator('[data-testid="auth-popup"], .auth-modal, .login-popup, [role="dialog"]').count();
    expect(popupCount).toBe(1);

    // Step 8: Verify popup contains correct message and buttons
    const popupVisible = await store.isAuthPopupVisible();
    expect(popupVisible).toBeTruthy();

    const popupMessage = await store.getPopupMessage();
    expect(popupMessage).toContain(TD.messages.loginRequired);

    // Step 9: Verify system remains stable
    const isPageResponsive = await page.evaluate(() => document.readyState);
    expect(isPageResponsive).toBe('complete');
  });
});