package com.sh.automation.tests;

import com.sh.automation.base.BaseTest;
import com.sh.automation.pages.HomePage;
import com.sh.automation.pages.AllPhonesPage;
import org.testng.Assert;
import org.testng.annotations.Test;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class TS001_PhoneListingTests extends BaseTest {

    @Test(testName = "TC169", description = "Test Case - SCRUM-22697 TS-001 TC-001", groups = {"TS001", "Functional", "Regression"}, priority = 1)
    public void verifyAllPhonesPageLoadsViaMenu() {
        // Preconditions: Ensure browser is launched and StarHub homepage is loaded
        final String STARHUB_URL = "https://www.starhub.com/";
        final String SHOP_MENU = "Shop";
        final String MOBILE_DEVICES_CATEGORY = "Mobile Devices";
        driver.get(STARHUB_URL);
        HomePage homePage = new HomePage(driver);
        WebDriverWait wait = new WebDriverWait(driver, 15);
        wait.until(ExpectedConditions.visibilityOf(homePage.getShopMenu()));
        homePage.clickShopMenu();
        wait.until(ExpectedConditions.visibilityOf(homePage.getMobileDevicesMenu()));
        homePage.clickMobileDevicesMenu();
        AllPhonesPage allPhonesPage = new AllPhonesPage(driver);
        wait.until(ExpectedConditions.visibilityOf(allPhonesPage.getDeviceList()));
        Assert.assertTrue(allPhonesPage.isDeviceListVisible(), "A list of mobile devices is visible, with device images, names, and prices.");
    }
}
