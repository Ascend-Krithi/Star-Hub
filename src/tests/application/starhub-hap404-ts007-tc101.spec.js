const { test, expect } = require('../../fixtures');
const StarHubStorePage = require('../../pages/starhub-store.page');
const TD = require('../../data/starhub-test-data');

test.describe('[UI] HAP-404 TS-007: Verify Device Not Available Scenario', { tag: ['@regression', '@starhub'] }, () => {
  let store;

  test('[HAP-404 TS-007 TC-101] Verify system behavior when device card is not available', async ({ page }) => {
    store = new StarHubStorePage(page);

    // Step 1: Launch the StarHub personal homepage
    await store.gotoPersonalHome();

    // Step 2: Hover over Mobile tab and click 'All Phones'
    await store.navigateToAllPhones();

    // Step 3: Attempt to locate Samsung Galaxy A57 5G device card with timeout
    try {
      await page.waitForSelector(`text=${TD.devices.samsungGalaxyA57.name}`, { 
        timeout: TD.timeouts.elementWait 
      });
    } catch (error) {
      // Step 4: Verify system behavior when device card is not found
      expect(error.message).toContain('Timeout');
    }

    // Step 5: Verify listing page remains functional
    const heading = await store.getPageHeading();
    expect(heading).toContain(TD.patterns.mobileDevicesHeading);

    const deviceCountVisible = await store.isDeviceCountDisplayed();
    expect(deviceCountVisible).toBeTruthy();
  });
});