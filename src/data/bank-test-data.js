const testData = {
  urls: {
    bankHome: 'https://bank-website.com',
    personalLoans: 'https://bank-website.com/personal-loans'
  },
  urlPatterns: {
    personalLoans: /\/personal-loans/,
    flexibleLoan: /\/flexible-personal-loan/,
    login: /\/login|sign-in/,
    signup: /\/signup|register|sign-up/
  },
  menuItems: {
    loans: 'Loans',
    personalLoans: 'Personal Loans'
  },
  loanProducts: {
    flexiblePersonalLoan: 'Flexible Personal Loan'
  },
  defaultLoanConfig: {
    tenure: '36',
    tenureDisplay: '36 months',
    frequency: 'Monthly',
    frequencyDisplay: 'Monthly'
  },
  authPopup: {
    message: 'Please log in or create an account to continue with your application',
    loginButtonText: 'Log in to Online Banking',
    signupButtonText: "Don't have an account? Sign up here"
  },
  pageTitles: {
    personalLoans: /Personal Loans/i,
    flexibleLoan: /Flexible Personal Loan/i
  }
};

module.exports = testData;