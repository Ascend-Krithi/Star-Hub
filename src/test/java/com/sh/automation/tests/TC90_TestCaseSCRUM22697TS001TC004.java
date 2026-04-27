package com.sh.automation.tests;

import com.sh.automation.base.BaseTest;
import com.sh.automation.pages.AllPhonesPage;
import com.sh.automation.pages.DeviceDetailPage;
import org.testng.Assert;
import org.testng.annotations.Test;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class TC90_TestCaseSCRUM22697TS001TC004 extends BaseTest {
    @Test(testName = "TC90", description = "Test Case - SCRUM-22697 TS-001 TC-004", groups = {"TS001", "Functional", "Regression"}, priority = 4)
    public void proceedToNextStepFromDeviceDetail() {
        // Preconditions: None
        final String STARHUB_URL = "https://www.starhub.com";
        final String DEVICE_NAME = "Samsung Galaxy A57 5G";
        driver.get(STARHUB_URL);
        WebDriverWait wait = new WebDriverWait(driver, 20);
        AllPhonesPage allPhonesPage = new AllPhonesPage(driver);
        allPhonesPage.navigateTo();
        allPhonesPage.selectDeviceByName(DEVICE_NAME);
        DeviceDetailPage deviceDetailPage = new DeviceDetailPage(driver);
        Assert.assertTrue(deviceDetailPage.isDeviceDetailPageDisplayed(DEVICE_NAME), "Device details page with configuration options is displayed.");
        deviceDetailPage.clickNextButton();
        Assert.assertTrue(deviceDetailPage.isNextStepInitiated(), "System initiates the next step in the purchase journey.");
    }
}
