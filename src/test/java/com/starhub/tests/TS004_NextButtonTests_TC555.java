package com.starhub.tests;

import com.starhub.automation.base.BaseTest;
import com.starhub.automation.pages.HomePage;
import com.starhub.automation.pages.AllPhonesPage;
import com.starhub.automation.pages.DeviceDetailPage;
import org.testng.Assert;
import org.testng.annotations.Test;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class TS004_NextButtonTests_TC555 extends BaseTest {
    @Test(testName = "TC555", description = "Test Case - SCRUM-22697 TS-005 TC-001", groups = {"TS004", "Functional", "Regression"}, priority = 5)
    public void verifyNextButtonNavigatesToNextStep() {
        // Preconditions: None
        final String STARHUB_URL = "https://www.starhub.com";
        final String DEVICE_NAME = "Samsung Galaxy A57 5G";
        final String COLOUR = "Black";
        final String STORAGE = "256 GB";
        final String PAYMENT = "24-month installment";
        HomePage homePage = new HomePage(driver);
        WebDriverWait wait = new WebDriverWait(driver, 20);
        driver.get(STARHUB_URL);
        // Step 1: Launch StarHub homepage
        wait.until(ExpectedConditions.titleContains("StarHub"));
        Assert.assertTrue(homePage.isPageLoaded(), "StarHub homepage did not load successfully");
        // Step 2: Click 'Mobiles' menu
        homePage.clickMobilesMenu();
        Assert.assertTrue(homePage.isMobilesMenuExpanded(), "Mobiles menu did not expand");
        // Step 3: Click 'All Phones' link
        homePage.clickAllPhonesLink();
        AllPhonesPage allPhonesPage = new AllPhonesPage(driver);
        Assert.assertTrue(allPhonesPage.isPageLoaded(), "All Phones listing page is not displayed");
        // Step 4: Click device
        allPhonesPage.clickDevice(DEVICE_NAME);
        DeviceDetailPage deviceDetailPage = new DeviceDetailPage(driver);
        Assert.assertTrue(deviceDetailPage.isPageLoaded(DEVICE_NAME), "Device details page for " + DEVICE_NAME + " is not displayed");
        // Step 5: Review/select configuration
        deviceDetailPage.selectColour(COLOUR);
        deviceDetailPage.selectStorage(STORAGE);
        deviceDetailPage.selectPaymentOption(PAYMENT);
        Assert.assertTrue(deviceDetailPage.isConfigurationSelected(COLOUR, STORAGE, PAYMENT), "Device configuration is not selected");
        // Step 6: Click 'Next' button
        deviceDetailPage.clickNextButton();
        Assert.assertTrue(deviceDetailPage.isNextStepInitiated(), "Next step in purchase journey was not initiated");
    }
}
