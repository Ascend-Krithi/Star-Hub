package com.fl.automation.tests;

import com.fl.automation.base.BaseTest;
import com.fl.automation.pages.HomePage;
import com.fl.automation.pages.AllPhonesPage;
import com.fl.automation.pages.DeviceDetailPage;
import org.testng.Assert;
import org.testng.annotations.Test;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class TS005_LoginPopupTests_TC557 extends BaseTest {
    @Test(testName = "TC557", description = "Test Case - SCRUM-22697 TS-007 TC-001", groups = {"TS005", "Functional", "Regression"}, priority = 7)
    public void verifyNoPopupWhenLoggedIn_TC557() {
        // Preconditions: Log in with valid user credentials
        final String STARHUB_URL = "https://www.starhub.com";
        final String DEVICE_NAME = "Samsung Galaxy A57 5G";
        final String COLOUR = "Black";
        final String STORAGE = "256 GB";
        final String PAYMENT = "24-month installment";
        final String USERNAME = "validuser";
        final String PASSWORD = "validpassword";
        HomePage homePage = new HomePage(driver);
        driver.get(STARHUB_URL);
        WebDriverWait wait = new WebDriverWait(driver, 20);
        // Step 1: Assert homepage loads
        wait.until(ExpectedConditions.titleContains("StarHub"));
        Assert.assertTrue(driver.getTitle().contains("StarHub"), "Homepage title should contain 'StarHub'");
        // Step 2: Log in
        homePage.login(USERNAME, PASSWORD);
        Assert.assertTrue(homePage.isLoggedIn(), "User should be logged in successfully");
        // Step 3: Click 'Mobiles' menu
        homePage.clickMobilesMenu();
        // Step 4: Click 'All Phones' link
        homePage.clickAllPhonesLink();
        AllPhonesPage allPhonesPage = new AllPhonesPage(driver);
        // Step 5: Click device
        allPhonesPage.clickDeviceByName(DEVICE_NAME);
        DeviceDetailPage deviceDetailPage = new DeviceDetailPage(driver);
        // Step 6: Select configuration
        deviceDetailPage.selectColour(COLOUR);
        deviceDetailPage.selectStorage(STORAGE);
        deviceDetailPage.selectPaymentOption(PAYMENT);
        // Step 7: Click Next
        deviceDetailPage.clickNextButton();
        // Assert no login popup appears
        Assert.assertFalse(deviceDetailPage.isLoginPopupDisplayed(), "No login/sign-up popup window should appear for logged-in user");
        Assert.assertTrue(deviceDetailPage.isNextStepInitiated(), "System should initiate the next step in the purchase journey");
    }
}
