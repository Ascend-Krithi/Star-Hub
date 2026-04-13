package com.fl.automation.tests;

import com.fl.automation.base.BaseTest;
import com.fl.automation.pages.HomePage;
import com.fl.automation.pages.AllPhonesPage;
import org.testng.Assert;
import org.testng.annotations.Test;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class TC543_TestCase extends BaseTest {
    @Test(testName = "TC543", description = "Test Case - SCRUM-22697 TS-001 TC-002", groups = {"TS001", "Functional", "Regression"}, priority = 2)
    public void verifyAtLeastOneDeviceListed() {
        // Preconditions
        final String STARHUB_URL = "https://www.starhub.com";
        HomePage homePage = new HomePage(driver);
        WebDriverWait wait = new WebDriverWait(driver, 20);
        driver.get(STARHUB_URL);
        Assert.assertTrue(wait.until(ExpectedConditions.titleContains("StarHub")), "Homepage title should contain 'StarHub'");
        homePage.clickMobilesMenu();
        homePage.clickAllPhonesLink();
        AllPhonesPage allPhonesPage = new AllPhonesPage(driver);
        Assert.assertTrue(allPhonesPage.isPageLoaded(), "All Phones page should load");
        Assert.assertTrue(allPhonesPage.isDeviceListVisible(), "Device list should be visible");
        Assert.assertTrue(allPhonesPage.getDeviceCount() > 0, "At least one device should be listed");
    }
}
