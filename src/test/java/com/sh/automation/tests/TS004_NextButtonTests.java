package com.sh.automation.tests;

import com.sh.automation.base.BaseTest;
import com.sh.automation.pages.DeviceDetailPage;
import com.sh.automation.pages.LoginPopupPage;
import org.testng.Assert;
import org.testng.annotations.Test;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class TS004_NextButtonTests extends BaseTest {

    @Test(testName = "TC174", description = "Test Case - SCRUM-22697 TS-004 TC-001", groups = {"TS004", "Functional", "Regression"}, priority = 6)
    public void verifyNextButtonNavigatesToNextStep() {
        // Preconditions: Device configuration page is loaded with correct selections
        final String DEVICE_NAME = "Samsung Galaxy A57 5G";
        final String COLOUR = "Black";
        final String STORAGE = "256 GB";
        final String PAYMENT_OPTION = "24-month installment";
        DeviceDetailPage deviceDetailPage = new DeviceDetailPage(driver);
        deviceDetailPage.selectDevice(DEVICE_NAME);
        deviceDetailPage.selectColour(COLOUR);
        deviceDetailPage.selectStorage(STORAGE);
        deviceDetailPage.selectPaymentOption(PAYMENT_OPTION);
        WebDriverWait wait = new WebDriverWait(driver, 15);
        wait.until(ExpectedConditions.elementToBeClickable(deviceDetailPage.getNextButton()));
        deviceDetailPage.clickNextButton();
        LoginPopupPage loginPopupPage = new LoginPopupPage(driver);
        wait.until(ExpectedConditions.visibilityOf(loginPopupPage.getPopup()));
        Assert.assertTrue(loginPopupPage.isPopupDisplayed(), "User is taken to the next step in the purchase flow (login/sign-up popup or plan selection). ");
    }

    @Test(testName = "TC175", description = "Test Case - SCRUM-22697 TS-004 TC-002", groups = {"TS004", "Functional", "Regression"}, priority = 7)
    public void verifyNextButtonStateWithMissingSelections() {
        // Preconditions: Device configuration page is loaded with storage unselected
        DeviceDetailPage deviceDetailPage = new DeviceDetailPage(driver);
        deviceDetailPage.deselectStorage();
        WebDriverWait wait = new WebDriverWait(driver, 15);
        wait.until(ExpectedConditions.elementToBeClickable(deviceDetailPage.getNextButton()));
        deviceDetailPage.clickNextButton();
        Assert.assertTrue(deviceDetailPage.isErrorMessageDisplayed(), "Error message is displayed indicating the missing configuration.");
    }
}
