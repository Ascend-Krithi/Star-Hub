package com.sh.automation.tests;

import com.sh.automation.base.BaseTest;
import com.sh.automation.pages.HomePage;
import com.sh.automation.pages.AllPhonesPage;
import org.testng.Assert;
import org.testng.annotations.Test;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class TC87_TestCaseSCRUM22697TS001TC001 extends BaseTest {
    @Test(testName = "TC87", description = "Test Case - SCRUM-22697 TS-001 TC-001", groups = {"TS001", "Functional", "Regression"}, priority = 1)
    public void launchStarHubAndNavigateToAllPhones() {
        // Preconditions: None
        final String STARHUB_URL = "https://www.starhub.com";
        HomePage homePage = new HomePage(driver);
        driver.get(STARHUB_URL);
        WebDriverWait wait = new WebDriverWait(driver, 20);
        // Step 1: Launch the StarHub website in a browser.
        wait.until(ExpectedConditions.titleContains("StarHub"));
        Assert.assertTrue(driver.getTitle().contains("StarHub"), "StarHub homepage loads successfully.");
        // Step 2: Navigate to the 'Mobiles' section from the main menu.
        homePage.clickMobilesMenu();
        Assert.assertTrue(homePage.isMobilesSectionDisplayed(), "'Mobiles' section is displayed.");
        // Step 3: Click on 'All Phones' option.
        homePage.clickAllPhonesOption();
        AllPhonesPage allPhonesPage = new AllPhonesPage(driver);
        Assert.assertTrue(allPhonesPage.isDeviceListDisplayed(), "List of available mobile devices is displayed.");
    }
}
