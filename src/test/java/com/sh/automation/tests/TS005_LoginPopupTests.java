package com.sh.automation.tests;

import com.sh.automation.base.BaseTest;
import com.sh.automation.pages.DeviceDetailPage;
import com.sh.automation.pages.LoginPopupPage;
import org.testng.Assert;
import org.testng.annotations.Test;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class TS005_LoginPopupTests extends BaseTest {

    @Test(testName = "TC176", description = "Test Case - SCRUM-22697 TS-005 TC-001", groups = {"TS005", "Functional", "Regression"}, priority = 8)
    public void verifyLoginPopupAppearsWhenNotLoggedIn() {
        // Preconditions: Device configuration page is loaded
        DeviceDetailPage deviceDetailPage = new DeviceDetailPage(driver);
        deviceDetailPage.clickNextButton();
        LoginPopupPage loginPopupPage = new LoginPopupPage(driver);
        WebDriverWait wait = new WebDriverWait(driver, 15);
        wait.until(ExpectedConditions.visibilityOf(loginPopupPage.getPopup()));
        Assert.assertTrue(loginPopupPage.isPopupDisplayed(), "Login / Sign-Up popup is displayed.");
        Assert.assertTrue(loginPopupPage.hasLoginAndSignUpOptions(), "Popup displays 'Log in with Hub ID' and 'Don’t have an account? Sign up here' buttons.");
    }

    @Test(testName = "TC177", description = "Test Case - SCRUM-22697 TS-005 TC-002", groups = {"TS005", "Functional", "Regression"}, priority = 9)
    public void verifyLoginWithHubIdNavigatesToLoginPage() {
        // Preconditions: Login / Sign-Up popup is displayed
        final String USERNAME = "testuser";
        final String PASSWORD = "Test@1234";
        LoginPopupPage loginPopupPage = new LoginPopupPage(driver);
        loginPopupPage.clickLoginWithHubId();
        loginPopupPage.enterUsername(USERNAME);
        loginPopupPage.enterPassword(PASSWORD);
        loginPopupPage.submitLogin();
        WebDriverWait wait = new WebDriverWait(driver, 15);
        wait.until(ExpectedConditions.urlContains("purchase"));
        Assert.assertTrue(loginPopupPage.isAuthenticated(), "User is authenticated and redirected to the next step in the purchase flow.");
    }

    @Test(testName = "TC178", description = "Test Case - SCRUM-22697 TS-005 TC-003", groups = {"TS005", "Functional", "Regression"}, priority = 10)
    public void verifySignUpLinkNavigatesToSignUpPage() {
        // Preconditions: Login / Sign-Up popup is displayed
        final String EMAIL = "newuser@example.com";
        final String PASSWORD = "NewUser@2024";
        final String MOBILE = "91234567";
        LoginPopupPage loginPopupPage = new LoginPopupPage(driver);
        loginPopupPage.clickSignUpHere();
        loginPopupPage.enterSignUpEmail(EMAIL);
        loginPopupPage.enterSignUpPassword(PASSWORD);
        loginPopupPage.enterSignUpMobile(MOBILE);
        loginPopupPage.submitSignUp();
        WebDriverWait wait = new WebDriverWait(driver, 15);
        wait.until(ExpectedConditions.urlContains("purchase"));
        Assert.assertTrue(loginPopupPage.isAccountCreated(), "User account is created and redirected to the next step in the purchase flow.");
    }
}
