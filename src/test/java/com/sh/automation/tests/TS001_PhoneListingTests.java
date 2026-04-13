package com.sh.automation.tests;

import com.sh.automation.base.BaseTest;
import com.sh.automation.pages.HomePage;
import com.sh.automation.pages.AllPhonesPage;
import org.testng.Assert;
import org.testng.annotations.Test;

public class TS001_PhoneListingTests extends BaseTest {

    /**
     * TestRail Case ID: TC551
     * Test Case: Test Case - SCRUM-22697 TS-001 TC-001
     */
    @Test(testName = "TC551", description = "Test Case - SCRUM-22697 TS-001 TC-001", groups = {"TS001", "Functional", "Regression"}, priority = 1)
    public void verifyAllPhonesPageLoadsViaMenu() {
        // Preconditions: None
        final String BASE_URL = "https://www.starhub.com";
        driver.get(BASE_URL);
        HomePage homePage = new HomePage(driver);
        Assert.assertTrue(homePage.isLoaded(), "Homepage did not load");
        homePage.clickMobilesMenu();
        homePage.clickAllPhones();
        AllPhonesPage allPhonesPage = new AllPhonesPage(driver);
        Assert.assertTrue(allPhonesPage.isLoaded(), "All Phones page did not load");
    }

    /**
     * TestRail Case ID: TC552
     * Test Case: Test Case - SCRUM-22697 TS-002 TC-001
     */
    @Test(testName = "TC552", description = "Test Case - SCRUM-22697 TS-002 TC-001", groups = {"TS001", "Functional", "Regression"}, priority = 2)
    public void verifyAtLeastOneDeviceListed() {
        // Preconditions: None
        final String BASE_URL = "https://www.starhub.com";
        driver.get(BASE_URL);
        HomePage homePage = new HomePage(driver);
        Assert.assertTrue(homePage.isLoaded(), "Homepage did not load");
        homePage.clickMobilesMenu();
        homePage.clickAllPhones();
        AllPhonesPage allPhonesPage = new AllPhonesPage(driver);
        Assert.assertTrue(allPhonesPage.isLoaded(), "All Phones page did not load");
        Assert.assertTrue(allPhonesPage.isDeviceListDisplayed(), "Device list is not displayed");
    }

    /**
     * TestRail Case ID: TC553
     * Test Case: Test Case - SCRUM-22697 TS-003 TC-001
     */
    @Test(testName = "TC553", description = "Test Case - SCRUM-22697 TS-003 TC-001", groups = {"TS001", "Functional", "Regression"}, priority = 3)
    public void verifyDeviceDetailPageLoads() {
        // Preconditions: None
        final String BASE_URL = "https://www.starhub.com";
        final String DEVICE_NAME = "Samsung Galaxy A57 5G";
        driver.get(BASE_URL);
        HomePage homePage = new HomePage(driver);
        Assert.assertTrue(homePage.isLoaded(), "Homepage did not load");
        homePage.clickMobilesMenu();
        homePage.clickAllPhones();
        AllPhonesPage allPhonesPage = new AllPhonesPage(driver);
        Assert.assertTrue(allPhonesPage.isLoaded(), "All Phones page did not load");
        Assert.assertTrue(allPhonesPage.isDeviceVisible(DEVICE_NAME), DEVICE_NAME + " is not visible in the list");
        allPhonesPage.clickDevice(DEVICE_NAME);
        com.sh.automation.pages.DeviceDetailPage deviceDetailPage = new com.sh.automation.pages.DeviceDetailPage(driver);
        Assert.assertTrue(deviceDetailPage.isLoaded(), "Device detail page did not load");
    }

    /**
     * TestRail Case ID: TC554
     * Test Case: Test Case - SCRUM-22697 TS-004 TC-001
     */
    @Test(testName = "TC554", description = "Test Case - SCRUM-22697 TS-004 TC-001", groups = {"TS001", "Functional", "Regression"}, priority = 4)
    public void verifyDefaultSelectionsOnDevicePage() {
        // Preconditions: None
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
        com.sh.automation.pages.DeviceDetailPage deviceDetailPage = new com.sh.automation.pages.DeviceDetailPage(driver);
        Assert.assertTrue(deviceDetailPage.isLoaded(), "Device detail page did not load");
        Assert.assertEquals(deviceDetailPage.getSelectedColour(), "Black", "Default colour is not Black");
        Assert.assertEquals(deviceDetailPage.getSelectedStorage(), "256 GB", "Default storage is not 256 GB");
        Assert.assertEquals(deviceDetailPage.getSelectedPaymentOption(), "24-month installment", "Default payment option is not 24-month installment");
        Assert.assertTrue(deviceDetailPage.areSelectionsVisible(), "Selected options are not clearly visible");
    }

    /**
     * TestRail Case ID: TC555
     * Test Case: Test Case - SCRUM-22697 TS-005 TC-001
     */
    @Test(testName = "TC555", description = "Test Case - SCRUM-22697 TS-005 TC-001", groups = {"TS001", "Functional", "Regression"}, priority = 5)
    public void verifyNextButtonNavigatesToNextStep() {
        // Preconditions: None
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
        com.sh.automation.pages.DeviceDetailPage deviceDetailPage = new com.sh.automation.pages.DeviceDetailPage(driver);
        Assert.assertTrue(deviceDetailPage.isLoaded(), "Device detail page did not load");
        deviceDetailPage.selectColour("Black");
        deviceDetailPage.selectStorage("256 GB");
        deviceDetailPage.selectPayment("24-month installment");
        deviceDetailPage.clickNext();
        Assert.assertTrue(deviceDetailPage.isNextStepInitiated(), "Next step in purchase journey was not initiated");
    }

    /**
     * TestRail Case ID: TC556
     * Test Case: Test Case - SCRUM-22697 TS-006 TC-001
     */
    @Test(testName = "TC556", description = "Test Case - SCRUM-22697 TS-006 TC-001", groups = {"TS001", "Functional", "Regression"}, priority = 6)
    public void verifyLoginPopupAppearsWhenNotLoggedIn() {
        // Preconditions: Ensure the user is not logged in
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
        com.sh.automation.pages.DeviceDetailPage deviceDetailPage = new com.sh.automation.pages.DeviceDetailPage(driver);
        Assert.assertTrue(deviceDetailPage.isLoaded(), "Device detail page did not load");
        deviceDetailPage.selectColour("Black");
        deviceDetailPage.selectStorage("256 GB");
        deviceDetailPage.selectPayment("24-month installment");
        deviceDetailPage.clickNext();
        com.sh.automation.pages.LoginPopupPage loginPopup = new com.sh.automation.pages.LoginPopupPage(driver);
        Assert.assertTrue(loginPopup.isPopupDisplayed(), "Login popup was not displayed");
        Assert.assertEquals(loginPopup.getPopupMessageText(), "Please log in or create an account to continue with your purchase", "Popup message text mismatch");
    }

    /**
     * TestRail Case ID: TC557
     * Test Case: Test Case - SCRUM-22697 TS-007 TC-001
     */
    @Test(testName = "TC557", description = "Test Case - SCRUM-22697 TS-007 TC-001", groups = {"TS001", "Functional", "Regression"}, priority = 7)
    public void verifyNoPopupWhenLoggedIn() {
        // Preconditions: Log in with valid user credentials
        final String BASE_URL = "https://www.starhub.com";
        final String DEVICE_NAME = "Samsung Galaxy A57 5G";
        final String USERNAME = "validuser";
        final String PASSWORD = "validpassword";
        driver.get(BASE_URL);
        HomePage homePage = new HomePage(driver);
        Assert.assertTrue(homePage.isLoaded(), "Homepage did not load");
        homePage.login(USERNAME, PASSWORD);
        Assert.assertTrue(homePage.isLoggedIn(), "User is not logged in");
        homePage.clickMobilesMenu();
        homePage.clickAllPhones();
        AllPhonesPage allPhonesPage = new AllPhonesPage(driver);
        Assert.assertTrue(allPhonesPage.isLoaded(), "All Phones page did not load");
        allPhonesPage.clickDevice(DEVICE_NAME);
        com.sh.automation.pages.DeviceDetailPage deviceDetailPage = new com.sh.automation.pages.DeviceDetailPage(driver);
        Assert.assertTrue(deviceDetailPage.isLoaded(), "Device detail page did not load");
        deviceDetailPage.selectColour("Black");
        deviceDetailPage.selectStorage("256 GB");
        deviceDetailPage.selectPayment("24-month installment");
        deviceDetailPage.clickNext();
        com.sh.automation.pages.LoginPopupPage loginPopup = new com.sh.automation.pages.LoginPopupPage(driver);
        Assert.assertFalse(loginPopup.isPopupDisplayed(), "Login popup should not be displayed for logged in user");
    }
}
