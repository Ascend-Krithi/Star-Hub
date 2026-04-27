package com.starhub.automation.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

public class AllPhonesPage {
    private WebDriver driver;

    public AllPhonesPage(WebDriver driver) {
        this.driver = driver;
    }

    public void navigateToDeviceListing() {
        WebElement deviceListing = driver.findElement(By.cssSelector("[data-testid=device-listing]")); // LOCATOR_TO_UPDATE — verify in browser
        deviceListing.click();
    }

    public WebElement getDeviceListElement() {
        return driver.findElement(By.cssSelector("[data-testid=device-list]")); // LOCATOR_TO_UPDATE — verify in browser
    }

    public boolean isDeviceListVisible() {
        return getDeviceListElement().isDisplayed();
    }

    public boolean areDeviceImagesNamesPricesVisible() {
        WebElement deviceImages = driver.findElement(By.cssSelector("[data-testid=device-image]")); // LOCATOR_TO_UPDATE — verify in browser
        WebElement deviceNames = driver.findElement(By.cssSelector("[data-testid=device-name]")); // LOCATOR_TO_UPDATE — verify in browser
        WebElement devicePrices = driver.findElement(By.cssSelector("[data-testid=device-price]")); // LOCATOR_TO_UPDATE — verify in browser
        return deviceImages.isDisplayed() && deviceNames.isDisplayed() && devicePrices.isDisplayed();
    }

    public boolean isDeviceVisible(String deviceName) {
        WebElement device = driver.findElement(By.xpath("//div[contains(text(),'" + deviceName + "')]"));
        return device.isDisplayed();
    }

    public void clickDevice(String deviceName) {
        WebElement device = driver.findElement(By.xpath("//div[contains(text(),'" + deviceName + "')]"));
        device.click();
    }
}
