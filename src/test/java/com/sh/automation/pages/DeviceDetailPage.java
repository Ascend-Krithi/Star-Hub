package com.sh.automation.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;

public class DeviceDetailPage {
    private WebDriver driver;
    private WebDriverWait wait;
    private static final By PAGE_HEADER = By.cssSelector("[data-testid=device-detail-header]"); // LOCATOR_TO_UPDATE
    private static final By COLOUR_SELECTOR = By.cssSelector("[data-testid=colour-selector]"); // LOCATOR_TO_UPDATE
    private static final By STORAGE_SELECTOR = By.cssSelector("[data-testid=storage-selector]"); // LOCATOR_TO_UPDATE
    private static final By PAYMENT_SELECTOR = By.cssSelector("[data-testid=payment-selector]"); // LOCATOR_TO_UPDATE
    private static final By NEXT_BUTTON = By.cssSelector("[data-testid=next-button]"); // LOCATOR_TO_UPDATE
    private static final By SELECTED_COLOUR = By.cssSelector("[data-testid=selected-colour]"); // LOCATOR_TO_UPDATE
    private static final By SELECTED_STORAGE = By.cssSelector("[data-testid=selected-storage]"); // LOCATOR_TO_UPDATE
    private static final By SELECTED_PAYMENT = By.cssSelector("[data-testid=selected-payment]"); // LOCATOR_TO_UPDATE
    private static final By SELECTIONS_VISIBLE = By.cssSelector("[data-testid=selections-visible]"); // LOCATOR_TO_UPDATE
    private static final By LOGIN_POPUP = By.cssSelector("[data-testid=login-popup]"); // LOCATOR_TO_UPDATE
    private static final By NEXT_STEP_INDICATOR = By.cssSelector("[data-testid=next-step-indicator]"); // LOCATOR_TO_UPDATE

    public DeviceDetailPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(15));
    }

    public boolean isLoaded() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(PAGE_HEADER)).isDisplayed();
    }

    public void selectColour(String colour) {
        WebElement colourSelector = wait.until(ExpectedConditions.elementToBeClickable(COLOUR_SELECTOR));
        colourSelector.click();
        // Select the colour option (implementation depends on UI)
        // LOCATOR_TO_UPDATE: select colour option
    }

    public void selectStorage(String storage) {
        WebElement storageSelector = wait.until(ExpectedConditions.elementToBeClickable(STORAGE_SELECTOR));
        storageSelector.click();
        // Select the storage option (implementation depends on UI)
        // LOCATOR_TO_UPDATE: select storage option
    }

    public void selectPayment(String payment) {
        WebElement paymentSelector = wait.until(ExpectedConditions.elementToBeClickable(PAYMENT_SELECTOR));
        paymentSelector.click();
        // Select the payment option (implementation depends on UI)
        // LOCATOR_TO_UPDATE: select payment option
    }

    public void clickNext() {
        WebElement nextBtn = wait.until(ExpectedConditions.elementToBeClickable(NEXT_BUTTON));
        nextBtn.click();
    }

    public String getSelectedColour() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(SELECTED_COLOUR)).getText();
    }

    public String getSelectedStorage() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(SELECTED_STORAGE)).getText();
    }

    public String getSelectedPaymentOption() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(SELECTED_PAYMENT)).getText();
    }

    public boolean areSelectionsVisible() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(SELECTIONS_VISIBLE)).isDisplayed();
    }

    public boolean isNextStepInitiated() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(NEXT_STEP_INDICATOR)).isDisplayed();
    }

    public boolean isLoginPopupDisplayed() {
        return !driver.findElements(LOGIN_POPUP).isEmpty() && driver.findElement(LOGIN_POPUP).isDisplayed();
    }
}
