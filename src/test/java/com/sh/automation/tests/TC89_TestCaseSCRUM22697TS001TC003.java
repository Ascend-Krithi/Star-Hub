package com.sh.automation.tests;

import com.sh.automation.base.BaseTest;
import com.sh.automation.pages.AllPhonesPage;
import com.sh.automation.pages.DeviceDetailPage;
import org.testng.Assert;
import org.testng.annotations.Test;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class TC89_TestCaseSCRUM22697TS001TC003 extends BaseTest {
    @Test(testName = "TC89", description = "Test Case - SCRUM-22697 TS-001 TC-003", groups = {"TS001", "Functional", "Regression"}, priority = 3)
    public void verifyDefaultDeviceSelections() {
        // Preconditions: None
        final String STARHUB_URL = "https://www.starhub.com";
        final String DEVICE_NAME = "Samsung Galaxy A57 5G";
        final String DEFAULT_COLOUR = "Black";
        final String DEFAULT_STORAGE = "256 GB";
        final String DEFAULT_PAYMENT = "24-month installment";
        driver.get(STARHUB_URL);
        WebDriverWait wait = new WebDriverWait(driver, 20);
        AllPhonesPage allPhonesPage = new AllPhonesPage(driver);
        allPhonesPage.navigateTo();
        allPhonesPage.selectDeviceByName(DEVICE_NAME);
        DeviceDetailPage deviceDetailPage = new DeviceDetailPage(driver);
        Assert.assertTrue(deviceDetailPage.isDeviceDetailPageDisplayed(DEVICE_NAME), "Device details page for Samsung Galaxy A57 5G is displayed.");
        Assert.assertEquals(deviceDetailPage.getSelectedColour(), DEFAULT_COLOUR, "Colour option is set to Black.");
        Assert.assertEquals(deviceDetailPage.getSelectedStorage(), DEFAULT_STORAGE, "Storage option is set to 256 GB.");
        Assert.assertEquals(deviceDetailPage.getSelectedPaymentOption(), DEFAULT_PAYMENT, "Payment option is set to 24-month installment.");
        Assert.assertTrue(deviceDetailPage.areSelectedOptionsVisible(), "All selected options are displayed on the device details page.");
    }
}
