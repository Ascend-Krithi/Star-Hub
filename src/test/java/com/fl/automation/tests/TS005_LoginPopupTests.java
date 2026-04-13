package com.fl.automation.tests;

import com.fl.automation.base.BaseTest;
import com.fl.automation.pages.HomePage;
import com.fl.automation.pages.AllPhonesPage;
import com.fl.automation.pages.DeviceDetailPage;
import com.fl.automation.pages.LoginPopupPage;
import org.testng.Assert;
import org.testng.annotations.Test;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;

public class TS005_LoginPopupTests extends BaseTest {

    @Test(testName = "TC549", description = "Test Case - SCRUM-22697 TS-005 TC-001", groups = {"TS005", "Functional", "Regression"}, priority = 1)
    public void verifyLoginPopupAppearsWhenNotLoggedIn() {
        // Preconditions: Ensure the user is not logged in (log out if necessary)
        final String STARHUB_URL = "https://www.starhub.com";
        final String DEVICE_NAME = "Samsung Galaxy A57 5G";
        driver.get(STARHUB_URL);
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(15));
        HomePage homePage = new HomePage(driver);
        Assert.assertTrue(homePage.isPageLoaded(), "StarHub homepage did not load successfully.");
        homePage.ensureLoggedOut();
        homePage.clickMobilesMenu();
        AllPhonesPage allPhonesPage = homePage.clickAllPhonesMenuItem();
        Assert.assertTrue(allPhonesPage.isPageLoaded(), "Mobile Devices Listing page did not load.");
        DeviceDetailPage deviceDetailPage = allPhonesPage.clickDeviceByName(DEVICE_NAME);
        Assert.assertTrue(deviceDetailPage.isPageLoadedForDevice(DEVICE_NAME), "Device details page for '" + DEVICE_NAME + "' did not load.");
        deviceDetailPage.clickNextButton();
        LoginPopupPage loginPopupPage = new LoginPopupPage(driver);
        Assert.assertTrue(loginPopupPage.isPopupDisplayed(), "Login/Sign-up popup did not appear.");
        Assert.assertEquals(loginPopupPage.getPopupMessage(), "Please log in or create an account to continue with your purchase", "Popup message is incorrect.");
        Assert.assertTrue(loginPopupPage.isLoginButtonVisible(), "'Log in with Hub ID' button is not visible.");
        Assert.assertTrue(loginPopupPage.isSignUpButtonVisible(), "'Don’t have an account? Sign up here' button is not visible.");
    }

    @Test(testName = "TC550", description = "Test Case - SCRUM-22697 TS-005 TC-002", groups = {"TS005", "Functional", "Regression"}, priority = 2)
    public void verifyNoPopupWhenLoggedIn() {
        // Preconditions: Log in with valid user credentials
        final String STARHUB_URL = "https://www.starhub.com";
        final String DEVICE_NAME = "Samsung Galaxy A57 5G";
        final String USERNAME = "testuser@example.com";
        final String PASSWORD = "ValidPassword123";
        driver.get(STARHUB_URL);
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(15));
        HomePage homePage = new HomePage(driver);
        Assert.assertTrue(homePage.isPageLoaded(), "StarHub homepage did not load successfully.");
        homePage.login(USERNAME, PASSWORD);
        homePage.clickMobilesMenu();
        AllPhonesPage allPhonesPage = homePage.clickAllPhonesMenuItem();
        Assert.assertTrue(allPhonesPage.isPageLoaded(), "Mobile Devices Listing page did not load.");
        DeviceDetailPage deviceDetailPage = allPhonesPage.clickDeviceByName(DEVICE_NAME);
        Assert.assertTrue(deviceDetailPage.isPageLoadedForDevice(DEVICE_NAME), "Device details page for '" + DEVICE_NAME + "' did not load.");
        deviceDetailPage.clickNextButton();
        LoginPopupPage loginPopupPage = new LoginPopupPage(driver);
        Assert.assertFalse(loginPopupPage.isPopupDisplayed(), "Login/Sign-up popup appeared for logged-in user.");
        Assert.assertTrue(deviceDetailPage.isNextStepInitiated(), "User did not proceed to the next step after clicking Next.");
    }
}
