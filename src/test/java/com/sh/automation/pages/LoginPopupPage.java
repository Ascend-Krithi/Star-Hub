package com.sh.automation.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;

public class LoginPopupPage {
    private WebDriver driver;
    private WebDriverWait wait;
    private static final By POPUP = By.cssSelector("[data-testid=login-popup]"); // LOCATOR_TO_UPDATE
    private static final By POPUP_MSG = By.cssSelector("[data-testid=login-popup-message]"); // LOCATOR_TO_UPDATE

    public LoginPopupPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }

    public boolean isPopupDisplayed() {
        try {
            return wait.until(ExpectedConditions.visibilityOfElementLocated(POPUP)).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }

    public String getPopupMessageText() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(POPUP_MSG)).getText();
    }
}
