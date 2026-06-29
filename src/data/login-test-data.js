const testData = {
  urls: {
    loginPage: 'https://application-url/login',
    dashboardPage: 'https://application-url/dashboard'
  },
  urlPatterns: {
    loginPage: /\/login$/,
    dashboardPage: /\/dashboard$/
  },
  pageTitles: {
    loginPage: /Login/i,
    dashboardPage: /Dashboard/i
  },
  credentials: {
    validUser: {
      username: 'validuser@example.com',
      password: 'ValidPassword123!'
    },
    invalidUser: {
      username: 'invaliduser@example.com',
      password: 'WrongPassword123!'
    }
  },
  messages: {
    welcomeMessage: 'Welcome',
    loginSuccess: 'Login successful',
    invalidCredentials: 'Invalid username or password'
  },
  errors: {
    emptyUsername: 'Username is required',
    emptyPassword: 'Password is required',
    invalidCredentials: 'Invalid username or password',
    accountLocked: 'Account has been locked'
  }
};

module.exports = testData;