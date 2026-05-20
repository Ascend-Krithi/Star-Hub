package com.sh.automation.pages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.By;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.support.ui.ExpectedConditions;

public class AllPhonesPage {
    private WebDriver driver;
    private WebDriverWait wait;

    public AllPhonesPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, 15);
    }

    public boolean isLoaded() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid=all-phones-page]"))); // LOCATOR_TO_UPDATE
    }

    public boolean isAnyDeviceListed() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid=device-list]"))).isDisplayed(); // LOCATOR_TO_UPDATE
    }

    public boolean isDeviceVisible(String deviceName) {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//div[contains(text(),'" + deviceName + "')]"))).isDisplayed();
    }

    public void clickDevice(String deviceName) {
        wait.until(ExpectedConditions.elementToBeClickable(By.xpath("//div[contains(text(),'" + deviceName + "')]"))).click();
    }

    public boolean isDeviceClickable(String deviceName) {
        try {
            wait.until(ExpectedConditions.elementToBeClickable(By.xpath("//div[contains(text(),'" + deviceName + "')]")));
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
