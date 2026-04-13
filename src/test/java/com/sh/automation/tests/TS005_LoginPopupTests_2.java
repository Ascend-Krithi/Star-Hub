package com.sh.automation.tests;

import com.sh.automation.base.BaseTest;
import com.sh.automation.pages.HomePage;
import com.sh.automation.pages.AllPhonesPage;
import com.sh.automation.pages.DeviceDetailPage;
import org.testng.Assert;
import org.testng.annotations.Test;

public class TS005_LoginPopupTests_2 extends BaseTest {

    /**
     * TestRail Case ID: TC557
     * Test Case: Test Case - SCRUM-22697 TS-007 TC-001
     */
    @Test(testName = "TC557", description = "Test Case - SCRUM-22697 TS-007 TC-001", groups = {"TS005", "Functional", "Regression"}, priority = 7)
    public void verifyNoPopupWhenLoggedIn() {
        // Preconditions: Log in with valid user credentials
        final String BASE_URL = "https://www.starhub.com";
        final String DEVICE_NAME = "Samsung Galaxy A57 5G";
        final String COLOUR = "Black";
        final String STORAGE = "256 GB";
        final String PAYMENT = "24-month installment";
        final String USERNAME = "validuser";
        final String PASSWORD = "validpassword";
        driver.get(BASE_URL);
        HomePage homePage = new HomePage(driver);
        Assert.assertTrue(homePage.isLoaded(), "Homepage did not load");
        homePage.login(USERNAME, PASSWORD);
        Assert.assertTrue(homePage.isLoggedIn(), "User is not logged in");
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
        Assert.assertFalse(deviceDetailPage.isLoginPopupDisplayed(), "Login popup should not be displayed for logged in user");
        Assert.assertTrue(deviceDetailPage.isNextStepInitiated(), "Next step in purchase journey was not initiated");
    }
}
