package com.sh.automation.tests;

import com.sh.automation.base.BaseTest;
import com.sh.automation.pages.AllPhonesPage;
import com.sh.automation.pages.DeviceDetailPage;
import com.sh.automation.pages.HomePage;
import com.sh.automation.pages.LoginPopupPage;
import org.testng.Assert;
import org.testng.annotations.Test;

public class TS005_LoginPopupTests_2 extends BaseTest {
    /**
     * TestRail Case ID: TC606
     * Test Name: Test Case - SCRUM-22697 TS-008 TC-001
     */
    @Test(testName = "TC606", description = "Test Case - SCRUM-22697 TS-008 TC-001", groups = {"TS005", "Functional", "Regression"}, priority = 8)
    public void verifyLoginPopupOptions() {
        // Preconditions: Ensure browser is launched and navigated to StarHub homepage
        final String BASE_URL = "https://www.starhub.com";
        final String DEVICE_NAME = "Samsung Galaxy A57 5G";
        final String COLOUR = "Black";
        final String STORAGE = "256 GB";
        final String PAYMENT = "24-month installment";
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
        deviceDetailPage.selectColour(COLOUR);
        deviceDetailPage.selectStorage(STORAGE);
        deviceDetailPage.selectPayment(PAYMENT);
        deviceDetailPage.clickNext();
        LoginPopupPage loginPopup = new LoginPopupPage(driver);
        Assert.assertTrue(loginPopup.isPopupDisplayed(), "Login popup was not displayed");
        Assert.assertTrue(loginPopup.isLoginWithHubIdButtonDisplayed(), "Login with Hub ID button not displayed");
        Assert.assertTrue(loginPopup.isSignUpButtonDisplayed(), "Sign up button not displayed");
    }
}
