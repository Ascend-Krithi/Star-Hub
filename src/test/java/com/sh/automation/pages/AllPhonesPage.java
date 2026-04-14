package com.sh.automation.pages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.support.ui.ExpectedConditions;
import java.util.List;

public class AllPhonesPage {
    private WebDriver driver;
    private WebDriverWait wait;
    private static final By DEVICE_LIST = By.cssSelector("[data-testid=device-list]" /* LOCATOR_TO_UPDATE - verify in browser */);
    private static final By DEVICE_ITEM = By.cssSelector("[data-testid=device-item]" /* LOCATOR_TO_UPDATE - verify in browser */);

    public AllPhonesPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, 15);
    }

    public boolean isLoaded() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(DEVICE_LIST)) != null;
    }

    public boolean isDeviceListVisible() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(DEVICE_LIST)) != null;
    }

    public int getDeviceCount() {
        List<WebElement> devices = driver.findElements(DEVICE_ITEM);
        return devices.size();
    }

    public boolean isDeviceVisible(String deviceName) {
        List<WebElement> devices = driver.findElements(DEVICE_ITEM);
        for (WebElement device : devices) {
            if (device.getText().contains(deviceName)) {
                return true;
            }
        }
        return false;
    }

    public void clickDevice(String deviceName) {
        List<WebElement> devices = driver.findElements(DEVICE_ITEM);
        for (WebElement device : devices) {
            if (device.getText().contains(deviceName)) {
                wait.until(ExpectedConditions.elementToBeClickable(device)).click();
                return;
            }
        }
        throw new RuntimeException("Device not found: " + deviceName);
    }
}
