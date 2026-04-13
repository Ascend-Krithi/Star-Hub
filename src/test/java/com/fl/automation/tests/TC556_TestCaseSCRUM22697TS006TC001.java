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

public class TC556_TestCaseSCRUM22697TS006TC001 extends BaseTest {
    @Test(testName = "TC556", description = "Test Case - SCRUM-22697 TS-006 TC-001", groups = {"TS8", "Functional", "Regression"}, priority = 15)
    public void verifyLoginPopupAppearsWhenNotLoggedIn() {
        // Preconditions: Ensure the user is not logged in
        final String BASE_URL = "https://www.starhub.com";
        final String DEVICE_NAME = "Samsung Galaxy A57 5G";
        driver.get(BASE_URL);
        HomePage homePage = new HomePage(driver);
        WebDriverWait wait = new WebDriverWait(driver, 20);
        Assert.assertTrue(wait.until(ExpectedConditions.titleContains("StarHub")), "Homepage title should contain 'StarHub'");
        homePage.logoutIfLoggedIn();
        homePage.clickMobilesMenu();
        AllPhonesPage allPhonesPage = homePage.clickAllPhonesMenu();
        DeviceDetailPage deviceDetailPage = allPhonesPage.clickDeviceByName(DEVICE_NAME);
        deviceDetailPage.selectConfiguration("Black", "256 GB", "24-month installment");
        deviceDetailPage.clickNextButton();
        LoginPopupPage loginPopupPage = new LoginPopupPage(driver);
        Assert.assertTrue(loginPopupPage.isPopupDisplayed(), "Login/Sign-up popup should be displayed");
        Assert.assertEquals(loginPopupPage.getPopupMessage(), "Please log in or create an account to continue with your purchase", "Popup message should match");
        Assert.assertTrue(loginPopupPage.isLoginButtonVisible(), "Login button should be visible");
        Assert.assertTrue(loginPopupPage.isSignUpButtonVisible(), "Sign-up button should be visible");
    }
}
