package com.sh.automation.pages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.By;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class HomePage {
    private WebDriver driver;
    private WebDriverWait wait;

    public HomePage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, 15);
    }

    public boolean isLoaded() {
        By homeHeader = By.cssSelector("[data-testid=homepage-header]"); // LOCATOR_TO_UPDATE — verify in browser
        return wait.until(ExpectedConditions.visibilityOfElementLocated(homeHeader)).isDisplayed();
    }
}
