const TD = {
  urls: {
    home: process.env.BANK_URL || 'https://www.bank-website.com',
    loans: process.env.BANK_URL ? `${process.env.BANK_URL}/loans` : 'https://www.bank-website.com/loans',
    personalLoans: process.env.BANK_URL ? `${process.env.BANK_URL}/loans/personal` : 'https://www.bank-website.com/loans/personal',
    flexiblePersonalLoan: process.env.BANK_URL ? `${process.env.BANK_URL}/loans/personal/flexible` : 'https://www.bank-website.com/loans/personal/flexible'
  },
  urlPatterns: {
    home: /bank-website\.com\/?$/,
    loans: /\/loans/,
    personalLoans: /\/loans\/personal/,
    flexiblePersonalLoan: /\/loans\/personal\/flexible/
  },
  loanDefaults: {
    tenure: '36 months',
    repaymentFrequency: 'Monthly'
  },
  authMessages: {
    loginRequired: 'Please log in or create an account to continue with your application'
  },
  buttons: {
    applyNow: 'Apply Now',
    loginToOnlineBanking: 'Log in to Online Banking',
    signUpHere: "Don't have an account? Sign up here"
  },
  pageTitles: {
    home: /bank/i,
    loans: /loans/i,
    personalLoans: /personal loans/i,
    flexiblePersonalLoan: /flexible personal loan/i
  }
};

module.exports = TD;