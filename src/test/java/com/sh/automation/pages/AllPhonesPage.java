package com.sh.automation.pages;

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
    private static final By ALL_PHONES_PAGE_INDICATOR = By.cssSelector("[data-testid=all-phones-page]"); // LOCATOR_TO_UPDATE — verify in browser
    private static final By DEVICE_LIST = By.cssSelector("[data-testid=device-list]"); // LOCATOR_TO_UPDATE — verify in browser
    private static final String DEVICE_ITEM_SELECTOR = "[data-testid=device-item][data-device-name='%s']"; // LOCATOR_TO_UPDATE — verify in browser

    public AllPhonesPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(15));
    }

    public boolean isLoaded() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(ALL_PHONES_PAGE_INDICATOR)).isDisplayed();
    }

    public boolean isDeviceListDisplayed() {
        List<WebElement> devices = wait.until(ExpectedConditions.visibilityOfAllElementsLocatedBy(DEVICE_LIST));
        return devices != null && !devices.isEmpty();
    }

    public void clickDevice(String deviceName) {
        By deviceSelector = By.cssSelector(String.format(DEVICE_ITEM_SELECTOR, deviceName));
        WebElement device = wait.until(ExpectedConditions.elementToBeClickable(deviceSelector));
        device.click();
    }
}
