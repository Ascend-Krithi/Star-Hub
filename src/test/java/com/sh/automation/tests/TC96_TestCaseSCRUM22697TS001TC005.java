package com.sh.automation.tests;

import com.sh.automation.base.BaseTest;
import com.sh.automation.pages.DeviceDetailPage;
import org.testng.Assert;
import org.testng.annotations.Test;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class TC96_TestCaseSCRUM22697TS001TC005 extends BaseTest {
    @Test(testName = "TC96", description = "Test Case - SCRUM-22697 TS-001 TC-005", groups = {"TS001", "Functional", "Regression"}, priority = 10)
    public void reviewAvailableMobilePlans() {
        // Preconditions: After configuring the device
        DeviceDetailPage deviceDetailPage = new DeviceDetailPage(driver);
        deviceDetailPage.scrollToPlansSection();
        Assert.assertTrue(deviceDetailPage.isPlansListVisible(), "List of available plans is visible.");
        Assert.assertTrue(deviceDetailPage.arePlanDetailsDisplayed(), "Plan details are displayed.");
        deviceDetailPage.clickComparePlans();
        Assert.assertTrue(deviceDetailPage.isComparisonViewDisplayed(), "Comparison view displays all relevant plan details.");
    }
}
