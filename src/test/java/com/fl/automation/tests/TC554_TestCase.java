package com.fl.automation.tests;

import com.fl.automation.base.BaseTest;
import com.fl.automation.pages.HomePage;
import com.fl.automation.pages.AllPhonesPage;
import com.fl.automation.pages.DeviceDetailPage;
import org.testng.Assert;
import org.testng.annotations.Test;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class TC554_TestCase extends BaseTest {
    @Test(testName = "TC554", description = "Test Case - SCRUM-22697 TS-004 TC-001", groups = {"TS004", "Functional", "Regression"}, priority = 13)
    public void verifyDefaultSelectionsOnDevicePage() {
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
        Assert.assertTrue(deviceDetailPage.isPageLoaded(), "Device detail page should load");
        Assert.assertEquals(deviceDetailPage.getSelectedColour(), "Black", "Default colour should be Black");
        Assert.assertEquals(deviceDetailPage.getSelectedStorage(), "256 GB", "Default storage should be 256 GB");
        Assert.assertEquals(deviceDetailPage.getSelectedPayment(), "24-month installment", "Default payment should be 24-month installment");
        Assert.assertTrue(deviceDetailPage.areSelectionsVisible(), "All selected options should be clearly visible");
    }
}
