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

    public AllPhonesPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, 20);
    }

    public boolean isPageLoaded() {
        WebElement pageHeader = wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid=all-phones-header]"))); // LOCATOR_TO_UPDATE
        return pageHeader.isDisplayed();
    }

    public boolean isDeviceListVisible() {
        WebElement deviceList = wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid=device-list]"))); // LOCATOR_TO_UPDATE
        return deviceList.isDisplayed();
    }

    public int getDeviceCount() {
        List<WebElement> devices = driver.findElements(By.cssSelector("[data-testid=device-item]")); // LOCATOR_TO_UPDATE
        return devices.size();
    }

    public boolean isDeviceVisible(String deviceName) {
        List<WebElement> devices = driver.findElements(By.cssSelector("[data-testid=device-item]")); // LOCATOR_TO_UPDATE
        for (WebElement device : devices) {
            if (device.getText().contains(deviceName)) {
                return true;
            }
        }
        return false;
    }

    public void clickDeviceByName(String deviceName) {
        List<WebElement> devices = driver.findElements(By.cssSelector("[data-testid=device-item]")); // LOCATOR_TO_UPDATE
        for (WebElement device : devices) {
            if (device.getText().contains(deviceName)) {
                device.click();
                return;
            }
        }
        throw new RuntimeException("Device not found: " + deviceName);
    }
}
