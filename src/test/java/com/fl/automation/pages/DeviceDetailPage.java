package com.fl.automation.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class DeviceDetailPage {
    private WebDriver driver;
    private WebDriverWait wait;
    private By deviceTitle = By.cssSelector("[data-testid=device-title]"); // LOCATOR_TO_UPDATE
    private By deviceImage = By.cssSelector("[data-testid=device-image]"); // LOCATOR_TO_UPDATE
    private By colourOption = By.cssSelector("[data-testid=colour-option]"); // LOCATOR_TO_UPDATE
    private By storageOption = By.cssSelector("[data-testid=storage-option]"); // LOCATOR_TO_UPDATE
    private By paymentOption = By.cssSelector("[data-testid=payment-option]"); // LOCATOR_TO_UPDATE
    private By nextButton = By.cssSelector("[data-testid=next-button]"); // LOCATOR_TO_UPDATE
    private By loginPopup = By.cssSelector("[data-testid=login-popup]"); // LOCATOR_TO_UPDATE

    public DeviceDetailPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, 20);
    }

    public boolean isAt(String deviceName) {
        return wait.until(ExpectedConditions.textToBePresentInElementLocated(deviceTitle, deviceName));
    }

    public String getDeviceName() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(deviceTitle)).getText();
    }

    public boolean isDeviceImageDisplayed() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(deviceImage)).isDisplayed();
    }

    public String getSelectedColour() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(colourOption)).getText();
    }

    public String getSelectedStorage() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(storageOption)).getText();
    }

    public String getSelectedPaymentOption() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(paymentOption)).getText();
    }

    public boolean isColourOptionVisibleAndSelectable() {
        WebElement colour = wait.until(ExpectedConditions.visibilityOfElementLocated(colourOption));
        return colour.isDisplayed() && colour.isEnabled();
    }

    public boolean isStorageOptionVisibleAndSelectable() {
        WebElement storage = wait.until(ExpectedConditions.visibilityOfElementLocated(storageOption));
        return storage.isDisplayed() && storage.isEnabled();
    }

    public boolean isPaymentOptionVisibleAndSelectable() {
        WebElement payment = wait.until(ExpectedConditions.visibilityOfElementLocated(paymentOption));
        return payment.isDisplayed() && payment.isEnabled();
    }

    public boolean isDefaultConfigurationSelected() {
        return getSelectedColour().equalsIgnoreCase("Black") && getSelectedStorage().contains("256") && getSelectedPaymentOption().contains("24-month");
    }

    public void selectConfiguration(String colour, String storage, String payment) {
        // LOCATOR_TO_UPDATE: Implement selection logic for configuration
    }

    public void clickNextButton() {
        WebElement nextBtn = wait.until(ExpectedConditions.elementToBeClickable(nextButton));
        nextBtn.click();
    }

    public boolean isNextStepInitiated() {
        // LOCATOR_TO_UPDATE: Implement logic to verify next step
        return true;
    }

    public boolean isLoginPopupDisplayed() {
        try {
            return wait.until(ExpectedConditions.visibilityOfElementLocated(loginPopup)).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }

    public boolean areAllOptionsVisible() {
        return isColourOptionVisibleAndSelectable() && isStorageOptionVisibleAndSelectable() && isPaymentOptionVisibleAndSelectable();
    }
}
