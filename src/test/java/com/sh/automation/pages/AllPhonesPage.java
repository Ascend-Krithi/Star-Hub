package com.sh.automation.pages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.By;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class AllPhonesPage {
    private WebDriver driver;
    private WebDriverWait wait;

    public AllPhonesPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, 15);
    }

    public boolean isLoaded() {
        By allPhonesHeader = By.cssSelector("[data-testid=all-phones-header]"); // LOCATOR_TO_UPDATE — verify in browser
        return wait.until(ExpectedConditions.visibilityOfElementLocated(allPhonesHeader)).isDisplayed();
    }
}
