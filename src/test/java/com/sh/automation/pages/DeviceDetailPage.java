package com.sh.automation.pages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.By;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.support.ui.ExpectedConditions;

public class DeviceDetailPage {
    private WebDriver driver;
    private WebDriverWait wait;

    public DeviceDetailPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, 10);
    }

    public boolean isLoaded() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid=device-detail-banner]"))); // LOCATOR_TO_UPDATE
    }

    public boolean isColourSelected(String colour) {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//span[contains(text(),'" + colour + "') and @class='selected']"))).isDisplayed();
    }

    public boolean isStorageSelected(String storage) {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//span[contains(text(),'" + storage + "') and @class='selected']"))).isDisplayed();
    }

    public boolean isPaymentSelected(String paymentOption) {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//span[contains(text(),'" + paymentOption + "') and @class='selected']"))).isDisplayed();
    }

    public void selectColour(String colour) {
        wait.until(ExpectedConditions.elementToBeClickable(By.xpath("//span[contains(text(),'" + colour + "')]"))).click();
    }

    public void selectStorage(String storage) {
        wait.until(ExpectedConditions.elementToBeClickable(By.xpath("//span[contains(text(),'" + storage + "')]"))).click();
    }

    public void selectPayment(String paymentOption) {
        wait.until(ExpectedConditions.elementToBeClickable(By.xpath("//span[contains(text(),'" + paymentOption + "')]"))).click();
    }

    public void clickNextButton() {
        wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("[data-testid=next-button]"))).click(); // LOCATOR_TO_UPDATE
    }

    public boolean isNextStepLoaded() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid=next-step-banner]"))).isDisplayed(); // LOCATOR_TO_UPDATE
    }

    public boolean isNextButtonEnabled() {
        return wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("[data-testid=next-button]"))).isEnabled(); // LOCATOR_TO_UPDATE
    }

    public void clearSelections() {
        // Placeholder for clearing selections
        // LOCATOR_TO_UPDATE
    }

    public void deselectStorage() {
        // Placeholder for deselecting storage
        // LOCATOR_TO_UPDATE
    }

    public boolean isErrorMessageDisplayed() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid=error-message]"))).isDisplayed(); // LOCATOR_TO_UPDATE
    }
}
