package com.sh.automation.tests;

import com.sh.automation.base.BaseTest;
import com.sh.automation.pages.HomePage;
import com.sh.automation.pages.AllPhonesPage;
import com.sh.automation.pages.DeviceDetailPage;
import org.testng.Assert;
import org.testng.annotations.Test;

public class TS006_LoginJourneyTests extends BaseTest {

    private static final String BASE_URL = "https://www.starhub.com";
    private static final String DEVICE_NAME = "Samsung Galaxy A57 5G";
    private static final String COLOUR = "Black";
    private static final String STORAGE = "256 GB";
    private static final String PAYMENT = "24-month installment";
    private static final String USERNAME = "validuser";
    private static final String PASSWORD = "validpassword";

    /**
     * TestRail Case ID: TC557
     * Test Name: Test Case - SCRUM-22697 TS-007 TC-001
     */
    @Test(testName = "TC557", description = "Test Case - SCRUM-22697 TS-007 TC-001", groups = {"TS006", "Functional", "Regression"}, priority = 1)
    public void verifyNextButtonJourneyWhenLoggedIn() {
        // Preconditions: Log in with valid user credentials
        driver.get(BASE_URL);
        HomePage homePage = new HomePage(driver);
        Assert.assertTrue(homePage.isLoaded(), "Homepage did not load");
        homePage.login(USERNAME, PASSWORD);
        Assert.assertTrue(homePage.isLoggedIn(), "User is not logged in successfully");
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
        Assert.assertTrue(deviceDetailPage.isNextStepInitiated(), "Next step in purchase journey was not initiated");
        Assert.assertFalse(deviceDetailPage.isLoginPopupDisplayed(), "Login popup should not appear when user is logged in");
    }
}
