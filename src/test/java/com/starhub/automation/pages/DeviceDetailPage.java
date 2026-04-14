package com.starhub.automation.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class DeviceDetailPage {
    private WebDriver driver;
    private WebDriverWait wait;
    private By colourSelector = By.cssSelector("[data-testid=colour-selector]" /* LOCATOR_TO_UPDATE - verify in browser */);
    private By storageSelector = By.cssSelector("[data-testid=storage-selector]" /* LOCATOR_TO_UPDATE - verify in browser */);
    private By paymentOptionSelector = By.cssSelector("[data-testid=payment-option-selector]" /* LOCATOR_TO_UPDATE - verify in browser */);
    private By nextButton = By.cssSelector("[data-testid=next-button]" /* LOCATOR_TO_UPDATE - verify in browser */);
    private By selectionsSummary = By.cssSelector("[data-testid=selections-summary]" /* LOCATOR_TO_UPDATE - verify in browser */);

    public DeviceDetailPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, 20);
    }

    public boolean isPageLoaded(String deviceName) {
        By deviceTitle = By.xpath("//h1[contains(text(),'" + deviceName + "')]");
        return wait.until(ExpectedConditions.visibilityOfElementLocated(deviceTitle)) != null;
    }

    public boolean isDefaultColourSelected(String colour) {
        By selectedColour = By.xpath("//div[@data-testid='colour-selector']//span[contains(@class,'selected') and text()='" + colour + "']");
        return wait.until(ExpectedConditions.visibilityOfElementLocated(selectedColour)) != null;
    }

    public boolean isDefaultStorageSelected(String storage) {
        By selectedStorage = By.xpath("//div[@data-testid='storage-selector']//span[contains(@class,'selected') and text()='" + storage + "']");
        return wait.until(ExpectedConditions.visibilityOfElementLocated(selectedStorage)) != null;
    }

    public boolean isDefaultPaymentOptionSelected(String paymentOption) {
        By selectedPayment = By.xpath("//div[@data-testid='payment-option-selector']//span[contains(@class,'selected') and text()='" + paymentOption + "']");
        return wait.until(ExpectedConditions.visibilityOfElementLocated(selectedPayment)) != null;
    }

    public boolean areSelectionsVisible() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(selectionsSummary)) != null;
    }

    public void selectColour(String colour) {
        By colourOption = By.xpath("//div[@data-testid='colour-selector']//span[text()='" + colour + "']");
        WebElement colourElem = wait.until(ExpectedConditions.elementToBeClickable(colourOption));
        colourElem.click();
    }

    public void selectStorage(String storage) {
        By storageOption = By.xpath("//div[@data-testid='storage-selector']//span[text()='" + storage + "']");
        WebElement storageElem = wait.until(ExpectedConditions.elementToBeClickable(storageOption));
        storageElem.click();
    }

    public void selectPaymentOption(String paymentOption) {
        By paymentElem = By.xpath("//div[@data-testid='payment-option-selector']//span[text()='" + paymentOption + "']");
        WebElement paymentOptionElem = wait.until(ExpectedConditions.elementToBeClickable(paymentElem));
        paymentOptionElem.click();
    }

    public boolean isConfigurationSelected(String colour, String storage, String paymentOption) {
        return isDefaultColourSelected(colour) && isDefaultStorageSelected(storage) && isDefaultPaymentOptionSelected(paymentOption);
    }

    public void clickNextButton() {
        WebElement nextBtn = wait.until(ExpectedConditions.elementToBeClickable(nextButton));
        nextBtn.click();
    }

    public boolean isNextStepInitiated() {
        // Placeholder for next step check
        return wait.until(ExpectedConditions.urlContains("purchase"));
    }
}
