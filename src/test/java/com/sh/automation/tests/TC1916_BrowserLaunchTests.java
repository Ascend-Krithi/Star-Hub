package com.sh.automation.tests;

import org.testng.Assert;
import org.testng.annotations.Test;
import com.sh.automation.base.BaseTest;
import com.sh.automation.pages.HomePage;

public class TC1916_BrowserLaunchTests extends BaseTest {

    /**
     * TestRail Case ID: 1916
     * Test Case - SCRUM-27502 TS-001 TC-001
     */
    @Test(testName = "TC1916", description = "Launch browser and verify Sun Life homepage loads without errors.", groups = {"TS001", "Functional", "Regression"}, priority = 1)
    public void verifySunLifeHomepageLoadsWithoutErrors() {
        // Preconditions
        // Ensure browser is launched
        final String BASE_URL = "https://www.sunlife.com.ph";

        // Step 1: Launch browser handled by BaseTest
        // Step 2: Navigate to Sun Life Application URL
        driver.get(BASE_URL);
        HomePage homePage = new HomePage(driver);
        Assert.assertTrue(homePage.isLoaded(), "Sun Life homepage did not load.");

        // Step 3: Observe homepage for broken links or errors
        Assert.assertFalse(homePage.hasBrokenLinks(), "Homepage contains broken links.");
        Assert.assertFalse(homePage.hasPageErrors(), "Homepage contains page errors.");
    }
}
