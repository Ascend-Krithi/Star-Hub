const { test, expect } = require('../../fixtures');
const StarHubStorePage = require('../../pages/starhub-store.page');
const TD = require('../../data/starhub-test-data');

test.describe('[UI] HAP-505 TS-008: Verify Configuration with Delayed Hydration', { tag: ['@regression', '@starhub'] }, () => {
  let store;

  test('[HAP-505 TS-008 TC-101] Verify default configuration visibility with delayed page load', async ({ page, context }) => {
    store = new StarHubStorePage(page);

    // Step 1: Configure network simulation for slow loading
    await context.route('**/*', async (route) => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      await route.continue();
    });

    // Step 2: Launch the StarHub personal homepage
    await store.gotoPersonalHome();

    // Step 3: Hover over Mobile tab and click 'All Phones'
    await store.navigateToAllPhones();

    // Step 4: Click on Samsung Galaxy A57 5G device card
    await store.clickSamsungGalaxyA57Card();

    // Step 5: Wait for page elements to fully render
    await page.waitForLoadState('networkidle', { timeout: TD.timeouts.elementWait });

    // Step 6: Verify default Colour is 'Awesome Navy'
    const selectedColour = await store.getSelectedColour();
    expect(selectedColour).toContain(TD.devices.samsungGalaxyA57.defaultColour);

    // Step 7: Verify default Storage is '256 GB'
    const selectedStorage = await store.getSelectedStorage();
    expect(selectedStorage).toContain(TD.devices.samsungGalaxyA57.defaultStorage);

    // Step 8: Verify default Payment is '24-month'
    const selectedPayment = await store.getSelectedPayment();
    expect(selectedPayment).toContain(TD.devices.samsungGalaxyA57.defaultPayment);

    // Step 9: Verify all configuration options are visible and interactive
    const nextButtonVisible = await store.isNextButtonVisible();
    expect(nextButtonVisible).toBeTruthy();
  });
});