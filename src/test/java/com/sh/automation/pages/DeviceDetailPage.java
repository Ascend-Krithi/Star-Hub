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
    private static final By DEVICE_DETAIL_PAGE_INDICATOR = By.cssSelector("[data-testid=device-detail-page]"); // LOCATOR_TO_UPDATE — verify in browser
    private static final By COLOUR_SELECTOR = By.cssSelector("[data-testid=colour-selector]"); // LOCATOR_TO_UPDATE — verify in browser
    private static final By STORAGE_SELECTOR = By.cssSelector("[data-testid=storage-selector]"); // LOCATOR_TO_UPDATE — verify in browser
    private static final By PAYMENT_SELECTOR = By.cssSelector("[data-testid=payment-selector]"); // LOCATOR_TO_UPDATE — verify in browser
    private static final By NEXT_BUTTON = By.cssSelector("[data-testid=next-button]"); // LOCATOR_TO_UPDATE — verify in browser

    public DeviceDetailPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(15));
    }

    public boolean isLoaded() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(DEVICE_DETAIL_PAGE_INDICATOR)).isDisplayed();
    }

    public String getSelectedColour() {
        WebElement colour = wait.until(ExpectedConditions.visibilityOfElementLocated(COLOUR_SELECTOR));
        return colour.getAttribute("data-selected-colour");
    }

    public String getSelectedStorage() {
        WebElement storage = wait.until(ExpectedConditions.visibilityOfElementLocated(STORAGE_SELECTOR));
        return storage.getAttribute("data-selected-storage");
    }

    public String getSelectedPaymentOption() {
        WebElement payment = wait.until(ExpectedConditions.visibilityOfElementLocated(PAYMENT_SELECTOR));
        return payment.getAttribute("data-selected-payment");
    }

    public boolean isColourVisible(String colour) {
        WebElement colourElement = wait.until(ExpectedConditions.visibilityOfElementLocated(COLOUR_SELECTOR));
        return colourElement.getText().contains(colour);
    }

    public boolean isStorageVisible(String storage) {
        WebElement storageElement = wait.until(ExpectedConditions.visibilityOfElementLocated(STORAGE_SELECTOR));
        return storageElement.getText().contains(storage);
    }

    public boolean isPaymentOptionVisible(String payment) {
        WebElement paymentElement = wait.until(ExpectedConditions.visibilityOfElementLocated(PAYMENT_SELECTOR));
        return paymentElement.getText().contains(payment);
    }

    public void selectColour(String colour) {
        WebElement colourElement = wait.until(ExpectedConditions.elementToBeClickable(COLOUR_SELECTOR));
        colourElement.click(); // Implement selection logic as per UI
    }

    public void selectStorage(String storage) {
        WebElement storageElement = wait.until(ExpectedConditions.elementToBeClickable(STORAGE_SELECTOR));
        storageElement.click(); // Implement selection logic as per UI
    }

    public void selectPayment(String payment) {
        WebElement paymentElement = wait.until(ExpectedConditions.elementToBeClickable(PAYMENT_SELECTOR));
        paymentElement.click(); // Implement selection logic as per UI
    }

    public void clickNext() {
        WebElement nextButton = wait.until(ExpectedConditions.elementToBeClickable(NEXT_BUTTON));
        nextButton.click();
    }

    public boolean isNextStepInitiated() {
        // Implement logic to verify next step (e.g., URL change, new page loaded)
        return true; // Placeholder, update with actual verification
    }
}
