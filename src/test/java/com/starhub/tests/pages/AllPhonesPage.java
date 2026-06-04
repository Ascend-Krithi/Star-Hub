package com.starhub.tests.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class AllPhonesPage {
    private WebDriver driver;
    private WebDriverWait wait;
    private static final By ALL_PHONES_PAGE_INDICATOR = By.cssSelector("[data-testid=all-phones-page-indicator]"); // LOCATOR_TO_UPDATE
    private static final By DEVICE_LIST = By.cssSelector("[data-testid=device-list]"); // LOCATOR_TO_UPDATE

    public AllPhonesPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, java.time.Duration.ofSeconds(15));
    }

    public boolean isLoaded() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(ALL_PHONES_PAGE_INDICATOR)) != null;
    }

    public boolean isAtLeastOneDeviceListed() {
        WebElement deviceList = wait.until(ExpectedConditions.visibilityOfElementLocated(DEVICE_LIST));
        return deviceList.findElements(By.cssSelector("[data-testid=device-item]")).size() > 0; // LOCATOR_TO_UPDATE
    }

    public void clickDevice(String deviceName) {
        WebElement device = wait.until(ExpectedConditions.elementToBeClickable(By.xpath("//div[@data-testid='device-item' and text()='" + deviceName + "']"))); // LOCATOR_TO_UPDATE
        device.click();
    }
}
