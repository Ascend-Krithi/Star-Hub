const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../../pages/dealer-app/login-page');
const { DashboardPage } = require('../../../pages/dealer-app/dashboard-page');
const testData = require('../../../data/dealer-app-test-data');

test.describe('AD-79 TS-001 - Valid Dealer Login Tests', () => {
  let loginPage;
  let dashboardPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    await loginPage.navigate();
  });

  test('TC-001: Valid dealer login and access to dashboard and services', async ({ page }) => {
    // Step 1-2: Launch app and verify login screen
    await expect(page).toHaveURL(/dealerapp/);
    await expect(loginPage.emailField).toBeVisible();
    await expect(loginPage.passwordField).toBeVisible();

    // Step 3: Enter valid email
    await loginPage.enterEmail(testData.validCredentials.email);
    await expect(loginPage.emailField).toHaveValue(testData.validCredentials.email);

    // Step 4: Enter valid password
    await loginPage.enterPassword(testData.validCredentials.password);
    await expect(loginPage.passwordField).toHaveAttribute('type', 'password');

    // Step 5: Click login button
    await loginPage.clickLogin();

    // Step 6: Verify dashboard access and services
    await expect(page).toHaveURL(/dashboard/);
    await expect(dashboardPage.servicesSection).toBeVisible();
    await expect(dashboardPage.managementOptions).toBeVisible();
  });

  test('TC-002: Invalid email with valid password during dealer login', async ({ page }) => {
    // Step 1: Launch app
    await expect(page).toHaveURL(/dealerapp/);

    // Step 2: Enter invalid email
    await loginPage.enterEmail(testData.invalidCredentials.email);

    // Step 3: Enter valid password
    await loginPage.enterPassword(testData.validCredentials.password);

    // Step 4: Click login and verify error
    await loginPage.clickLogin();
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('invalid credentials');
    await expect(page).toHaveURL(/login/);
  });

  test('TC-003: Valid email with invalid password during dealer login', async ({ page }) => {
    // Step 1: Launch app
    await expect(page).toHaveURL(/dealerapp/);

    // Step 2: Enter valid email
    await loginPage.enterEmail(testData.validCredentials.email);

    // Step 3: Enter invalid password
    await loginPage.enterPassword(testData.invalidCredentials.password);

    // Step 4: Click login and verify error
    await loginPage.clickLogin();
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('invalid credentials');
    await expect(page).toHaveURL(/login/);
  });
});