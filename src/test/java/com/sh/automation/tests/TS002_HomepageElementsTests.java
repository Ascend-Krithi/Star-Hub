package com.sh.automation.tests;

import com.sh.automation.base.BaseTest;
import com.sh.automation.pages.HomePage;
import org.testng.Assert;
import org.testng.annotations.Test;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class TS002_HomepageElementsTests extends BaseTest {

    /**
     * TestRail Case ID: 1917
     * Test Case - SCRUM-27502 TS-002 TC-001
     */
    @Test(testName = "TC1917", description = "Verify Sun Life homepage displays logo, navigation menu, main banner, and complete content.", groups = {"TS002", "Functional", "Regression"}, priority = 2)
    public void verifyHomepageElementsAndContent() {
        // Preconditions
        // Ensure browser is launched and navigated to Sun Life Application URL
        final String BASE_URL = "https://www.sunlife.com.ph";
        driver.get(BASE_URL);
        HomePage homePage = new HomePage(driver);
        WebDriverWait wait = new WebDriverWait(driver, 15);
        wait.until(ExpectedConditions.visibilityOfElementLocated(homePage.getLogoLocator()));
        Assert.assertTrue(homePage.isLogoVisible(), "Sun Life logo is not visible");
        Assert.assertTrue(homePage.isNavigationMenuVisible(), "Navigation menu is not visible");
        Assert.assertTrue(homePage.isMainBannerVisible(), "Main banner is not visible");
        Assert.assertTrue(homePage.isContentComplete(), "Homepage content is incomplete or incorrect");
    }
}
