package com.starhub.tests;

import com.starhub.automation.base.BaseTest;
import com.starhub.automation.pages.HomePage;
import com.starhub.automation.pages.AllPhonesPage;
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

        HomePage homePage = new HomePage(driver);
        driver.get(STARHUB_URL);
        WebDriverWait wait = new WebDriverWait(driver, 15);
        wait.until(ExpectedConditions.titleContains("StarHub"));
        Assert.assertTrue(homePage.isHomePageDisplayed(), "StarHub homepage is not displayed.");

        homePage.clickShopMenu();
        Assert.assertTrue(homePage.isShopMenuExpanded(), "Shop menu did not expand.");

        homePage.selectMobileDevicesCategory();
        AllPhonesPage allPhonesPage = new AllPhonesPage(driver);
        wait.until(ExpectedConditions.visibilityOf(allPhonesPage.getDeviceListElement()));
        Assert.assertTrue(allPhonesPage.isDeviceListVisible(), "Mobile Devices Listing page does not display device list.");
        Assert.assertTrue(allPhonesPage.areDeviceImagesNamesPricesVisible(), "Device images, names, or prices are missing.");
    }
}
