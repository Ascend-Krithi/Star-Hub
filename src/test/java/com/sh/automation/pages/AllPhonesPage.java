package com.sh.automation.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class AllPhonesPage {
    private WebDriver driver;
    private WebDriverWait wait;
    private By deviceList = By.cssSelector("[data-testid=device-list]"); // LOCATOR_TO_UPDATE — verify in browser
    private By allPhonesPageHeader = By.cssSelector("[data-testid=all-phones-header]"); // LOCATOR_TO_UPDATE — verify in browser

    public AllPhonesPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, 20);
    }

    public void navigateTo() {
        // Assumes navigation is handled by HomePage
    }

    public boolean isDeviceListDisplayed() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(deviceList)).isDisplayed();
    }

    public boolean isAllPhonesPageLoaded() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(allPhonesPageHeader)).isDisplayed();
    }

    public void selectDeviceByName(String deviceName) {
        By deviceCard = By.xpath("//div[contains(@data-testid,'device-card') and .//*[contains(text(),'" + deviceName + "')]]"); // LOCATOR_TO_UPDATE — verify in browser
        wait.until(ExpectedConditions.elementToBeClickable(deviceCard)).click();
    }

    public void searchDeviceByName(String deviceName) {
        // Implement search if available, else scroll/find
    }

    public boolean isDeviceVisibleInList(String deviceName) {
        By deviceCard = By.xpath("//div[contains(@data-testid,'device-card') and .//*[contains(text(),'" + deviceName + "')]]"); // LOCATOR_TO_UPDATE — verify in browser
        return wait.until(ExpectedConditions.visibilityOfElementLocated(deviceCard)).isDisplayed();
    }
}
