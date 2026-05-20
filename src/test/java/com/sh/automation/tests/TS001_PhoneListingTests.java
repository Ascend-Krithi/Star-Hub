package com.sh.automation.tests;

import com.sh.automation.base.BaseTest;
import com.sh.automation.pages.HomePage;
import com.sh.automation.pages.AllPhonesPage;
import org.testng.Assert;
import org.testng.annotations.Test;

public class TS001_PhoneListingTests extends BaseTest {

    /**
     * TestRail Case ID: 1875
     * Test Case - SCRUM-22719 TS-001 TC-001
     */
    @Test(testName = "TC1875", description = "Verify All Phones page loads via menu navigation.", groups = {"TS001", "Functional", "Regression"}, priority = 1)
    public void verifyAllPhonesPageLoadsViaMenu() {
        // Preconditions: Launch the StarHub website in a browser.
        final String BASE_URL = "https://www.starhub.com";
        driver.get(BASE_URL);
        HomePage homePage = new HomePage(driver);
        Assert.assertTrue(homePage.isLoaded(), "Homepage did not load");
        homePage.clickMobilesMenu();
        homePage.clickAllPhones();
        AllPhonesPage allPhonesPage = new AllPhonesPage(driver);
        Assert.assertTrue(allPhonesPage.isLoaded(), "All Phones page did not load");
    }

    /**
     * TestRail Case ID: 1876
     * Test Case - SCRUM-22719 TS-002 TC-001
     */
    @Test(testName = "TC1876", description = "Verify at least one device is listed on All Phones page.", groups = {"TS001", "Functional", "Regression"}, priority = 2)
    public void verifyAtLeastOneDeviceListed() {
        // Preconditions: Launch the StarHub website in a browser.
        final String BASE_URL = "https://www.starhub.com";
        driver.get(BASE_URL);
        HomePage homePage = new HomePage(driver);
        Assert.assertTrue(homePage.isLoaded(), "Homepage did not load");
        homePage.clickMobilesMenu();
        homePage.clickAllPhones();
        AllPhonesPage allPhonesPage = new AllPhonesPage(driver);
        Assert.assertTrue(allPhonesPage.isLoaded(), "All Phones page did not load");
        Assert.assertTrue(allPhonesPage.isAnyDeviceListed(), "No devices are listed on All Phones page");
    }

    /**
     * TestRail Case ID: 1877
     * Test Case - SCRUM-22719 TS-003 TC-001
     */
    @Test(testName = "TC1877", description = "Verify All Phones page loads and device detail navigation works.", groups = {"TS001", "Functional", "Regression"}, priority = 3)
    public void verifyAllPhonesPageLoadsWhenNotLoggedIn() {
        // Preconditions: Launch the StarHub website in a browser.
        final String BASE_URL = "https://www.starhub.com";
        final String DEVICE_NAME = "Samsung Galaxy A57 5G";
        driver.get(BASE_URL);
        HomePage homePage = new HomePage(driver);
        Assert.assertTrue(homePage.isLoaded(), "Homepage did not load");
        homePage.clickMobilesMenu();
        homePage.clickAllPhones();
        AllPhonesPage allPhonesPage = new AllPhonesPage(driver);
        Assert.assertTrue(allPhonesPage.isLoaded(), "All Phones page did not load");
        Assert.assertTrue(allPhonesPage.isDeviceVisible(DEVICE_NAME), "Device not visible in list");
        allPhonesPage.clickDevice(DEVICE_NAME);
        // Device detail navigation assertion handled in TS002_DeviceNavigationTests
    }
}
