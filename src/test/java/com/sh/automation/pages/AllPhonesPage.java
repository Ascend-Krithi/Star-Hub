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
    private static final By PAGE_HEADER = By.cssSelector("[data-testid=all-phones-header]"); // LOCATOR_TO_UPDATE
    private static final By DEVICE_LIST = By.cssSelector("[data-testid=device-list]"); // LOCATOR_TO_UPDATE
    private static final By DEVICE_NAME_TEMPLATE = By.xpath("//div[contains(@data-testid,'device-name') and text()='%s']"); // LOCATOR_TO_UPDATE

    public AllPhonesPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(15));
    }

    public boolean isLoaded() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(PAGE_HEADER)).isDisplayed();
    }

    public boolean isDeviceListDisplayed() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(DEVICE_LIST)).isDisplayed();
    }

    public boolean isDeviceVisible(String deviceName) {
        By deviceBy = By.xpath(String.format("//div[contains(@data-testid,'device-name') and text()='%s']", deviceName));
        List<WebElement> devices = driver.findElements(deviceBy);
        return !devices.isEmpty() && devices.get(0).isDisplayed();
    }

    public void clickDevice(String deviceName) {
        By deviceBy = By.xpath(String.format("//div[contains(@data-testid,'device-name') and text()='%s']", deviceName));
        WebElement device = wait.until(ExpectedConditions.elementToBeClickable(deviceBy));
        device.click();
    }
}
