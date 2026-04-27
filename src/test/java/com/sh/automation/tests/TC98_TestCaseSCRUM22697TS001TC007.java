package com.sh.automation.tests;

import com.sh.automation.base.BaseTest;
import com.sh.automation.pages.DeviceDetailPage;
import com.sh.automation.pages.LoginPopupPage;
import org.testng.Assert;
import org.testng.annotations.Test;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class TC98_TestCaseSCRUM22697TS001TC007 extends BaseTest {
    @Test(testName = "TC98", description = "Test Case - SCRUM-22697 TS-001 TC-007", groups = {"TS001", "Functional", "Regression"}, priority = 12)
    public void verifyLoginPopupAfterSelectingPlanAndNext() {
        // Preconditions: After selecting the desired plan
        DeviceDetailPage deviceDetailPage = new DeviceDetailPage(driver);
        deviceDetailPage.clickNextButton();
        LoginPopupPage loginPopupPage = new LoginPopupPage(driver);
        Assert.assertTrue(loginPopupPage.isPopupDisplayed(), "Login/sign-up popup appears.");
    }
}
