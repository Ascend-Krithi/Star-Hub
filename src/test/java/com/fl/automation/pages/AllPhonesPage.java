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
    private By deviceList = By.cssSelector("[data-testid=device-list]"); // LOCATOR_TO_UPDATE
    private By deviceName = By.cssSelector("[data-testid=device-name]"); // LOCATOR_TO_UPDATE

    public AllPhonesPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, 20);
    }

    public boolean isAt() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(deviceList)).isDisplayed();
    }

    public boolean isDeviceListDisplayed() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(deviceList)).isDisplayed();
    }

    public int getDeviceCount() {
        List<WebElement> devices = driver.findElements(deviceName);
        return devices.size();
    }

    public boolean isDeviceVisible(String deviceNameText) {
        List<WebElement> devices = driver.findElements(deviceName);
        for (WebElement device : devices) {
            if (device.getText().trim().equalsIgnoreCase(deviceNameText)) {
                return true;
            }
        }
        return false;
    }

    public DeviceDetailPage clickDeviceByName(String deviceNameText) {
        List<WebElement> devices = driver.findElements(deviceName);
        for (WebElement device : devices) {
            if (device.getText().trim().equalsIgnoreCase(deviceNameText)) {
                device.click();
                return new DeviceDetailPage(driver);
            }
        }
        throw new RuntimeException("Device not found: " + deviceNameText);
    }
}
