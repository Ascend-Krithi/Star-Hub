package com.sh.automation.tests;

import com.sh.automation.base.BaseTest;
import com.sh.automation.pages.HomePage;
import org.testng.Assert;
import org.testng.annotations.Test;

public class TC1945_SunLifeHomepageElementsTest extends BaseTest {

    @Test(testName = "TC1945", description = "Test Case - SCRUM-27502 TS-002 TC-001", groups = {"TS002", "Functional", "Regression"}, priority = 7)
    public void verifyHomepageElementsVisible() {
        // TestRail Case ID: TC1945
        // Preconditions: Ensure browser is launched
        final String BASE_URL = "https://www.sunlife.com.ph";
        driver.get(BASE_URL);
        HomePage homePage = new HomePage(driver);
        Assert.assertTrue(homePage.isLoaded(), "Sun Life homepage did not load");
        Assert.assertTrue(homePage.isLogoVisible(), "Sun Life logo is not visible");
        Assert.assertTrue(homePage.isNavigationMenuVisible(), "Navigation menu is not visible");
        Assert.assertTrue(homePage.isMainBannerVisible(), "Main banner is not visible");
    }
}
