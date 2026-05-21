package com.sh.automation.tests;

import org.testng.Assert;
import org.testng.annotations.Test;
import com.sh.automation.base.BaseTest;
import com.sh.automation.pages.HomePage;

public class TC1917_HomepageElementsTests extends BaseTest {

    /**
     * TestRail Case ID: 1917
     * Test Case - SCRUM-27502 TS-002 TC-001
     */
    @Test(testName = "TC1917", description = "Verify Sun Life homepage displays logo, navigation menu, main banner, and complete content.", groups = {"TS002", "Functional", "Regression"}, priority = 2)
    public void verifyHomepageElementsAndContent() {
        // Preconditions
        // Ensure browser is launched
        final String BASE_URL = "https://www.sunlife.com.ph";

        driver.get(BASE_URL);
        HomePage homePage = new HomePage(driver);
        Assert.assertTrue(homePage.isLoaded(), "Sun Life homepage did not load.");
        Assert.assertTrue(homePage.isLogoVisible(), "Sun Life logo is not visible.");
        Assert.assertTrue(homePage.isNavigationMenuVisible(), "Navigation menu is not visible.");
        Assert.assertTrue(homePage.isMainBannerVisible(), "Main banner is not visible.");
        Assert.assertTrue(homePage.isContentComplete(), "Homepage content is incomplete or incorrect.");
    }
}
