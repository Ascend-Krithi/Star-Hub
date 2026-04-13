package com.sh.automation.tests;

import com.sh.automation.base.BaseTest;
import com.sh.automation.pages.HomePage;
import com.sh.automation.pages.AllPhonesPage;
import com.sh.automation.pages.DeviceDetailPage;
import org.testng.Assert;
import org.testng.annotations.Test;

public class TS003_DeviceConfigurationTests extends BaseTest {

    private static final String BASE_URL = "https://www.starhub.com";
    private static final String DEVICE_NAME = "Samsung Galaxy A57 5G";
    private static final String COLOUR = "Black";
    private static final String STORAGE = "256 GB";
    private static final String PAYMENT = "24-month installment";

    /**
     * TestRail Case ID: TC554
     * Test Name: Test Case - SCRUM-22697 TS-004 TC-001
     */
    @Test(testName = "TC554", description = "Test Case - SCRUM-22697 TS-004 TC-001", groups = {"TS003", "Functional", "Regression"}, priority = 1)
    public void verifyDefaultSelectionsOnDevicePage() {
        // Preconditions: None
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
        Assert.assertEquals(deviceDetailPage.getSelectedColour(), COLOUR, "Default colour is not Black");
        Assert.assertEquals(deviceDetailPage.getSelectedStorage(), STORAGE, "Default storage is not 256 GB");
        Assert.assertEquals(deviceDetailPage.getSelectedPayment(), PAYMENT, "Default payment option is not 24-month installment");
        Assert.assertTrue(deviceDetailPage.areSelectionsVisible(), "Selected options are not clearly visible");
    }
}
