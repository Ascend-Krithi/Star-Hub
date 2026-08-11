const { test, expect } = require('../../fixtures');
const StarHubStorePage = require('../../pages/starhub-store.page');
const TD = require('../../data/starhub-test-data');

test.describe('[UI] HAP-789 TS-003: Verify Default Device Configuration', { tag: ['@smoke', '@regression', '@starhub'] }, () => {
  let store;

  test('[HAP-789 TS-003 TC-101] Verify default configuration values on Samsung Galaxy A57 5G PDP', async ({ page }) => {
    store = new StarHubStorePage(page);

    // Step 1: Launch the StarHub personal homepage
    await store.gotoPersonalHome();

    // Step 2: Hover over Mobile tab and click 'All Phones'
    await store.navigateToAllPhones();

    // Step 3: Click on Samsung Galaxy A57 5G device card
    await store.clickSamsungGalaxyA57Card();

    // Step 4: Verify default Colour is 'Awesome Navy'
    const selectedColour = await store.getSelectedColour();
    expect(selectedColour).toContain(TD.devices.samsungGalaxyA57.defaultColour);

    // Step 5: Verify default Storage is '256 GB'
    const selectedStorage = await store.getSelectedStorage();
    expect(selectedStorage).toContain(TD.devices.samsungGalaxyA57.defaultStorage);

    // Step 6: Verify default Payment Option is '24-month installment'
    const selectedPayment = await store.getSelectedPayment();
    expect(selectedPayment).toContain(TD.devices.samsungGalaxyA57.defaultPayment);
  });
});