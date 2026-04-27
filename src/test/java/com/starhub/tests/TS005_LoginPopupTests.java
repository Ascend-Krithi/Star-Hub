package com.starhub.tests;

import com.starhub.automation.base.BaseTest;
import com.starhub.automation.pages.LoginPopupPage;
import org.testng.Assert;
import org.testng.annotations.Test;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class TS005_LoginPopupTests extends BaseTest {

    @Test(testName = "TC178", description = "Test Case - SCRUM-22697 TS-005 TC-003", groups = {"TS005", "Functional", "Regression"}, priority = 10)
    public void verifySignUpLinkNavigatesToSignUpPage() {
        // Preconditions: Login / Sign-Up popup is displayed
        final String EMAIL = "newuser@example.com";
        final String PASSWORD = "NewUser@2024";
        final String MOBILE = "91234567";

        LoginPopupPage loginPopupPage = new LoginPopupPage(driver);
        loginPopupPage.clickSignUpHere();
        loginPopupPage.enterSignUpDetails(EMAIL, PASSWORD, MOBILE);
        loginPopupPage.submitSignUp();
        WebDriverWait wait = new WebDriverWait(driver, 15);
        Assert.assertTrue(loginPopupPage.isAccountCreated(), "User account is not created.");
        Assert.assertTrue(loginPopupPage.isRedirectedToNextStep(), "User is not redirected to the next step in the purchase flow.");
    }
}
