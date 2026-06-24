const testData = {
  urls: {
    gcashApp: 'gcash://app',
    loginScreen: 'gcash://app/login',
    dashboard: 'gcash://app/dashboard',
    sendMoney: 'gcash://app/send-money',
    expressSend: 'gcash://app/express-send'
  },
  
  credentials: {
    fullyVerifiedUser500: {
      username: 'testuser500@gcash.com',
      password: 'TestPass123!',
      mpin: '123456',
      balance: 500
    },
    fullyVerifiedUser1000: {
      username: 'testuser1000@gcash.com',
      password: 'TestPass123!',
      mpin: '123456',
      balance: 1000
    },
    fullyVerifiedUser200: {
      username: 'testuser200@gcash.com',
      password: 'TestPass123!',
      mpin: '123456',
      balance: 200
    },
    fullyVerifiedUser50: {
      username: 'testuser50@gcash.com',
      password: 'TestPass123!',
      mpin: '123456',
      balance: 50
    },
    fullyVerifiedUser30: {
      username: 'testuser30@gcash.com',
      password: 'TestPass123!',
      mpin: '123456',
      balance: 30
    },
    fullyVerifiedUser20: {
      username: 'testuser20@gcash.com',
      password: 'TestPass123!',
      mpin: '123456',
      balance: 20
    },
    fullyVerifiedUser600: {
      username: 'testuser600@gcash.com',
      password: 'TestPass123!',
      mpin: '123456',
      balance: 600
    },
    fullyVerifiedUser400: {
      username: 'testuser400@gcash.com',
      password: 'TestPass123!',
      mpin: '123456',
      balance: 400
    }
  },
  
  recipients: {
    validMobile: '09171234567',
    suspendedAccount: '09187654321',
    frozenAccount: '09191112222'
  },
  
  amounts: {
    amount100: '100',
    amount150: '150',
    amount200: '200',
    amount250: '250',
    amount300: '300',
    amount400: '400',
    amount500: '500'
  },
  
  messages: {
    successMessage: 'Transaction successful',
    networkTimeoutFailure: 'Transaction failed due to network timeout',
    insufficientBalance: 'Insufficient wallet balance',
    suspendedAccountError: 'Recipient account is suspended',
    frozenAccountError: 'Recipient account is frozen'
  },
  
  retryIntervals: {
    firstRetry: 2,
    secondRetry: 4,
    thirdRetry: 8
  },
  
  cashInOptions: {
    bankTransfer: 'Bank Transfer',
    overTheCounter: 'Over the Counter',
    onlineBanking: 'Online Banking'
  }
};

module.exports = testData;