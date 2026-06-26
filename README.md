# Dealer App Automation - Playwright Test Suite

## Overview
This repository contains automated test scripts for the Dealer App login functionality using Playwright framework.

## Test Coverage
- **AD-79 TS-001**: Valid and invalid dealer login scenarios
- **AD-79 TS-002**: First-time dealer login with welcome message
- **AD-79 TS-003**: Contact details masking verification
- **AD-79 TS-004**: Tips display on first login
- **AD-79 TS-005**: Acknowledgement checkbox functionality
- **AD-79 TS-006**: Identity verification flow
- **AD-79 TS-007**: Role and group-based access control
- **AD-79 TS-008**: Session timeout behavior
- **AD-79 TS-009**: Logout and security event handling
- **AD-79 TS-010**: Multi-device login consistency

## Project Structure
```
├── tests/
│   └── dealer-app/
│       └── login/
│           ├── valid-dealer-login.spec.js
│           ├── first-time-login.spec.js
│           ├── contact-details-masking.spec.js
│           ├── tips-display.spec.js
│           ├── acknowledgement-checkbox.spec.js
│           ├── identity-verification.spec.js
│           ├── role-based-access.spec.js
│           ├── session-timeout.spec.js
│           ├── logout-behavior.spec.js
│           └── multi-device-login.spec.js
├── pages/
│   └── dealer-app/
│       ├── login-page.js
│       ├── first-login-page.js
│       ├── dashboard-page.js
│       └── identity-verification-page.js
├── data/
│   └── dealer-app-test-data.js
├── playwright.config.js
├── package.json
└── README.md
```

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Install Playwright browsers:
```bash
npx playwright install
```

## Running Tests

### Run all tests
```bash
npm test
```

### Run tests in headed mode
```bash
npm run test:headed
```

### Run tests in debug mode
```bash
npm run test:debug
```

### Run tests with UI mode
```bash
npm run test:ui
```

### Run specific test suite
```bash
npm run test:login
```

### Run tests on specific browser
```bash
npm run test:chrome
npm run test:firefox
npm run test:webkit
```

### Run mobile tests
```bash
npm run test:mobile
```

## Test Reports

After test execution, view the HTML report:
```bash
npm run test:report
```

Reports are generated in:
- HTML: `playwright-report/index.html`
- JSON: `test-results/results.json`
- JUnit: `test-results/junit.xml`

## Configuration

### Base URL
Update the base URL in `playwright.config.js`:
```javascript
use: {
  baseURL: 'https://dealerapp.example.com',
}
```

### Test Data
Update test credentials and data in `data/dealer-app-test-data.js`

### Locators
Update page locators in respective page object files under `pages/dealer-app/`

## Page Object Model

The framework follows Page Object Model (POM) design pattern:
- **LoginPage**: Handles login page interactions
- **FirstLoginPage**: Manages first-time login flow
- **DashboardPage**: Dashboard operations and navigation
- **IdentityVerificationPage**: Identity verification process

## Test Data Management

All test data is centralized in `data/dealer-app-test-data.js` including:
- URLs
- Credentials (valid/invalid)
- Business profile data
- Contact details
- Expected messages

## Browser Support

- Chromium (Desktop)
- Firefox (Desktop)
- WebKit (Desktop)
- Mobile Chrome (Pixel 5)
- Mobile Safari (iPhone 12)
- Tablet (iPad Pro)

## CI/CD Integration

The configuration supports CI/CD with:
- Automatic retries on failure (2 retries in CI)
- Parallel execution control
- Multiple report formats
- Screenshot and video capture on failure

## Best Practices

1. **Locator Strategy**: Uses multiple fallback selectors (data-testid, id, class, text)
2. **Wait Strategy**: Implements explicit waits and network idle states
3. **Error Handling**: Captures screenshots and videos on failure
4. **Reusability**: Page objects promote code reuse
5. **Maintainability**: Centralized test data and configuration

## Troubleshooting

### Tests failing due to locators
- Update locators in page object files to match actual application selectors
- Use Playwright Inspector to identify correct selectors:
```bash
npx playwright codegen https://dealerapp.example.com
```

### Timeout issues
- Increase timeout values in `playwright.config.js`
- Check network conditions and application performance

### Authentication issues
- Verify credentials in `dealer-app-test-data.js`
- Check if test environment is accessible

## Contributing

1. Create feature branch
2. Add/update tests
3. Ensure all tests pass
4. Submit pull request

## License
ISC

## Contact
Automation Engineer Team
