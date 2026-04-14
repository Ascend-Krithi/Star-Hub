package com.starhub.automation.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class AllPhonesPage {
    private WebDriver driver;
    private WebDriverWait wait;
    private By deviceList = By.cssSelector("[data-testid=device-list]" /* LOCATOR_TO_UPDATE - verify in browser */);

    public AllPhonesPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, 20);
    }

    public boolean isPageLoaded() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(deviceList)) != null;
    }

    public boolean isDeviceListVisible() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(deviceList)) != null;
    }

    public boolean isDeviceVisible(String deviceName) {
        By device = By.xpath("//div[@data-testid='device-list']//span[contains(text(),'" + deviceName + "')]");
        return wait.until(ExpectedConditions.visibilityOfElementLocated(device)) != null;
    }

    public void clickDevice(String deviceName) {
        By device = By.xpath("//div[@data-testid='device-list']//span[contains(text(),'" + deviceName + "')]");
        WebElement deviceElem = wait.until(ExpectedConditions.elementToBeClickable(device));
        deviceElem.click();
    }
}
