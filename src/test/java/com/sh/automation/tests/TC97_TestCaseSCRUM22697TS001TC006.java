package com.sh.automation.tests;

import com.sh.automation.base.BaseTest;
import com.sh.automation.pages.DeviceDetailPage;
import org.testng.Assert;
import org.testng.annotations.Test;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class TC97_TestCaseSCRUM22697TS001TC006 extends BaseTest {
    @Test(testName = "TC97", description = "Test Case - SCRUM-22697 TS-001 TC-006", groups = {"TS001", "Functional", "Regression"}, priority = 11)
    public void selectPlanFromAvailablePlans() {
        // Preconditions: On the plans comparison view
        final String PLAN_NAME = "5G SIM Only Plan";
        DeviceDetailPage deviceDetailPage = new DeviceDetailPage(driver);
        deviceDetailPage.selectPlanByName(PLAN_NAME);
        Assert.assertTrue(deviceDetailPage.isPlanSelected(PLAN_NAME), "Plan is selected.");
        deviceDetailPage.clickSelectPlanButton(PLAN_NAME);
        Assert.assertTrue(deviceDetailPage.isPlanConfirmed(PLAN_NAME), "Selected plan is highlighted or confirmed.");
    }
}
