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
        this.wait = new WebDriverWait(driver, 15);
    }

    public boolean isLoaded() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid=device-detail-page]"))); // LOCATOR_TO_UPDATE
    }

    public String getSelectedColour() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid=selected-colour]"))).getText(); // LOCATOR_TO_UPDATE
    }

    public String getSelectedStorage() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid=selected-storage]"))).getText(); // LOCATOR_TO_UPDATE
    }

    public String getSelectedPaymentOption() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid=selected-payment-option]"))).getText(); // LOCATOR_TO_UPDATE
    }

    public void selectColour(String colour) {
        wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("[data-testid=colour-option][data-value='" + colour + "']"))).click(); // LOCATOR_TO_UPDATE
    }

    public void selectStorage(String storage) {
        wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("[data-testid=storage-option][data-value='" + storage + "']"))).click(); // LOCATOR_TO_UPDATE
    }

    public void selectPayment(String paymentOption) {
        wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("[data-testid=payment-option][data-value='" + paymentOption + "']"))).click(); // LOCATOR_TO_UPDATE
    }

    public void clickNextButton() {
        wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("[data-testid=next-button]"))).click(); // LOCATOR_TO_UPDATE
    }

    public boolean isNextStepLoaded() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid=next-step-page]"))).isDisplayed(); // LOCATOR_TO_UPDATE
    }

    public boolean isNextButtonEnabled() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid=next-button]"))).isEnabled(); // LOCATOR_TO_UPDATE
    }
}
