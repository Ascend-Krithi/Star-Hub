package com.fl.automation.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class DeviceDetailPage {
    private WebDriver driver;
    private WebDriverWait wait;

    public DeviceDetailPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, 20);
    }

    public boolean isPageLoaded() {
        WebElement detailHeader = wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid=device-detail-header]"))); // LOCATOR_TO_UPDATE
        return detailHeader.isDisplayed();
    }

    public boolean isDeviceNameVisible(String deviceName) {
        WebElement nameElement = wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid=device-name]"))); // LOCATOR_TO_UPDATE
        return nameElement.getText().contains(deviceName);
    }

    public boolean isDeviceImageVisible(String deviceName) {
        WebElement imageElement = wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid=device-image]"))); // LOCATOR_TO_UPDATE
        return imageElement.isDisplayed();
    }

    public String getSelectedColour() {
        WebElement colourElement = wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid=selected-colour]"))); // LOCATOR_TO_UPDATE
        return colourElement.getText();
    }

    public String getSelectedStorage() {
        WebElement storageElement = wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid=selected-storage]"))); // LOCATOR_TO_UPDATE
        return storageElement.getText();
    }

    public String getSelectedPayment() {
        WebElement paymentElement = wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid=selected-payment]"))); // LOCATOR_TO_UPDATE
        return paymentElement.getText();
    }

    public boolean isColourSelectorVisible() {
        WebElement colourSelector = wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid=colour-selector]"))); // LOCATOR_TO_UPDATE
        return colourSelector.isDisplayed();
    }

    public boolean isStorageSelectorVisible() {
        WebElement storageSelector = wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid=storage-selector]"))); // LOCATOR_TO_UPDATE
        return storageSelector.isDisplayed();
    }

    public boolean isPaymentSelectorVisible() {
        WebElement paymentSelector = wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid=payment-selector]"))); // LOCATOR_TO_UPDATE
        return paymentSelector.isDisplayed();
    }

    public boolean isColourSelectorEnabled() {
        WebElement colourSelector = wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("[data-testid=colour-selector]"))); // LOCATOR_TO_UPDATE
        return colourSelector.isEnabled();
    }

    public boolean isStorageSelectorEnabled() {
        WebElement storageSelector = wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("[data-testid=storage-selector]"))); // LOCATOR_TO_UPDATE
        return storageSelector.isEnabled();
    }

    public boolean isPaymentSelectorEnabled() {
        WebElement paymentSelector = wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("[data-testid=payment-selector]"))); // LOCATOR_TO_UPDATE
        return paymentSelector.isEnabled();
    }

    public boolean isDefaultConfigurationSelected() {
        return getSelectedColour().equals("Black") && getSelectedStorage().equals("256GB") && getSelectedPayment().equals("24-month installment");
    }

    public void selectConfiguration(String colour, String storage, String payment) {
        // Select colour
        WebElement colourSelector = wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("[data-testid=colour-selector]"))); // LOCATOR_TO_UPDATE
        colourSelector.click();
        WebElement colourOption = wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("[data-testid=colour-option-" + colour + "]"))); // LOCATOR_TO_UPDATE
        colourOption.click();
        // Select storage
        WebElement storageSelector = wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("[data-testid=storage-selector]"))); // LOCATOR_TO_UPDATE
        storageSelector.click();
        WebElement storageOption = wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("[data-testid=storage-option-" + storage + "]"))); // LOCATOR_TO_UPDATE
        storageOption.click();
        // Select payment
        WebElement paymentSelector = wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("[data-testid=payment-selector]"))); // LOCATOR_TO_UPDATE
        paymentSelector.click();
        WebElement paymentOption = wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("[data-testid=payment-option-" + payment + "]"))); // LOCATOR_TO_UPDATE
        paymentOption.click();
    }

    public void clickNextButton() {
        WebElement nextButton = wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("[data-testid=next-button]"))); // LOCATOR_TO_UPDATE
        nextButton.click();
    }

    public boolean isNextStepInitiated() {
        WebElement nextStepIndicator = wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid=next-step-indicator]"))); // LOCATOR_TO_UPDATE
        return nextStepIndicator.isDisplayed();
    }

    public boolean areSelectionsVisible() {
        WebElement selections = wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid=selected-options]"))); // LOCATOR_TO_UPDATE
        return selections.isDisplayed();
    }
}
