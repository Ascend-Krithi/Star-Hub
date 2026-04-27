package com.sh.automation.tests;

import com.sh.automation.base.BaseTest;
import com.sh.automation.pages.LoginPopupPage;
import org.testng.Assert;
import org.testng.annotations.Test;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class TC99_TestCaseSCRUM22697TS001TC008 extends BaseTest {
    @Test(testName = "TC99", description = "Test Case - SCRUM-22697 TS-001 TC-008", groups = {"TS001", "Functional", "Regression"}, priority = 13)
    public void loginWithValidCredentials() {
        // Preconditions: On the login/sign-up popup
        final String USERNAME = "existinguser@example.com";
        final String PASSWORD = "ValidPassword123";
        LoginPopupPage loginPopupPage = new LoginPopupPage(driver);
        loginPopupPage.enterUsername(USERNAME);
        loginPopupPage.enterPassword(PASSWORD);
        loginPopupPage.clickLoginButton();
        Assert.assertTrue(loginPopupPage.isAuthenticatedAndRedirected(), "User is authenticated and redirected to the purchase/checkout page.");
    }
}
