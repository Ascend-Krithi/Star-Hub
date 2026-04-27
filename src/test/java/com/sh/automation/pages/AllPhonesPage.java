package com.sh.automation.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import java.util.List;

public class AllPhonesPage {
    private WebDriver driver;
    private By deviceList = By.cssSelector("[data-testid=device-list]" /* LOCATOR_TO_UPDATE - verify in browser */);
    private By deviceNameTemplate = By.xpath("//div[contains(@class,'device-card')]//span[contains(text(),'%s')]" /* LOCATOR_TO_UPDATE - verify in browser */);

    public AllPhonesPage(WebDriver driver) {
        this.driver = driver;
    }

    public WebElement getDeviceList() {
        return driver.findElement(deviceList);
    }

    public boolean isDeviceListVisible() {
        return getDeviceList().isDisplayed();
    }

    public boolean isDeviceVisible(String deviceName) {
        List<WebElement> devices = driver.findElements(By.xpath(String.format("//span[contains(text(),'%s')]", deviceName)));
        return !devices.isEmpty();
    }

    public void clickDevice(String deviceName) {
        WebElement device = driver.findElement(By.xpath(String.format("//span[contains(text(),'%s')]", deviceName)));
        device.click();
    }
}
