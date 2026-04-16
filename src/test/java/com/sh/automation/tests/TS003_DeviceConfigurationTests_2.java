package com.sh.automation.tests;

import com.sh.automation.base.BaseTest;
import com.sh.automation.pages.AllPhonesPage;
import com.sh.automation.pages.DeviceDetailPage;
import com.sh.automation.pages.HomePage;
import org.testng.Assert;
import org.testng.annotations.Test;

public class TS003_DeviceConfigurationTests_2 extends BaseTest {
    /**
     * TestRail Case ID: TC603
     * Test Name: Test Case - SCRUM-22697 TS-005 TC-001
     */
    @Test(testName = "TC603", description = "Test Case - SCRUM-22697 TS-005 TC-001", groups = {"TS003", "Functional", "Regression"}, priority = 5)
    public void verifyConfigurationSelectorsVisibleAndEnabled() {
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
        Assert.assertTrue(deviceDetailPage.isColourVisible("Black"), "Colour Black is not visible");
        Assert.assertTrue(deviceDetailPage.isStorageVisible("256 GB"), "Storage 256 GB is not visible");
        Assert.assertTrue(deviceDetailPage.isPaymentOptionVisible("24-month installment"), "Payment option 24-month installment is not visible");
    }
}
