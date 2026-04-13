package com.fl.automation.tests;

import com.fl.automation.base.BaseTest;
import com.fl.automation.pages.HomePage;
import com.fl.automation.pages.AllPhonesPage;
import com.fl.automation.pages.DeviceDetailPage;
import org.testng.Assert;
import org.testng.annotations.Test;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class TS003_DeviceConfigurationTests_TC554 extends BaseTest {
    @Test(testName = "TC554", description = "Test Case - SCRUM-22697 TS-004 TC-001", groups = {"TS003", "Functional", "Regression"}, priority = 4)
    public void verifyDefaultSelectionsOnDevicePage_TC554() {
        // Preconditions: None
        final String STARHUB_URL = "https://www.starhub.com";
        final String DEVICE_NAME = "Samsung Galaxy A57 5G";
        HomePage homePage = new HomePage(driver);
        driver.get(STARHUB_URL);
        WebDriverWait wait = new WebDriverWait(driver, 20);
        // Step 1: Assert homepage loads
        wait.until(ExpectedConditions.titleContains("StarHub"));
        Assert.assertTrue(driver.getTitle().contains("StarHub"), "Homepage title should contain 'StarHub'");
        // Step 2: Click 'Mobiles' menu
        homePage.clickMobilesMenu();
        // Step 3: Click 'All Phones' link
        homePage.clickAllPhonesLink();
        AllPhonesPage allPhonesPage = new AllPhonesPage(driver);
        // Step 4: Click device
        allPhonesPage.clickDeviceByName(DEVICE_NAME);
        DeviceDetailPage deviceDetailPage = new DeviceDetailPage(driver);
        // Step 5: Assert default selections
        Assert.assertTrue(deviceDetailPage.isDefaultColourSelected("Black"), "Default colour should be Black");
        Assert.assertTrue(deviceDetailPage.isDefaultStorageSelected("256 GB"), "Default storage should be 256 GB");
        Assert.assertTrue(deviceDetailPage.isDefaultPaymentOptionSelected("24-month installment"), "Default payment option should be 24-month installment");
        Assert.assertTrue(deviceDetailPage.areSelectionsVisible(), "All selected options should be clearly visible");
    }
}
