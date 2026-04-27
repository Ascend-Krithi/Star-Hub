package com.sh.automation.tests;

import com.sh.automation.base.BaseTest;
import com.sh.automation.pages.HomePage;
import org.testng.Assert;
import org.testng.annotations.Test;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class TC92_TestCaseSCRUM22697TS001TC001 extends BaseTest {
    @Test(testName = "TC92", description = "Test Case - SCRUM-22697 TS-001 TC-001", groups = {"TS001", "Functional", "Regression"}, priority = 6)
    public void launchBrowserAndNavigateToMobiles() {
        // Preconditions: Browser is Chrome 120.0
        final String STARHUB_URL = "https://www.starhub.com";
        HomePage homePage = new HomePage(driver);
        driver.get(STARHUB_URL);
        WebDriverWait wait = new WebDriverWait(driver, 20);
        wait.until(ExpectedConditions.titleContains("StarHub"));
        Assert.assertTrue(driver.getTitle().contains("StarHub"), "StarHub homepage loads completely.");
        homePage.clickMobilesMenu();
        Assert.assertTrue(homePage.isMobilesSectionDisplayed(), "'Mobiles' section is displayed.");
    }
}
