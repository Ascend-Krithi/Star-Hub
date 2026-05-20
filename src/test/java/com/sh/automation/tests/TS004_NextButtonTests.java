package com.sh.automation.tests;

import org.testng.Assert;
import org.testng.annotations.Test;
import com.sh.automation.base.BaseTest;
import com.sh.automation.pages.DeviceDetailPage;

public class TS004_NextButtonTests extends BaseTest {

    /**
     * TestRail Case ID: 1881
     * Test Case - SCRUM-22719 TS-007 TC-001
     */
    @Test(testName = "TC1881", description = "Verify Next button navigates to next step", groups = {"TS004", "Functional", "Regression"}, priority = 1)
    public void verifyNextButtonNavigatesToNextStep() {
        final String BASE_URL = "https://www.starhub.com";
        final String DEVICE_NAME = "Samsung Galaxy A57 5G";
        driver.get(BASE_URL);
        com.sh.automation.pages.HomePage homePage = new com.sh.automation.pages.HomePage(driver);
        homePage.clickMobilesMenu();
        homePage.clickAllPhones();
        com.sh.automation.pages.AllPhonesPage allPhonesPage = new com.sh.automation.pages.AllPhonesPage(driver);
        allPhonesPage.clickDevice(DEVICE_NAME);
        DeviceDetailPage deviceDetailPage = new DeviceDetailPage(driver);
        deviceDetailPage.selectColour("Black");
        deviceDetailPage.selectStorage("256 GB");
        deviceDetailPage.selectPayment("24-month installment");
        deviceDetailPage.clickNextButton();
        Assert.assertTrue(deviceDetailPage.isNextStepLoaded(), "Next step not loaded after clicking Next");
    }
