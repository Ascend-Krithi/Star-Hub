module.exports = {
  urls: {
    login: process.env.WORKDAY_LOGIN_URL || 'https://workday.example.com/login',
    home: process.env.WORKDAY_HOME_URL || 'https://workday.example.com/home',
    createJournalEntry: process.env.WORKDAY_JOURNAL_URL || 'https://workday.example.com/journal/create'
  },
  urlPatterns: {
    login: /\/login/,
    home: /\/home|dashboard/,
    journalEntry: /\/journal/
  },
  credentials: {
    validUser: process.env.WORKDAY_USERNAME || 'test.user@example.com',
    validPassword: process.env.WORKDAY_PASSWORD || 'SecurePassword123!',
    invalidUser: 'invalid.user@example.com',
    invalidPassword: 'WrongPassword123!'
  },
  pageTitles: {
    login: /Login|Sign In|Workday/i,
    home: /Home|Dashboard|Workday/i,
    journalEntry: /Journal Entry|Create Journal/i
  },
  statuses: {
    draft: 'Draft',
    posted: 'Posted',
    reversed: 'Reversed',
    pending: 'Pending Approval'
  },
  errors: {
    invalidCredentials: 'Invalid username or password',
    accountLocked: 'Your account has been locked',
    sessionExpired: 'Your session has expired',
    requiredField: 'This field is required'
  },
  glAccounts: {
    revenue: '4000-001',
    expense: '5000-001',
    asset: '1000-001'
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
    apiBaseUrl: process.env.DOWNSTREAM_API_URL || 'https://api.example.com'
  }
};