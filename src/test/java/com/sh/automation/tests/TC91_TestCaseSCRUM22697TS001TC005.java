package com.sh.automation.tests;

import com.sh.automation.base.BaseTest;
import com.sh.automation.pages.AllPhonesPage;
import com.sh.automation.pages.DeviceDetailPage;
import com.sh.automation.pages.LoginPopupPage;
import org.testng.Assert;
import org.testng.annotations.Test;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class TC91_TestCaseSCRUM22697TS001TC005 extends BaseTest {
    @Test(testName = "TC91", description = "Test Case - SCRUM-22697 TS-001 TC-005", groups = {"TS001", "Functional", "Regression"}, priority = 5)
    public void verifyLoginPopupOnNextWithoutLogin() {
        // Preconditions: User is not logged in
        final String STARHUB_URL = "https://www.starhub.com";
        final String DEVICE_NAME = "Samsung Galaxy A57 5G";
        driver.get(STARHUB_URL);
        WebDriverWait wait = new WebDriverWait(driver, 20);
        AllPhonesPage allPhonesPage = new AllPhonesPage(driver);
        allPhonesPage.navigateTo();
        allPhonesPage.selectDeviceByName(DEVICE_NAME);
        DeviceDetailPage deviceDetailPage = new DeviceDetailPage(driver);
        deviceDetailPage.clickNextButton();
        LoginPopupPage loginPopupPage = new LoginPopupPage(driver);
        Assert.assertTrue(loginPopupPage.isPopupDisplayed(), "Login/Sign-Up popup window is displayed.");
        Assert.assertEquals(loginPopupPage.getPopupMessage(), "Please log in or create an account to continue with your purchase", "Popup displays the correct message.");
        Assert.assertTrue(loginPopupPage.isLoginWithHubIdButtonVisible(), "'Log in with Hub ID' button is displayed.");
        Assert.assertTrue(loginPopupPage.isSignUpHereButtonVisible(), "'Don’t have an account? Sign up here' button is displayed.");
    }
}
