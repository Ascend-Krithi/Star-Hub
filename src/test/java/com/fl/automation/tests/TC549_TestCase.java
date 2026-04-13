package com.fl.automation.tests;

import com.fl.automation.base.BaseTest;
import com.fl.automation.pages.HomePage;
import com.fl.automation.pages.AllPhonesPage;
import com.fl.automation.pages.DeviceDetailPage;
import com.fl.automation.pages.LoginPopupPage;
import org.testng.Assert;
import org.testng.annotations.Test;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class TC549_TestCase extends BaseTest {
    @Test(testName = "TC549", description = "Test Case - SCRUM-22697 TS-005 TC-001", groups = {"TS005", "Functional", "Regression"}, priority = 8)
    public void verifyLoginPopupAppearsWhenNotLoggedIn() {
        // Preconditions
        final String STARHUB_URL = "https://www.starhub.com";
        final String DEVICE_NAME = "Samsung Galaxy A57 5G";
        HomePage homePage = new HomePage(driver);
        WebDriverWait wait = new WebDriverWait(driver, 20);
        driver.get(STARHUB_URL);
        homePage.logoutIfLoggedIn();
        homePage.clickMobilesMenu();
        homePage.clickAllPhonesLink();
        AllPhonesPage allPhonesPage = new AllPhonesPage(driver);
        allPhonesPage.clickDeviceByName(DEVICE_NAME);
        DeviceDetailPage deviceDetailPage = new DeviceDetailPage(driver);
        deviceDetailPage.clickNextButton();
        LoginPopupPage loginPopupPage = new LoginPopupPage(driver);
        Assert.assertTrue(loginPopupPage.isPopupVisible(), "Login popup should be visible");
        Assert.assertTrue(loginPopupPage.isPopupMessageCorrect(), "Popup message should be correct");
        Assert.assertTrue(loginPopupPage.isLoginButtonVisible(), "Login button should be visible");
        Assert.assertTrue(loginPopupPage.isSignUpButtonVisible(), "Sign up button should be visible");
    }
}
