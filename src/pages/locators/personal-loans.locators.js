const locators = {
  pageHeading: (page) => page.locator('[data-testid="personal-loans-heading"], h1:has-text("Personal Loans"), .page-title:has-text("Personal Loans")').first(),
  loanProductsList: (page) => page.locator('[data-testid="loan-products-list"], .loan-products, [role="list"]').first(),
  flexiblePersonalLoan: (page) => page.locator('[data-testid="flexible-personal-loan"], a:has-text("Flexible Personal Loan"), .loan-product:has-text("Flexible Personal Loan")').first(),
  loanProductItems: (page) => page.locator('[data-testid="loan-product-item"], .loan-product-item, [role="listitem"]'),
  loanProductName: (page) => page.locator('[data-testid="loan-product-name"], .loan-name, .product-title'),
  loanProductDescription: (page) => page.locator('[data-testid="loan-product-description"], .loan-description, .product-description')
};

module.exports = locators;