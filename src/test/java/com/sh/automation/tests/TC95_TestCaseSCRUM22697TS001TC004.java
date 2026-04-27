package com.sh.automation.tests;

import com.sh.automation.base.BaseTest;
import com.sh.automation.pages.DeviceDetailPage;
import org.testng.Assert;
import org.testng.annotations.Test;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class TC95_TestCaseSCRUM22697TS001TC004 extends BaseTest {
    @Test(testName = "TC95", description = "Test Case - SCRUM-22697 TS-001 TC-004", groups = {"TS001", "Functional", "Regression"}, priority = 9)
    public void reviewAndSelectDeviceConfiguration() {
        // Preconditions: On the Samsung Galaxy A57 5G device detail page
        final String COLOR = "Black";
        final String STORAGE = "256GB";
        DeviceDetailPage deviceDetailPage = new DeviceDetailPage(driver);
        Assert.assertTrue(deviceDetailPage.areConfigurationOptionsVisible(), "Configuration options are visible.");
        deviceDetailPage.selectColour(COLOR);
        Assert.assertEquals(deviceDetailPage.getSelectedColour(), COLOR, "Selected color is reflected in the summary.");
        deviceDetailPage.selectStorage(STORAGE);
        Assert.assertEquals(deviceDetailPage.getSelectedStorage(), STORAGE, "Selected storage is reflected in the summary.");
    }
}
