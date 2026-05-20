package com.sh.automation.tests;

import org.testng.Assert;
import org.testng.annotations.Test;
import com.sh.automation.base.BaseTest;
import com.sh.automation.pages.HomePage;
import com.sh.automation.pages.AllPhonesPage;

public class TS001_PhoneListingTests extends BaseTest {

    /**
     * TestRail Case ID: 1875
     * Test Case - SCRUM-22719 TS-001 TC-001
     */
    @Test(testName = "TC1875", description = "Verify All Phones page loads via menu", groups = {"TS001", "Functional", "Regression"}, priority = 1)
    public void verifyAllPhonesPageLoadsViaMenu() {
        // Preconditions
        // Ensure browser is launched and StarHub homepage is loaded
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
    @Test(testName = "TC1876", description = "Verify at least one device listed", groups = {"TS001", "Functional", "Regression"}, priority = 2)
    public void verifyAtLeastOneDeviceListed() {
        final String BASE_URL = "https://www.starhub.com";
        driver.get(BASE_URL);
        HomePage homePage = new HomePage(driver);
        Assert.assertTrue(homePage.isLoaded(), "Homepage did not load");
        homePage.clickMobilesMenu();
        homePage.clickAllPhones();
        AllPhonesPage allPhonesPage = new AllPhonesPage(driver);
        Assert.assertTrue(allPhonesPage.isLoaded(), "All Phones page did not load");
        Assert.assertTrue(allPhonesPage.isAnyDeviceListed(), "No devices listed on All Phones page");
    }

    /**
     * TestRail Case ID: 1877
     * Test Case - SCRUM-22719 TS-003 TC-001
     */
    @Test(testName = "TC1877", description = "Verify All Phones page loads when not logged in", groups = {"TS001", "Functional", "Regression"}, priority = 3)
    public void verifyAllPhonesPageLoadsWhenNotLoggedIn() {
        final String BASE_URL = "https://www.starhub.com";
        driver.get(BASE_URL);
        HomePage homePage = new HomePage(driver);
        Assert.assertTrue(homePage.isLoaded(), "Homepage did not load");
        homePage.clickMobilesMenu();
        homePage.clickAllPhones();
        AllPhonesPage allPhonesPage = new AllPhonesPage(driver);
        Assert.assertTrue(allPhonesPage.isLoaded(), "All Phones page did not load");
        Assert.assertTrue(allPhonesPage.isDeviceVisible("Samsung Galaxy A57 5G"), "Device not visible in list");
        allPhonesPage.clickDevice("Samsung Galaxy A57 5G");
        com.sh.automation.pages.DeviceDetailPage deviceDetailPage = new com.sh.automation.pages.DeviceDetailPage(driver);
        Assert.assertTrue(deviceDetailPage.isLoaded(), "Device detail page did not load");
    }
