package com.starhub.tests.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class DeviceDetailPage {
    private WebDriver driver;
    private WebDriverWait wait;
    private static final By DEVICE_DETAIL_PAGE_INDICATOR = By.cssSelector("[data-testid=device-detail-page-indicator]"); // LOCATOR_TO_UPDATE

    public DeviceDetailPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, java.time.Duration.ofSeconds(15));
    }

    public boolean isLoaded() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(DEVICE_DETAIL_PAGE_INDICATOR)) != null;
    }

    public void selectColour(String colour) {
        WebElement colourSelector = wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("[data-testid=colour-selector]"))); // LOCATOR_TO_UPDATE
        colourSelector.click();
        WebElement colourOption = wait.until(ExpectedConditions.elementToBeClickable(By.xpath("//div[@data-testid='colour-option' and text()='" + colour + "']"))); // LOCATOR_TO_UPDATE
        colourOption.click();
    }

    public void selectStorage(String storage) {
        WebElement storageSelector = wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("[data-testid=storage-selector]"))); // LOCATOR_TO_UPDATE
        storageSelector.click();
        WebElement storageOption = wait.until(ExpectedConditions.elementToBeClickable(By.xpath("//div[@data-testid='storage-option' and text()='" + storage + "']"))); // LOCATOR_TO_UPDATE
        storageOption.click();
    }

    public void selectPayment(String paymentOption) {
        WebElement paymentSelector = wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("[data-testid=payment-selector]"))); // LOCATOR_TO_UPDATE
        paymentSelector.click();
        WebElement paymentOptionElement = wait.until(ExpectedConditions.elementToBeClickable(By.xpath("//div[@data-testid='payment-option' and text()='" + paymentOption + "']"))); // LOCATOR_TO_UPDATE
        paymentOptionElement.click();
    }
}
