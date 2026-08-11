const { test, expect } = require('../../fixtures');
const StarHubStorePage = require('../../pages/starhub-store.page');
const TD = require('../../data/starhub-test-data');

test.describe('[UI] HAP-456 TS-002: Select Samsung Galaxy A57 5G Device', { tag: ['@smoke', '@regression', '@starhub'] }, () => {
  let store;

  test('[HAP-456 TS-002 TC-101] Verify successful navigation to Samsung Galaxy A57 5G PDP', async ({ page }) => {
    store = new StarHubStorePage(page);

    // Step 1: Launch the StarHub personal homepage
    await store.gotoPersonalHome();

    // Step 2: Hover over Mobile tab and click 'All Phones'
    await store.navigateToAllPhones();

    // Step 3: Locate Samsung Galaxy A57 5G device card
    // Step 4: Click on Samsung Galaxy A57 5G device card
    await store.clickSamsungGalaxyA57Card();
    await expect(page).toHaveURL(new RegExp(TD.urls.samsungGalaxyA57));

    // Step 5: Verify product detail page loads completely
    const productTitle = await store.getProductTitle();
    expect(productTitle).toContain(TD.devices.samsungGalaxyA57.name);
  });
});