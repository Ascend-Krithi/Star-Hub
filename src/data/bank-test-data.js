const bankTestData = {
  urls: {
    homepage: 'https://bank-website.com',
    personalLoans: 'https://bank-website.com/personal-loans',
    flexiblePersonalLoan: 'https://bank-website.com/personal-loans/flexible-personal-loan'
  },
  
  urlPatterns: {
    homepage: /bank-website\.com\/?$/,
    personalLoans: /personal-loans/,
    flexiblePersonalLoan: /flexible-personal-loan/
  },
  
  menuItems: {
    loans: 'Loans',
    personalLoans: 'Personal Loans'
  },
  
  loanProducts: {
    flexiblePersonalLoan: 'Flexible Personal Loan'
  },
  
  defaultLoanConfig: {
    tenure: '36 months',
    frequency: 'Monthly'
  },
  
  authPopup: {
    message: 'Please log in or create an account to continue with your application',
    loginButtonText: 'Log in to Online Banking',
    signUpButtonText: "Don't have an account? Sign up here"
  },
  
  pageTitles: {
    homepage: /Bank.*Home/i,
    personalLoans: /Personal Loans/i
  }
};

module.exports = bankTestData;