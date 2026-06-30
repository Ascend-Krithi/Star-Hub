module.exports = {
  urls: {
    login: 'https://workday.example.com/login',
    dashboard: 'https://workday.example.com/dashboard',
    createJournalEntry: 'https://workday.example.com/finance/journal-entry/create'
  },

  urlPatterns: {
    loginSuccess: /\/dashboard/,
    loginPage: /\/login/,
    journalEntry: /\/finance\/journal-entry/
  },

  pageTitles: {
    login: /Login.*Workday/i,
    dashboard: /Dashboard.*Workday/i,
    journalEntry: /Journal Entry.*Workday/i
  },

  credentials: {
    validUser: {
      username: process.env.WORKDAY_USERNAME || 'valid.user@example.com',
      password: process.env.WORKDAY_PASSWORD || 'ValidPassword123!'
    },
    invalidUser: {
      username: 'invalid.user@example.com',
      password: 'WrongPassword123!'
    }
  },

  statuses: {
    draft: 'Draft',
    posted: 'Posted',
    reversed: 'Reversed',
    pending: 'Pending Approval'
  },

  errors: {
    invalidCredentials: 'Invalid username or password',
    requiredField: 'This field is required',
    sessionExpired: 'Your session has expired. Please log in again.'
  },

  glAccounts: {
    revenue: '4000',
    expense: '5000',
    asset: '1000'
  },

  costCentres: {
    it: 'CC-IT-001',
    finance: 'CC-FIN-001',
    hr: 'CC-HR-001'
  },

  journalEntry: {
    description: 'Test Journal Entry',
    amount: '1000.00',
    currency: 'USD'
  },

  downstream: {
    apiBase: 'https://api.workday.example.com/v1'
  }
};