package com.sh.automation.tests;

import com.sh.automation.base.BaseTest;
import com.sh.automation.pages.HomePage;
import com.sh.automation.pages.AllPhonesPage;
import com.sh.automation.pages.DeviceDetailPage;
import org.testng.Assert;
import org.testng.annotations.Test;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class TC88_TestCaseSCRUM22697TS001TC002 extends BaseTest {
    @Test(testName = "TC88", description = "Test Case - SCRUM-22697 TS-001 TC-002", groups = {"TS001", "Functional", "Regression"}, priority = 2)
    public void selectDeviceFromAllPhonesList() {
        // Preconditions: None
        final String STARHUB_URL = "https://www.starhub.com";
        final String DEVICE_NAME = "Samsung Galaxy A57 5G";
        HomePage homePage = new HomePage(driver);
        driver.get(STARHUB_URL);
        WebDriverWait wait = new WebDriverWait(driver, 20);
        // Step 1: Launch the StarHub website in a browser.
        wait.until(ExpectedConditions.titleContains("StarHub"));
        Assert.assertTrue(driver.getTitle().contains("StarHub"), "StarHub homepage loads successfully.");
        // Step 2: Navigate to the 'Mobiles' section and click on 'All Phones'.
        homePage.clickMobilesMenu();
        homePage.clickAllPhonesOption();
        AllPhonesPage allPhonesPage = new AllPhonesPage(driver);
        Assert.assertTrue(allPhonesPage.isDeviceListDisplayed(), "List of available mobile devices is displayed.");
        // Step 3: Select 'Samsung Galaxy A57 5G' from the list.
        allPhonesPage.selectDeviceByName(DEVICE_NAME);
        DeviceDetailPage deviceDetailPage = new DeviceDetailPage(driver);
        Assert.assertTrue(deviceDetailPage.isDeviceDetailPageDisplayed(DEVICE_NAME), "Device details page for Samsung Galaxy A57 5G is displayed.");
    }
}
