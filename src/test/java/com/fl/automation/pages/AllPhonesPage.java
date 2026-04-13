package com.fl.automation.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;
import java.util.List;

public class AllPhonesPage {
    private WebDriver driver;
    private WebDriverWait wait;
    private By deviceList = By.cssSelector("[data-testid=device-list]"); // LOCATOR_TO_UPDATE — verify in browser
    private By deviceName = By.cssSelector("[data-testid=device-name]"); // LOCATOR_TO_UPDATE — verify in browser
    private By deviceImage = By.cssSelector("[data-testid=device-image]"); // LOCATOR_TO_UPDATE — verify in browser
    private By devicePrice = By.cssSelector("[data-testid=device-price]"); // LOCATOR_TO_UPDATE — verify in browser

    public AllPhonesPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(15));
    }

    public boolean isPageLoaded() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(deviceList)).isDisplayed();
    }

    public boolean isAnyDeviceListed() {
        List<WebElement> devices = driver.findElements(deviceName);
        return devices != null && !devices.isEmpty();
    }

    public boolean areDeviceImagesDisplayed() {
        List<WebElement> images = driver.findElements(deviceImage);
        return images.stream().allMatch(WebElement::isDisplayed);
    }

    public boolean areDeviceNamesDisplayed() {
        List<WebElement> names = driver.findElements(deviceName);
        return names.stream().allMatch(WebElement::isDisplayed);
    }

    public boolean areDevicePricesDisplayed() {
        List<WebElement> prices = driver.findElements(devicePrice);
        return prices.stream().allMatch(WebElement::isDisplayed);
    }

    public boolean isDeviceVisible(String deviceNameText) {
        List<WebElement> names = driver.findElements(deviceName);
        return names.stream().anyMatch(e -> e.getText().trim().equalsIgnoreCase(deviceNameText));
    }

    public DeviceDetailPage clickDeviceByName(String deviceNameText) {
        List<WebElement> names = driver.findElements(deviceName);
        for (WebElement device : names) {
            if (device.getText().trim().equalsIgnoreCase(deviceNameText)) {
                device.click();
                return new DeviceDetailPage(driver);
            }
        }
        throw new RuntimeException("Device with name '" + deviceNameText + "' not found in list.");
    }
}
