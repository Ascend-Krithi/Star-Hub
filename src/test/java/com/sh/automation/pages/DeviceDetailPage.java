package com.sh.automation.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

public class DeviceDetailPage {
    private WebDriver driver;
    private By deviceTitle = By.cssSelector("[data-testid=device-title]" /* LOCATOR_TO_UPDATE - verify in browser */);
    private By colourSelector = By.cssSelector("[data-testid=colour-selector]" /* LOCATOR_TO_UPDATE - verify in browser */);
    private By storageSelector = By.cssSelector("[data-testid=storage-selector]" /* LOCATOR_TO_UPDATE - verify in browser */);
    private By paymentOptionSelector = By.cssSelector("[data-testid=payment-option-selector]" /* LOCATOR_TO_UPDATE - verify in browser */);
    private By nextButton = By.cssSelector("[data-testid=next-button]" /* LOCATOR_TO_UPDATE - verify in browser */);
    private By errorMessage = By.cssSelector("[data-testid=error-message]" /* LOCATOR_TO_UPDATE - verify in browser */);

    public DeviceDetailPage(WebDriver driver) {
        this.driver = driver;
    }

    public void selectDevice(String deviceName) {
        // Navigate to device detail page
        driver.findElement(By.xpath(String.format("//span[contains(text(),'%s')]", deviceName))).click();
    }

    public WebElement getDeviceTitle() {
        return driver.findElement(deviceTitle);
    }

    public boolean isDeviceDetailPageDisplayed() {
        return getDeviceTitle().isDisplayed();
    }

    public boolean areDeviceDetailsVisible() {
        return getDeviceTitle().isDisplayed() && driver.findElement(colourSelector).isDisplayed() && driver.findElement(storageSelector).isDisplayed() && driver.findElement(paymentOptionSelector).isDisplayed();
    }

    public String getSelectedColour() {
        return driver.findElement(colourSelector).getText();
    }

    public String getSelectedStorage() {
        return driver.findElement(storageSelector).getText();
    }

    public String getSelectedPaymentOption() {
        return driver.findElement(paymentOptionSelector).getText();
    }

    public void changeColour(String colour) {
        driver.findElement(By.xpath(String.format("//button[contains(@data-testid,'colour-%s')]", colour))).click();
    }

    public void changeStorage(String storage) {
        driver.findElement(By.xpath(String.format("//button[contains(@data-testid,'storage-%s')]", storage))).click();
    }

    public void selectColour(String colour) {
        changeColour(colour);
    }

    public void selectStorage(String storage) {
        changeStorage(storage);
    }

    public void selectPaymentOption(String paymentOption) {
        driver.findElement(By.xpath(String.format("//button[contains(@data-testid,'payment-%s')]", paymentOption))).click();
    }

    public WebElement getNextButton() {
        return driver.findElement(nextButton);
    }

    public void clickNextButton() {
        getNextButton().click();
    }

    public void deselectStorage() {
        // Custom logic to deselect storage
        driver.findElement(storageSelector).click();
    }

    public boolean isErrorMessageDisplayed() {
        return driver.findElement(errorMessage).isDisplayed();
    }
}
