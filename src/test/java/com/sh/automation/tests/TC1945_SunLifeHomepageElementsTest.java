package com.sh.automation.tests;

import org.testng.Assert;
import org.testng.annotations.Test;
import com.sh.automation.base.BaseTest;
import com.sh.automation.pages.HomePage;

public class TC1945_SunLifeHomepageElementsTest extends BaseTest {

    /**
     * TestRail Case ID: 1945
     * Test Case - SCRUM-27502 TS-002 TC-001
     */
    @Test(testName = "TC1945", description = "Verify Sun Life homepage displays logo, navigation menu, and main banner.", groups = {"TS002", "Functional", "Regression"}, priority = 7)
    public void verifyHomepageElements() {
        // Preconditions
        // Ensure browser is launched
        final String BASE_URL = "https://www.sunlife.com.ph";

        // Step 1: Open browser and navigate to Sun Life homepage
        driver.get(BASE_URL);
        HomePage homePage = new HomePage(driver);
        Assert.assertTrue(homePage.isLoaded(), "Homepage did not load");

        // Step 2: Verify homepage elements
        Assert.assertTrue(homePage.isLogoVisible(), "Sun Life logo is not visible");
        Assert.assertTrue(homePage.isNavigationMenuVisible(), "Navigation menu is not visible");
        Assert.assertTrue(homePage.isMainBannerVisible(), "Main banner is not visible");
    }
}
