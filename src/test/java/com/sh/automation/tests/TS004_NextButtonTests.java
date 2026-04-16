package com.sh.automation.tests;

import com.sh.automation.base.BaseTest;
import com.sh.automation.pages.AllPhonesPage;
import com.sh.automation.pages.DeviceDetailPage;
import com.sh.automation.pages.HomePage;
import org.testng.Assert;
import org.testng.annotations.Test;

public class TS004_NextButtonTests extends BaseTest {
    /**
     * TestRail Case ID: TC604
     * Test Name: Test Case - SCRUM-22697 TS-006 TC-001
     */
    @Test(testName = "TC604", description = "Test Case - SCRUM-22697 TS-006 TC-001", groups = {"TS004", "Functional", "Regression"}, priority = 6)
    public void verifyNextButtonNavigatesToNextStep() {
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
        Assert.assertTrue(deviceDetailPage.isNextStepInitiated(), "Next step in purchase journey was not initiated");
    }
}
