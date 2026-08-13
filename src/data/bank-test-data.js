module.exports = {
  urls: {
    homePage: 'https://bank-website.com',
    loansPage: 'https://bank-website.com/loans',
    personalLoansPage: 'https://bank-website.com/loans/personal-loans',
    flexiblePersonalLoanPage: 'https://bank-website.com/loans/personal-loans/flexible-personal-loan',
  },

  urlPatterns: {
    homePage: /\/$/,
    loansPage: /\/loans$/,
    personalLoansPage: /\/loans\/personal-loans$/,
    flexiblePersonalLoanPage: /\/loans\/personal-loans\/flexible-personal-loan$/,
  },

  loanConfiguration: {
    defaultLoanAmount: '',
    defaultLoanTenure: '36 months',
    defaultRepaymentFrequency: 'Monthly',
  },

  authenticationMessages: {
    popupMessage: 'Please log in or create an account to continue with your application',
  },

  buttons: {
    applyNow: 'Apply Now',
    loginToOnlineBanking: 'Log in to Online Banking',
    signUpHere: "Don't have an account? Sign up here",
  },

  pageTitles: {
    flexiblePersonalLoan: /Flexible Personal Loan/i,
  },
};