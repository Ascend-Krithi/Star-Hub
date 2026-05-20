package com.sh.automation.tests;

import com.sh.automation.base.BaseTest;
import com.sh.automation.pages.DeviceDetailPage;
import com.sh.automation.pages.AllPhonesPage;
import com.sh.automation.pages.HomePage;
import org.testng.Assert;
import org.testng.annotations.Test;

public class TS004_NextButtonTests extends BaseTest {

    /**
     * TestRail Case ID: 1883
     * Test Case - SCRUM-22719 TS-009 TC-001
     */
    @Test(testName = "TC1883", description = "Verify Next button navigates to next step.", groups = {"TS004", "Functional", "Regression"}, priority = 1)
    public void verifyNextButtonNavigatesToNextStep() {
        final String BASE_URL = "https://www.starhub.com";
        final String DEVICE_NAME = "Samsung Galaxy A57 5G";
        driver.get(BASE_URL);
        HomePage homePage = new HomePage(driver);
        Assert.assertTrue(homePage.isLoaded(), "Homepage did not load");
        homePage.clickMobilesMenu();
        homePage.clickAllPhones();
        AllPhonesPage allPhonesPage = new AllPhonesPage(driver);
        Assert.assertTrue(allPhonesPage.isLoaded(), "All Phones page did not load");
        allPhonesPage.clickDevice(DEVICE_NAME);
        DeviceDetailPage deviceDetailPage = new DeviceDetailPage(driver);
        Assert.assertTrue(deviceDetailPage.isLoaded(), "Device detail page did not load");
        deviceDetailPage.selectColour("Black");
        deviceDetailPage.selectStorage("256 GB");
        deviceDetailPage.selectPayment("24-month installment");
        deviceDetailPage.clickNextButton();
        Assert.assertTrue(deviceDetailPage.isNextStepLoaded(), "Next step did not load after clicking Next");
    }

    /**
     * TestRail Case ID: 1884
     * Test Case - SCRUM-22719 TS-010 TC-001
     */
    @Test(testName = "TC1884", description = "Verify Next button state with and without selections.", groups = {"TS004", "Functional", "Regression"}, priority = 2)
    public void verifyNextButtonStateWithAndWithoutSelections() {
        final String BASE_URL = "https://www.starhub.com";
        final String DEVICE_NAME = "Samsung Galaxy A57 5G";
        driver.get(BASE_URL);
        HomePage homePage = new HomePage(driver);
        Assert.assertTrue(homePage.isLoaded(), "Homepage did not load");
        homePage.clickMobilesMenu();
        homePage.clickAllPhones();
        AllPhonesPage allPhonesPage = new AllPhonesPage(driver);
        Assert.assertTrue(allPhonesPage.isLoaded(), "All Phones page did not load");
        allPhonesPage.clickDevice(DEVICE_NAME);
        DeviceDetailPage deviceDetailPage = new DeviceDetailPage(driver);
        Assert.assertTrue(deviceDetailPage.isLoaded(), "Device detail page did not load");
        Assert.assertTrue(deviceDetailPage.isNextButtonEnabled(), "Next button should be enabled with selections");
        deviceDetailPage.clearSelections();
        Assert.assertFalse(deviceDetailPage.isNextButtonEnabled(), "Next button should be disabled without selections");
    }
}
