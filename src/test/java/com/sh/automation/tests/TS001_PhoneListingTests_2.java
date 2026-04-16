package com.sh.automation.tests;

import com.sh.automation.base.BaseTest;
import com.sh.automation.pages.AllPhonesPage;
import com.sh.automation.pages.HomePage;
import org.testng.Assert;
import org.testng.annotations.Test;

public class TS001_PhoneListingTests_2 extends BaseTest {
    /**
     * TestRail Case ID: TC600
     * Test Name: Test Case - SCRUM-22697 TS-002 TC-001
     */
    @Test(testName = "TC600", description = "Test Case - SCRUM-22697 TS-002 TC-001", groups = {"TS001", "Functional", "Regression"}, priority = 2)
    public void verifyAtLeastOneDeviceListed() {
        // Preconditions: Ensure browser is launched and navigated to StarHub homepage
        final String BASE_URL = "https://www.starhub.com";
        driver.get(BASE_URL);
        HomePage homePage = new HomePage(driver);
        Assert.assertTrue(homePage.isLoaded(), "Homepage did not load");
        homePage.clickMobilesMenu();
        homePage.clickAllPhones();
        AllPhonesPage allPhonesPage = new AllPhonesPage(driver);
        Assert.assertTrue(allPhonesPage.isLoaded(), "All Phones page did not load");
        Assert.assertTrue(allPhonesPage.isDeviceListDisplayed(), "Device list is not displayed");
    }
}
