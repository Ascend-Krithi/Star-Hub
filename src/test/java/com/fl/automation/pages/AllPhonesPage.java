package com.fl.automation.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.util.List;

public class AllPhonesPage {
    private WebDriver driver;
    private WebDriverWait wait;
    private By deviceList = By.cssSelector("[data-testid=device-list]"); // LOCATOR_TO_UPDATE — verify in browser
    private String deviceNameSelector = "[data-testid=device-name][data-name='%s']"; // LOCATOR_TO_UPDATE — verify in browser

    public AllPhonesPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, 20);
    }

    public boolean isAt() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(deviceList)).isDisplayed();
    }

    public boolean isDeviceListDisplayed() {
        List<WebElement> devices = driver.findElements(deviceList);
        return devices != null && !devices.isEmpty();
    }

    public boolean isDeviceVisible(String deviceName) {
        By deviceBy = By.cssSelector(String.format(deviceNameSelector, deviceName));
        try {
            WebElement device = wait.until(ExpectedConditions.visibilityOfElementLocated(deviceBy));
            return device.isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }

    public void clickDeviceByName(String deviceName) {
        By deviceBy = By.cssSelector(String.format(deviceNameSelector, deviceName));
        WebElement device = wait.until(ExpectedConditions.elementToBeClickable(deviceBy));
        device.click();
    }
}
