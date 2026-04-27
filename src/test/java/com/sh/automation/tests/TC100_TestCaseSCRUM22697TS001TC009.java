package com.sh.automation.tests;

import com.sh.automation.base.BaseTest;
import com.sh.automation.pages.LoginPopupPage;
import org.testng.Assert;
import org.testng.annotations.Test;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class TC100_TestCaseSCRUM22697TS001TC009 extends BaseTest {
    @Test(testName = "TC100", description = "Test Case - SCRUM-22697 TS-001 TC-009", groups = {"TS001", "Functional", "Regression"}, priority = 14)
    public void signUpNewUserAndProceedToCheckout() {
        // Preconditions: On the login/sign-up popup
        final String NAME = "Test User";
        final String EMAIL = "newuser+001@example.com";
        final String PASSWORD = "NewUserPass!2024";
        final String PHONE = "91234567";
        LoginPopupPage loginPopupPage = new LoginPopupPage(driver);
        loginPopupPage.clickSignUpLink();
        loginPopupPage.fillRegistrationForm(NAME, EMAIL, PASSWORD, PHONE);
        loginPopupPage.submitRegistrationForm();
        Assert.assertTrue(loginPopupPage.isAccountCreatedAndRedirected(), "New user account is created and redirected to purchase/checkout page.");
    }
}
