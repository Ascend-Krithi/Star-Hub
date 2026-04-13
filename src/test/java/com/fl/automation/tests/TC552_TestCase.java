package com.fl.automation.tests;

import com.fl.automation.base.BaseTest;
import com.fl.automation.pages.HomePage;
import com.fl.automation.pages.AllPhonesPage;
import org.testng.Assert;
import org.testng.annotations.Test;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class TC552_TestCase extends BaseTest {
    @Test(testName = "TC552", description = "Test Case - SCRUM-22697 TS-002 TC-001", groups = {"TS002", "Functional", "Regression"}, priority = 11)
    public void verifyDeviceListVisibleOnAllPhonesPage() {
        // Preconditions
        final String STARHUB_URL = "https://www.starhub.com";
        HomePage homePage = new HomePage(driver);
        WebDriverWait wait = new WebDriverWait(driver, 20);
        driver.get(STARHUB_URL);
        homePage.clickMobilesMenu();
        homePage.clickAllPhonesLink();
        AllPhonesPage allPhonesPage = new AllPhonesPage(driver);
        Assert.assertTrue(allPhonesPage.isPageLoaded(), "All Phones page should load");
        Assert.assertTrue(allPhonesPage.isDeviceListVisible(), "Device list should be visible");
    }
}
