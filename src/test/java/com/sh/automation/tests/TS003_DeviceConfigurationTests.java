package com.sh.automation.tests;

import com.sh.automation.base.BaseTest;
import com.sh.automation.pages.AllPhonesPage;
import com.sh.automation.pages.DeviceDetailPage;
import com.sh.automation.pages.HomePage;
import org.testng.Assert;
import org.testng.annotations.Test;

public class TS003_DeviceConfigurationTests extends BaseTest {
    /**
     * TestRail Case ID: TC602
     * Test Name: Test Case - SCRUM-22697 TS-004 TC-001
     */
    @Test(testName = "TC602", description = "Test Case - SCRUM-22697 TS-004 TC-001", groups = {"TS003", "Functional", "Regression"}, priority = 4)
    public void verifyDefaultSelectionsOnDevicePage() {
        // Preconditions: Ensure browser is launched and navigated to StarHub homepage
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
        Assert.assertEquals(deviceDetailPage.getSelectedColour(), "Black", "Default colour is not Black");
        Assert.assertEquals(deviceDetailPage.getSelectedStorage(), "256 GB", "Default storage is not 256 GB");
        Assert.assertEquals(deviceDetailPage.getSelectedPaymentOption(), "24-month installment", "Default payment option is not 24-month installment");
    }
}
