const { test, expect } = require('../../fixtures');
const StarHubStorePage = require('../../pages/starhub-store.page');
const TD = require('../../data/starhub-test-data');

test.describe('[UI] HAP-101 TS-004: Verify Next Button for Authenticated User', { tag: ['@regression', '@starhub'] }, () => {
  let store;

  test('[HAP-101 TS-004 TC-101] Verify Next button initiates progression for authenticated user', async ({ page }) => {
    store = new StarHubStorePage(page);

    // Step 1: Launch the StarHub personal homepage
    await store.gotoPersonalHome();

    // Step 2: Log in with valid Hub ID credentials (assuming login is handled separately or via global setup)
    // Note: This test assumes user is already authenticated via globalSetup or separate login flow

    // Step 3: Hover over Mobile tab and click 'All Phones'
    await store.navigateToAllPhones();

    // Step 4: Click on Samsung Galaxy A57 5G device card
    await store.clickSamsungGalaxyA57Card();

    // Step 5: Review device configuration
    const selectedColour = await store.getSelectedColour();
    expect(selectedColour).toBeTruthy();

    // Step 6: Verify Next button is visible and clickable
    const nextButtonVisible = await store.isNextButtonVisible();
    expect(nextButtonVisible).toBeTruthy();

    // Step 7: Click on the Next button
    await store.clickNextButton();

    // Verify navigation to next step (URL change or new page load)
    await page.waitForLoadState('domcontentloaded');
    const currentURL = page.url();
    expect(currentURL).not.toBe(TD.urls.samsungGalaxyA57);
  });
});