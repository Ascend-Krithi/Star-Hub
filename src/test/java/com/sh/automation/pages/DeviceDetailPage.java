package com.sh.automation.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class DeviceDetailPage {
    private WebDriver driver;
    private WebDriverWait wait;
    private static final By DEVICE_DETAIL_PAGE_INDICATOR = By.cssSelector("[data-testid=device-detail-page-indicator]"); // LOCATOR_TO_UPDATE
    private static final By COLOUR_SELECTOR = By.cssSelector("[data-testid=colour-selector]"); // LOCATOR_TO_UPDATE
    private static final By STORAGE_SELECTOR = By.cssSelector("[data-testid=storage-selector]"); // LOCATOR_TO_UPDATE
    private static final By PAYMENT_SELECTOR = By.cssSelector("[data-testid=payment-selector]"); // LOCATOR_TO_UPDATE

    public DeviceDetailPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, java.time.Duration.ofSeconds(20));
    }

    public boolean isLoaded() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(DEVICE_DETAIL_PAGE_INDICATOR)) != null;
    }

    public void selectColour(String colour) {
        By colourOption = By.xpath("//div[@data-testid='colour-selector']//button[contains(text(), '" + colour + "')]");
        wait.until(ExpectedConditions.elementToBeClickable(colourOption)).click();
    }

    public void selectStorage(String storage) {
        By storageOption = By.xpath("//div[@data-testid='storage-selector']//button[contains(text(), '" + storage + "')]");
        wait.until(ExpectedConditions.elementToBeClickable(storageOption)).click();
    }

    public void selectPayment(String payment) {
        By paymentOption = By.xpath("//div[@data-testid='payment-selector']//button[contains(text(), '" + payment + "')]");
        wait.until(ExpectedConditions.elementToBeClickable(paymentOption)).click();
    }
}
