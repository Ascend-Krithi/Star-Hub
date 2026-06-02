package com.sh.automation.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class AllPhonesPage {
    private WebDriver driver;
    private WebDriverWait wait;
    private static final By ALL_PHONES_PAGE_INDICATOR = By.cssSelector("[data-testid=all-phones-page-indicator]"); // LOCATOR_TO_UPDATE
    private static final By DEVICE_LIST = By.cssSelector("[data-testid=device-list]"); // LOCATOR_TO_UPDATE

    public AllPhonesPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, java.time.Duration.ofSeconds(20));
    }

    public boolean isLoaded() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(ALL_PHONES_PAGE_INDICATOR)) != null;
    }

    public boolean isAtLeastOneDeviceListed() {
        return driver.findElements(DEVICE_LIST).size() > 0;
    }

    public void clickDevice(String deviceName) {
        By deviceSelector = By.xpath("//div[@data-testid='device-list']//div[contains(text(), '" + deviceName + "')]");
        wait.until(ExpectedConditions.elementToBeClickable(deviceSelector)).click();
    }
}
