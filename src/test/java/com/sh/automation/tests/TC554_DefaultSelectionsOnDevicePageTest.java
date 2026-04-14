package com.sh.automation.tests;

import com.sh.automation.base.BaseTest;
import com.sh.automation.pages.HomePage;
import com.sh.automation.pages.AllPhonesPage;
import com.sh.automation.pages.DeviceDetailPage;
import org.testng.Assert;
import org.testng.annotations.Test;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.support.ui.ExpectedConditions;

public class TC554_DefaultSelectionsOnDevicePageTest extends BaseTest {
    @Test(testName = "TC554", description = "Test Case - SCRUM-22697 TS-004 TC-001", groups = {"TS004", "Functional", "Regression"}, priority = 4)
    public void verifyDefaultSelectionsOnDevicePage() {
        // TC554: Test Case - SCRUM-22697 TS-004 TC-001
        // Preconditions: None
        final String BASE_URL = "https://www.starhub.com";
        final String DEVICE_NAME = "Samsung Galaxy A57 5G";
        driver.get(BASE_URL);
        HomePage homePage = new HomePage(driver);
        Assert.assertTrue(homePage.isLoaded(), "Homepage did not load");
        homePage.clickMobilesMenu();
        homePage.clickAllPhones();
        AllPhonesPage allPhonesPage = new AllPhonesPage(driver);
        Assert.assertTrue(allPhonesPage.isLoaded(), "All Phones page did not load");
        allPhonesPage.clickDevice(DEVICE_NAME);
        DeviceDetailPage deviceDetailPage = new DeviceDetailPage(driver);
        Assert.assertTrue(deviceDetailPage.isLoaded(), "Device detail page did not load");
        Assert.assertEquals(deviceDetailPage.getSelectedColour(), "Black", "Default colour is not Black");
        Assert.assertEquals(deviceDetailPage.getSelectedStorage(), "256 GB", "Default storage is not 256 GB");
        Assert.assertEquals(deviceDetailPage.getSelectedPaymentOption(), "24-month installment", "Default payment option is not 24-month installment");
        Assert.assertTrue(deviceDetailPage.areSelectionsVisible(), "Selected options are not clearly visible");
    }
}
