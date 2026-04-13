package com.fl.automation.tests;

import com.fl.automation.base.BaseTest;
import com.fl.automation.pages.HomePage;
import com.fl.automation.pages.AllPhonesPage;
import com.fl.automation.pages.DeviceDetailPage;
import org.testng.Assert;
import org.testng.annotations.Test;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class TC555_TestCase extends BaseTest {
    @Test(testName = "TC555", description = "Test Case - SCRUM-22697 TS-005 TC-001", groups = {"TS005", "Functional", "Regression"}, priority = 14)
    public void verifyNextButtonNavigatesToNextStep() {
        // Preconditions
        final String STARHUB_URL = "https://www.starhub.com";
        final String DEVICE_NAME = "Samsung Galaxy A57 5G";
        HomePage homePage = new HomePage(driver);
        WebDriverWait wait = new WebDriverWait(driver, 20);
        driver.get(STARHUB_URL);
        homePage.clickMobilesMenu();
        homePage.clickAllPhonesLink();
        AllPhonesPage allPhonesPage = new AllPhonesPage(driver);
        allPhonesPage.clickDeviceByName(DEVICE_NAME);
        DeviceDetailPage deviceDetailPage = new DeviceDetailPage(driver);
        deviceDetailPage.selectConfiguration("Black", "256 GB", "24-month installment");
        deviceDetailPage.clickNextButton();
        Assert.assertTrue(deviceDetailPage.isNextStepInitiated(), "Next step should be initiated");
    }
}
