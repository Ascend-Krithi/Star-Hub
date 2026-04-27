package com.sh.automation.tests;

import com.sh.automation.base.BaseTest;
import com.sh.automation.pages.AllPhonesPage;
import com.sh.automation.pages.DeviceDetailPage;
import org.testng.Assert;
import org.testng.annotations.Test;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class TC94_TestCaseSCRUM22697TS001TC003 extends BaseTest {
    @Test(testName = "TC94", description = "Test Case - SCRUM-22697 TS-001 TC-003", groups = {"TS001", "Functional", "Regression"}, priority = 8)
    public void selectSamsungGalaxyA57FromAllPhones() {
        // Preconditions: On the 'All Phones' page
        final String DEVICE_NAME = "Samsung Galaxy A57 5G";
        AllPhonesPage allPhonesPage = new AllPhonesPage(driver);
        allPhonesPage.searchDeviceByName(DEVICE_NAME);
        Assert.assertTrue(allPhonesPage.isDeviceVisibleInList(DEVICE_NAME), "'Samsung Galaxy A57 5G' is visible in the list.");
        allPhonesPage.selectDeviceByName(DEVICE_NAME);
        DeviceDetailPage deviceDetailPage = new DeviceDetailPage(driver);
        Assert.assertTrue(deviceDetailPage.isDeviceDetailPageDisplayed(DEVICE_NAME), "Device detail page for Samsung Galaxy A57 5G is displayed.");
    }
}
