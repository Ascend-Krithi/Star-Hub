package com.sh.automation.tests;

import org.testng.Assert;
import org.testng.annotations.Test;
import com.sh.automation.base.BaseTest;
import com.sh.automation.pages.DeviceDetailPage;
import com.sh.automation.pages.LoginPopupPage;

public class TS005_LoginPopupTests extends BaseTest {

    /**
     * TestRail Case ID: 1882
     * Test Case - SCRUM-22719 TS-008 TC-001
     */
    @Test(testName = "TC1882", description = "Verify login popup appears when not logged in", groups = {"TS005", "Functional", "Regression"}, priority = 1)
    public void verifyLoginPopupAppearsWhenNotLoggedIn() {
        final String BASE_URL = "https://www.starhub.com";
        final String DEVICE_NAME = "Samsung Galaxy A57 5G";
        driver.get(BASE_URL);
        com.sh.automation.pages.HomePage homePage = new com.sh.automation.pages.HomePage(driver);
        homePage.clickMobilesMenu();
        homePage.clickAllPhones();
        com.sh.automation.pages.AllPhonesPage allPhonesPage = new com.sh.automation.pages.AllPhonesPage(driver);
        allPhonesPage.clickDevice(DEVICE_NAME);
        DeviceDetailPage deviceDetailPage = new DeviceDetailPage(driver);
        deviceDetailPage.clickNextButton();
        LoginPopupPage loginPopup = new LoginPopupPage(driver);
        Assert.assertTrue(loginPopup.isPopupDisplayed(), "Login popup was not displayed");
    }
