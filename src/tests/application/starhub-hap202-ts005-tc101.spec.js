const { test, expect } = require('../../fixtures');
const StarHubStorePage = require('../../pages/starhub-store.page');
const TD = require('../../data/starhub-test-data');

test.describe('[UI] HAP-202 TS-005: Verify Login Popup for Unauthenticated User', { tag: ['@smoke', '@regression', '@starhub'] }, () => {
  let store;

  test('[HAP-202 TS-005 TC-101] Verify login popup displayed for unauthenticated user clicking Next', async ({ page, context }) => {
    store = new StarHubStorePage(page);

    // Step 1: Launch the StarHub personal homepage
    await store.gotoPersonalHome();

    // Step 2: Ensure user is not logged in
    await context.clearCookies();

    // Step 3: Hover over Mobile tab and click 'All Phones'
    await store.navigateToAllPhones();

    // Step 4: Click on Samsung Galaxy A57 5G device card
    await store.clickSamsungGalaxyA57Card();

    // Step 5: Review device configuration
    const selectedColour = await store.getSelectedColour();
    expect(selectedColour).toBeTruthy();

    // Step 6: Click on the Next button
    await store.clickNextButton();

    // Step 7: Verify popup contains the expected message
    const popupVisible = await store.isAuthPopupVisible();
    expect(popupVisible).toBeTruthy();

    const popupMessage = await store.getPopupMessage();
    expect(popupMessage).toContain(TD.messages.loginRequired);

    // Step 8: Verify 'Log in with Hub ID' button is visible
    const loginButtonVisible = await store.isLoginWithHubIdButtonVisible();
    expect(loginButtonVisible).toBeTruthy();

    // Step 9: Verify 'Don't have an account? Sign up here' button/link is visible
    const signupLinkVisible = await store.isSignupLinkVisible();
    expect(signupLinkVisible).toBeTruthy();
  });
});