package com.sh.automation.tests;

import com.sh.automation.base.BaseTest;
import com.sh.automation.pages.HomePage;
import com.sh.automation.pages.AllPhonesPage;
import com.sh.automation.pages.DeviceDetailPage;
import org.testng.Assert;
import org.testng.annotations.Test;

public class TS004_NextButtonTests extends BaseTest {

    private static final String BASE_URL = "https://www.starhub.com";
    private static final String DEVICE_NAME = "Samsung Galaxy A57 5G";
    private static final String COLOUR = "Black";
    private static final String STORAGE = "256 GB";
    private static final String PAYMENT = "24-month installment";

    /**
     * TestRail Case ID: TC555
     * Test Name: Test Case - SCRUM-22697 TS-005 TC-001
     */
    @Test(testName = "TC555", description = "Test Case - SCRUM-22697 TS-005 TC-001", groups = {"TS004", "Functional", "Regression"}, priority = 1)
    public void verifyNextButtonNavigatesToNextStep() {
        // Preconditions: None
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
        Assert.assertTrue(deviceDetailPage.isNextStepInitiated(), "Next step in purchase journey was not initiated");
    }
}
