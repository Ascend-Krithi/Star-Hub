package com.sh.automation.tests;

import com.sh.automation.base.BaseTest;
import com.sh.automation.pages.DeviceDetailPage;
import com.sh.automation.pages.AllPhonesPage;
import com.sh.automation.pages.HomePage;
import com.sh.automation.pages.LoginPopupPage;
import org.testng.Assert;
import org.testng.annotations.Test;

public class TS005_LoginPopupTests extends BaseTest {

    /**
     * TestRail Case ID: 1885
     * Test Case - SCRUM-22719 TS-011 TC-001
     */
    @Test(testName = "TC1885", description = "Verify login popup appears when not logged in.", groups = {"TS005", "Functional", "Regression"}, priority = 1)
    public void verifyLoginPopupAppearsWhenNotLoggedIn() {
        final String BASE_URL = "https://www.starhub.com";
        final String DEVICE_NAME = "Samsung Galaxy A57 5G";
        final String POPUP_MSG = "Please log in or create an account to continue with your purchase";
        driver.get(BASE_URL);
        HomePage homePage = new HomePage(driver);
        Assert.assertTrue(homePage.isLoaded(), "Homepage did not load");
        homePage.clickMobilesMenu();
        homePage.clickAllPhones();
        AllPhonesPage allPhonesPage = new AllPhonesPage(driver);
        Assert.assertTrue(allPhonesPage.isLoaded(), "All Phones page did not load");
        allPhonesPage.clickDevice(DEVICE_NAME);
        DeviceDetailPage deviceDetailPage = new DeviceDetailPage(driver);
        Assert.assertTrue(deviceDetailPage.isLoaded(), "Device detail page did not load");
        deviceDetailPage.clickNextButton();
        LoginPopupPage loginPopup = new LoginPopupPage(driver);
        Assert.assertTrue(loginPopup.isPopupDisplayed(), "Login popup was not displayed");
        Assert.assertEquals(loginPopup.getPopupMessageText(), POPUP_MSG);
    }

    /**
     * TestRail Case ID: 1886
     * Test Case - SCRUM-22719 TS-012 TC-001
     */
    @Test(testName = "TC1886", description = "Verify login with Hub ID navigates to login page.", groups = {"TS005", "Functional", "Regression"}, priority = 2)
    public void verifyLoginWithHubIdNavigatesToLoginPage() {
        final String BASE_URL = "https://www.starhub.com";
        final String DEVICE_NAME = "Samsung Galaxy A57 5G";
        driver.get(BASE_URL);
        HomePage homePage = new HomePage(driver);
        Assert.assertTrue(homePage.isLoaded(), "Homepage did not load");
        homePage.clickMobilesMenu();
        homePage.clickAllPhones();
        AllPhonesPage allPhonesPage = new AllPhonesPage(driver);
        Assert.assertTrue(allPhonesPage.isLoaded(), "All Phones page did not load");
        allPhonesPage.clickDevice(DEVICE_NAME);
        DeviceDetailPage deviceDetailPage = new DeviceDetailPage(driver);
        Assert.assertTrue(deviceDetailPage.isLoaded(), "Device detail page did not load");
        deviceDetailPage.clickNextButton();
        LoginPopupPage loginPopup = new LoginPopupPage(driver);
        Assert.assertTrue(loginPopup.isPopupDisplayed(), "Login popup was not displayed");
        loginPopup.clickLoginWithHubId();
        Assert.assertTrue(loginPopup.isLoginPageLoaded(), "Login page did not load after clicking Hub ID");
    }

    /**
     * TestRail Case ID: 1887
     * Test Case - SCRUM-22719 TS-013 TC-001
     */
    @Test(testName = "TC1887", description = "Verify sign up link navigates to sign up page.", groups = {"TS005", "Functional", "Regression"}, priority = 3)
    public void verifySignUpLinkNavigatesToSignUpPage() {
        final String BASE_URL = "https://www.starhub.com";
        final String DEVICE_NAME = "Samsung Galaxy A57 5G";
        driver.get(BASE_URL);
        HomePage homePage = new HomePage(driver);
        Assert.assertTrue(homePage.isLoaded(), "Homepage did not load");
        homePage.clickMobilesMenu();
        homePage.clickAllPhones();
        AllPhonesPage allPhonesPage = new AllPhonesPage(driver);
        Assert.assertTrue(allPhonesPage.isLoaded(), "All Phones page did not load");
        allPhonesPage.clickDevice(DEVICE_NAME);
        DeviceDetailPage deviceDetailPage = new DeviceDetailPage(driver);
        Assert.assertTrue(deviceDetailPage.isLoaded(), "Device detail page did not load");
        deviceDetailPage.clickNextButton();
        LoginPopupPage loginPopup = new LoginPopupPage(driver);
        Assert.assertTrue(loginPopup.isPopupDisplayed(), "Login popup was not displayed");
        loginPopup.clickSignUpLink();
        Assert.assertTrue(loginPopup.isSignUpPageLoaded(), "Sign up page did not load after clicking sign up link");
    }

    /**
     * TestRail Case ID: 1888
     * Test Case - SCRUM-22719 TS-014 TC-001
     */
    @Test(testName = "TC1888", description = "Verify no popup appears when logged in.", groups = {"TS005", "Functional", "Regression"}, priority = 4)
    public void verifyNoPupupWhenLoggedIn() {
        final String BASE_URL = "https://www.starhub.com";
        final String DEVICE_NAME = "Samsung Galaxy A57 5G";
        driver.get(BASE_URL);
        // Simulate login (implementation depends on test environment)
        HomePage homePage = new HomePage(driver);
        Assert.assertTrue(homePage.isLoaded(), "Homepage did not load");
        homePage.login("testuser", "password");
        homePage.clickMobilesMenu();
        homePage.clickAllPhones();
        AllPhonesPage allPhonesPage = new AllPhonesPage(driver);
        Assert.assertTrue(allPhonesPage.isLoaded(), "All Phones page did not load");
        allPhonesPage.clickDevice(DEVICE_NAME);
        DeviceDetailPage deviceDetailPage = new DeviceDetailPage(driver);
        Assert.assertTrue(deviceDetailPage.isLoaded(), "Device detail page did not load");
        deviceDetailPage.clickNextButton();
        LoginPopupPage loginPopup = new LoginPopupPage(driver);
        Assert.assertFalse(loginPopup.isPopupDisplayed(), "Login popup should not be displayed when logged in");
    }
}
