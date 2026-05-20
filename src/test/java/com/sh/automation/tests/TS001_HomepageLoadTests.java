package com.sh.automation.tests;

import com.sh.automation.base.BaseTest;
import com.sh.automation.pages.HomePage;
import org.testng.Assert;
import org.testng.annotations.Test;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class TS001_HomepageLoadTests extends BaseTest {

    /**
     * TestRail Case ID: 1916
     * Test Case - SCRUM-27502 TS-001 TC-001
     */
    @Test(testName = "TC1916", description = "Verify Sun Life homepage loads without broken links or errors.", groups = {"TS001", "Functional", "Regression"}, priority = 1)
    public void verifyHomepageLoadsWithoutErrors() {
        // Preconditions
        // Ensure browser is launched and navigated to Sun Life Application URL
        final String BASE_URL = "https://www.sunlife.com.ph";
        driver.get(BASE_URL);
        HomePage homePage = new HomePage(driver);
        WebDriverWait wait = new WebDriverWait(driver, 15);
        wait.until(ExpectedConditions.visibilityOfElementLocated(homePage.getMainBannerLocator()));
        Assert.assertTrue(homePage.isLoaded(), "Homepage did not load");
        Assert.assertFalse(homePage.hasBrokenLinks(), "Homepage contains broken links");
        Assert.assertFalse(homePage.hasPageErrors(), "Homepage contains page errors");
    }
}
