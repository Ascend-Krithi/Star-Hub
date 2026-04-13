package com.fl.automation.tests;

import com.fl.automation.base.BaseTest;
import com.fl.automation.pages.HomePage;
import com.fl.automation.pages.AllPhonesPage;
import org.testng.Assert;
import org.testng.annotations.Test;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class TC543_TestCaseSCRUM22697TS001TC002 extends BaseTest {
    @Test(testName = "TC543", description = "Test Case - SCRUM-22697 TS-001 TC-002", groups = {"TS8", "Functional", "Regression"}, priority = 2)
    public void verifyAtLeastOneDeviceListed() {
        // Preconditions: None
        final String BASE_URL = "https://www.starhub.com";
        driver.get(BASE_URL);
        HomePage homePage = new HomePage(driver);
        WebDriverWait wait = new WebDriverWait(driver, 20);
        Assert.assertTrue(wait.until(ExpectedConditions.titleContains("StarHub")), "Homepage title should contain 'StarHub'");
        homePage.clickMobilesMenu();
        AllPhonesPage allPhonesPage = homePage.clickAllPhonesMenu();
        Assert.assertTrue(allPhonesPage.isAt(), "Should be at the Mobile Devices Listing page");
        Assert.assertTrue(allPhonesPage.isDeviceListDisplayed(), "Device list should be displayed");
        Assert.assertTrue(allPhonesPage.getDeviceCount() > 0, "At least one device should be listed");
    }
}
