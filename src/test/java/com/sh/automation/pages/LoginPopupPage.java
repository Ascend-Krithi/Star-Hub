package com.sh.automation.pages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.By;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.support.ui.ExpectedConditions;

public class LoginPopupPage {
    private WebDriver driver;
    private WebDriverWait wait;
    private static final By POPUP = By.cssSelector("[data-testid=login-popup]" /* LOCATOR_TO_UPDATE - verify in browser */);
    private static final By POPUP_MSG = By.cssSelector("[data-testid=login-popup-message]" /* LOCATOR_TO_UPDATE - verify in browser */);

    public LoginPopupPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, 15);
    }

    public boolean isPopupDisplayed() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(POPUP)) != null;
    }

    public String getPopupMessageText() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(POPUP_MSG)).getText();
    }
}
