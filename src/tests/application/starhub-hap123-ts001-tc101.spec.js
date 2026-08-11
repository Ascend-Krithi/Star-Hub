const { test, expect } = require('../../fixtures');
const StarHubStorePage = require('../../pages/starhub-store.page');
const TD = require('../../data/starhub-test-data');

test.describe('[UI] HAP-123 TS-001: Navigate to Mobile Devices Listing', { tag: ['@smoke', '@regression', '@starhub'] }, () => {
  let store;

  test('[HAP-123 TS-001 TC-101] Verify successful navigation to mobile devices listing page', async ({ page }) => {
    store = new StarHubStorePage(page);

    // Step 1: Launch the StarHub personal homepage
    await store.gotoPersonalHome();
    await expect(page).toHaveURL(TD.urls.personalHome);

    // Step 2: Dismiss cookie consent banner if displayed
    await store.dismissCookieConsent();

    // Step 3: Hover over the Mobile tab
    await store.hoverMobileTab();

    // Step 4: Click on 'All Phones' option
    await store.clickAllPhones();
    await expect(page).toHaveURL(new RegExp(TD.urls.allPhones));

    // Step 5: Verify the page heading displays 'Mobile Devices'
    const heading = await store.getPageHeading();
    expect(heading).toContain(TD.patterns.mobileDevicesHeading);

    // Step 6: Verify the device count is displayed
    const deviceCountVisible = await store.isDeviceCountDisplayed();
    expect(deviceCountVisible).toBeTruthy();

    const deviceCount = await store.getDeviceCount();
    expect(deviceCount).toMatch(TD.patterns.deviceCount);
  });
});