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

    public boolean isDeviceListVisible() {
        return wait.until(ExpectedConditions.presenceOfElementLocated(By.cssSelector("[data-testid=DEVICE_LIST]"))) != null; // LOCATOR_TO_UPDATE — verify in browser
    }
}
