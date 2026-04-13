package com.fl.automation.tests;

import com.fl.automation.base.BaseTest;
import com.fl.automation.pages.HomePage;
import com.fl.automation.pages.AllPhonesPage;
import com.fl.automation.pages.DeviceDetailPage;
import org.testng.Assert;
import org.testng.annotations.Test;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class TC550_TestCaseSCRUM22697TS005TC002 extends BaseTest {
    @Test(testName = "TC550", description = "Test Case - SCRUM-22697 TS-005 TC-002", groups = {"TS8", "Functional", "Regression"}, priority = 9)
    public void verifyNoPopupWhenLoggedIn() {
        // Preconditions: Log in with valid user credentials
        final String BASE_URL = "https://www.starhub.com";
        final String DEVICE_NAME = "Samsung Galaxy A57 5G";
        final String USERNAME = "testuser@example.com";
        final String PASSWORD = "ValidPassword123";
        driver.get(BASE_URL);
        HomePage homePage = new HomePage(driver);
        WebDriverWait wait = new WebDriverWait(driver, 20);
        Assert.assertTrue(wait.until(ExpectedConditions.titleContains("StarHub")), "Homepage title should contain 'StarHub'");
        homePage.login(USERNAME, PASSWORD);
        homePage.clickMobilesMenu();
        AllPhonesPage allPhonesPage = homePage.clickAllPhonesMenu();
        DeviceDetailPage deviceDetailPage = allPhonesPage.clickDeviceByName(DEVICE_NAME);
        deviceDetailPage.clickNextButton();
        Assert.assertFalse(deviceDetailPage.isLoginPopupDisplayed(), "Login/Sign-up popup should NOT be displayed for logged-in user");
        Assert.assertTrue(deviceDetailPage.isNextStepInitiated(), "User should proceed to next step");
    }
}
