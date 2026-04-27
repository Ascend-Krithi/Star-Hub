package com.sh.automation.tests;

import com.sh.automation.base.BaseTest;
import com.sh.automation.pages.HomePage;
import com.sh.automation.pages.AllPhonesPage;
import org.testng.Assert;
import org.testng.annotations.Test;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class TC93_TestCaseSCRUM22697TS001TC002 extends BaseTest {
    @Test(testName = "TC93", description = "Test Case - SCRUM-22697 TS-001 TC-002", groups = {"TS001", "Functional", "Regression"}, priority = 7)
    public void verifyAllPhonesPageLoads() {
        // Preconditions: User is on the 'Mobiles' section of the StarHub website
        HomePage homePage = new HomePage(driver);
        homePage.clickMobilesMenu();
        Assert.assertTrue(homePage.isMobilesSectionDisplayed(), "'Mobiles' section is visible.");
        homePage.clickAllPhonesOption();
        AllPhonesPage allPhonesPage = new AllPhonesPage(driver);
        Assert.assertTrue(allPhonesPage.isAllPhonesPageLoaded(), "'All Phones' page loads.");
        Assert.assertTrue(allPhonesPage.isDeviceListDisplayed(), "List of available phones is displayed.");
    }
}
