package com.sh.automation.pages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.By;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.support.ui.ExpectedConditions;

public class DeviceDetailPage {
    private WebDriver driver;
    private WebDriverWait wait;

    public DeviceDetailPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, 15);
    }

    public boolean isDetailVisible() {
        return wait.until(ExpectedConditions.presenceOfElementLocated(By.cssSelector("[data-testid=DEVICE_DETAIL]"))) != null; // LOCATOR_TO_UPDATE — verify in browser
    }
}
