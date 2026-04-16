package com.sh.automation.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;

public class LoginPopupPage {
    private WebDriver driver;
    private WebDriverWait wait;
    private static final By POPUP = By.cssSelector("[data-testid=login-popup]"); // LOCATOR_TO_UPDATE — verify in browser
    private static final By POPUP_MSG = By.cssSelector("[data-testid=login-popup-message]"); // LOCATOR_TO_UPDATE — verify in browser
    private static final By LOGIN_WITH_HUB_ID_BUTTON = By.cssSelector("[data-testid=login-with-hubid]"); // LOCATOR_TO_UPDATE — verify in browser
    private static final By SIGN_UP_BUTTON = By.cssSelector("[data-testid=signup-here]"); // LOCATOR_TO_UPDATE — verify in browser

    public LoginPopupPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(15));
    }

    public boolean isPopupDisplayed() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(POPUP)).isDisplayed();
    }

    public String getPopupMessageText() {
        WebElement popupMsg = wait.until(ExpectedConditions.visibilityOfElementLocated(POPUP_MSG));
        return popupMsg.getText();
    }

    public boolean isLoginWithHubIdButtonDisplayed() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(LOGIN_WITH_HUB_ID_BUTTON)).isDisplayed();
    }

    public boolean isSignUpButtonDisplayed() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(SIGN_UP_BUTTON)).isDisplayed();
    }
}
