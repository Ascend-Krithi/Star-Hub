package com.sh.automation.tests;

import com.sh.automation.base.BaseTest;
import com.sh.automation.pages.AllPhonesPage;
import com.sh.automation.pages.DeviceDetailPage;
import com.sh.automation.pages.HomePage;
import org.testng.Assert;
import org.testng.annotations.Test;

public class TS002_DeviceNavigationTests extends BaseTest {

    /**
     * TestRail Case ID: 1878
     * Test Case - SCRUM-22719 TS-004 TC-001
     */
    @Test(testName = "TC1878", description = "Verify device detail page loads for selected device.", groups = {"TS002", "Functional", "Regression"}, priority = 1)
    public void verifyDeviceDetailPageLoads() {
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
    }

    /**
     * TestRail Case ID: 1879
     * Test Case - SCRUM-22719 TS-005 TC-001
     */
    @Test(testName = "TC1879", description = "Verify non-existent device is not clickable.", groups = {"TS002", "Functional", "Regression"}, priority = 2)
    public void verifyNonExistentDeviceNotClickable() {
        final String BASE_URL = "https://www.starhub.com";
        final String DEVICE_NAME = "NonExistentDevice";
        driver.get(BASE_URL);
        HomePage homePage = new HomePage(driver);
        Assert.assertTrue(homePage.isLoaded(), "Homepage did not load");
        homePage.clickMobilesMenu();
        homePage.clickAllPhones();
        AllPhonesPage allPhonesPage = new AllPhonesPage(driver);
        Assert.assertTrue(allPhonesPage.isLoaded(), "All Phones page did not load");
        Assert.assertFalse(allPhonesPage.isDeviceVisible(DEVICE_NAME), "Non-existent device should not be visible");
    }
}
