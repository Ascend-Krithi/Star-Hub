package com.sh.automation.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

public class HomePage {
    private WebDriver driver;
    private By shopMenu = By.cssSelector("[data-testid=shop-menu]" /* LOCATOR_TO_UPDATE - verify in browser */);
    private By mobileDevicesMenu = By.cssSelector("[data-testid=mobile-devices-menu]" /* LOCATOR_TO_UPDATE - verify in browser */);

    public HomePage(WebDriver driver) {
        this.driver = driver;
    }

    public WebElement getShopMenu() {
        return driver.findElement(shopMenu);
    }

    public void clickShopMenu() {
        getShopMenu().click();
    }

    public WebElement getMobileDevicesMenu() {
        return driver.findElement(mobileDevicesMenu);
    }

    public void clickMobileDevicesMenu() {
        getMobileDevicesMenu().click();
    }
}
