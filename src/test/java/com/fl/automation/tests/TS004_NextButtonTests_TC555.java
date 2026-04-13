package com.fl.automation.tests;

import com.fl.automation.base.BaseTest;
import com.fl.automation.pages.HomePage;
import com.fl.automation.pages.AllPhonesPage;
import com.fl.automation.pages.DeviceDetailPage;
import org.testng.Assert;
import org.testng.annotations.Test;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class TS004_NextButtonTests_TC555 extends BaseTest {
    @Test(testName = "TC555", description = "Test Case - SCRUM-22697 TS-005 TC-001", groups = {"TS004", "Functional", "Regression"}, priority = 5)
    public void verifyNextButtonNavigatesToNextStep_TC555() {
        // Preconditions: None
        final String STARHUB_URL = "https://www.starhub.com";
        final String DEVICE_NAME = "Samsung Galaxy A57 5G";
        final String COLOUR = "Black";
        final String STORAGE = "256 GB";
        final String PAYMENT = "24-month installment";
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
        // Step 5: Select configuration
        deviceDetailPage.selectColour(COLOUR);
        deviceDetailPage.selectStorage(STORAGE);
        deviceDetailPage.selectPaymentOption(PAYMENT);
        // Step 6: Click Next
        deviceDetailPage.clickNextButton();
        // Assert next step is initiated (could be URL change or element visible)
        Assert.assertTrue(deviceDetailPage.isNextStepInitiated(), "System should initiate the next step in the purchase journey");
    }
}
