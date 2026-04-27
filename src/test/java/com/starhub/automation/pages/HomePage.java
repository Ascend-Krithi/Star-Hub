package com.starhub.automation.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

public class HomePage {
    private WebDriver driver;

    public HomePage(WebDriver driver) {
        this.driver = driver;
    }

    public boolean isHomePageDisplayed() {
        return driver.getTitle().contains("StarHub");
    }

    public void clickShopMenu() {
        WebElement shopMenu = driver.findElement(By.cssSelector("[data-testid=shop-menu]")); // LOCATOR_TO_UPDATE — verify in browser
        shopMenu.click();
    }

    public boolean isShopMenuExpanded() {
        WebElement expandedMenu = driver.findElement(By.cssSelector("[data-testid=shop-menu-expanded]")); // LOCATOR_TO_UPDATE — verify in browser
        return expandedMenu.isDisplayed();
    }

    public void selectMobileDevicesCategory() {
        WebElement mobileDevices = driver.findElement(By.cssSelector("[data-testid=mobile-devices-category]")); // LOCATOR_TO_UPDATE — verify in browser
        mobileDevices.click();
    }
}
