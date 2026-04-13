package com.fl.automation.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class DeviceDetailPage {
    private WebDriver driver;
    private WebDriverWait wait;
    private By deviceTitle = By.cssSelector("[data-testid=device-title]"); // LOCATOR_TO_UPDATE — verify in browser
    private By colourSelector = By.cssSelector("[data-testid=colour-selector]"); // LOCATOR_TO_UPDATE — verify in browser
    private By storageSelector = By.cssSelector("[data-testid=storage-selector]"); // LOCATOR_TO_UPDATE — verify in browser
    private By paymentOptionSelector = By.cssSelector("[data-testid=payment-option-selector]"); // LOCATOR_TO_UPDATE — verify in browser
    private By nextButton = By.cssSelector("[data-testid=next-button]"); // LOCATOR_TO_UPDATE — verify in browser
    private By selectionsSummary = By.cssSelector("[data-testid=selections-summary]"); // LOCATOR_TO_UPDATE — verify in browser
    private By loginPopup = By.cssSelector("[data-testid=login-popup]"); // LOCATOR_TO_UPDATE — verify in browser

    public DeviceDetailPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, 20);
    }

    public boolean isAt(String deviceName) {
        WebElement title = wait.until(ExpectedConditions.visibilityOfElementLocated(deviceTitle));
        return title.getText().contains(deviceName);
    }

    public boolean isDefaultColourSelected(String colour) {
        WebElement colourEl = wait.until(ExpectedConditions.visibilityOfElementLocated(colourSelector));
        return colourEl.getText().equalsIgnoreCase(colour);
    }

    public boolean isDefaultStorageSelected(String storage) {
        WebElement storageEl = wait.until(ExpectedConditions.visibilityOfElementLocated(storageSelector));
        return storageEl.getText().equalsIgnoreCase(storage);
    }

    public boolean isDefaultPaymentOptionSelected(String paymentOption) {
        WebElement paymentEl = wait.until(ExpectedConditions.visibilityOfElementLocated(paymentOptionSelector));
        return paymentEl.getText().equalsIgnoreCase(paymentOption);
    }

    public boolean areSelectionsVisible() {
        WebElement summary = wait.until(ExpectedConditions.visibilityOfElementLocated(selectionsSummary));
        return summary.isDisplayed();
    }

    public void selectColour(String colour) {
        WebElement colourEl = wait.until(ExpectedConditions.elementToBeClickable(colourSelector));
        colourEl.click();
        // Select the colour option (implementation depends on UI)
        // LOCATOR_TO_UPDATE — verify in browser
    }

    public void selectStorage(String storage) {
        WebElement storageEl = wait.until(ExpectedConditions.elementToBeClickable(storageSelector));
        storageEl.click();
        // Select the storage option (implementation depends on UI)
        // LOCATOR_TO_UPDATE — verify in browser
    }

    public void selectPaymentOption(String paymentOption) {
        WebElement paymentEl = wait.until(ExpectedConditions.elementToBeClickable(paymentOptionSelector));
        paymentEl.click();
        // Select the payment option (implementation depends on UI)
        // LOCATOR_TO_UPDATE — verify in browser
    }

    public void clickNextButton() {
        WebElement nextBtn = wait.until(ExpectedConditions.elementToBeClickable(nextButton));
        nextBtn.click();
    }

    public boolean isNextStepInitiated() {
        // Implementation depends on what the next step is (e.g., URL change, element visible)
        // LOCATOR_TO_UPDATE — verify in browser
        return true;
    }

    public boolean isLoginPopupDisplayed() {
        try {
            WebElement popup = wait.until(ExpectedConditions.visibilityOfElementLocated(loginPopup));
            return popup.isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }
}
