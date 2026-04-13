package com.sh.automation.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.util.List;

public class AllPhonesPage {
    private WebDriver driver;
    private WebDriverWait wait;
    private static final By PAGE_HEADER = By.cssSelector("[data-testid=all-phones-header]"); // LOCATOR_TO_UPDATE
    private static final By DEVICE_LIST = By.cssSelector("[data-testid=device-list]"); // LOCATOR_TO_UPDATE
    private static final String DEVICE_NAME_LOCATOR = "[data-testid=device-name][data-device='%s']"; // LOCATOR_TO_UPDATE

    public AllPhonesPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, 15);
    }

    public boolean isLoaded() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(PAGE_HEADER)).isDisplayed();
    }

    public boolean isAnyDeviceListed() {
        List<WebElement> devices = wait.until(ExpectedConditions.visibilityOfAllElementsLocatedBy(DEVICE_LIST));
        return !devices.isEmpty();
    }

    public boolean isDeviceVisible(String deviceName) {
        By deviceBy = By.cssSelector(String.format(DEVICE_NAME_LOCATOR, deviceName));
        List<WebElement> devices = driver.findElements(deviceBy);
        return !devices.isEmpty() && devices.get(0).isDisplayed();
    }

    public void clickDevice(String deviceName) {
        By deviceBy = By.cssSelector(String.format(DEVICE_NAME_LOCATOR, deviceName));
        WebElement device = wait.until(ExpectedConditions.elementToBeClickable(deviceBy));
        device.click();
    }
}
