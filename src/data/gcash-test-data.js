module.exports = {
  urls: {
    gcashApp: 'gcash://app/launch',
    loginScreen: 'gcash://app/login',
    homeScreen: 'gcash://app/home',
    profileTab: 'gcash://app/profile',
    qrCodeGeneration: 'gcash://app/profile/generate-qr',
    sendMoney: 'gcash://app/send-money'
  },
  urlPatterns: {
    loginScreen: /login/,
    homeScreen: /home/,
    profileScreen: /profile/,
    qrCodeScreen: /generate-qr/,
    sendMoneyScreen: /send-money/
  },
  credentials: {
    recipient: {
      mobile: '+639171234567',
      password: 'Test@123'
    },
    sender: {
      mobile: '+639187654321',
      password: 'Sender@123'
    }
  },
  amounts: {
    noAmount: '',
    preset500: '₱500',
    preset5000: '₱5,000',
    preset75000: '₱75,000',
    limit2000: '₱2,000',
    limit50000: '₱50,000',
    balance1000: '₱1,000',
    balance500: '₱500'
  },
  accountTypes: {
    basic: 'Basic',
    fullyVerified: 'Fully Verified'
  },
  limits: {
    basicRemaining: '₱2,000',
    fullyVerifiedRemaining: '₱50,000'
  },
  qrCodeData: {
    validRecipientMobile: '+639171234567',
    validSenderMobile: '+639187654321',
    expirationHours: 24,
    expiredQRAge: '25 hours ago'
  },
  errors: {
    qrExpired: 'QR expired',
    qrExpiredAlt: 'This QR code has expired',
    unableToReadQR: 'Unable to read QR code',
    qrScanFailed: 'QR code scan failed',
    limitExceeded: 'Amount exceeds your transaction limit',
    invalidAmount: 'Invalid amount entered'
  },
  messages: {
    requestNewQR: 'Request New QR Code',
    enterManually: 'Enter Mobile Number Manually',
    transactionSuccess: 'Transaction successful',
    adjustAmount: 'Adjust amount within your limit'
  },
  pageTitles: {
    login: /GCash.*Login/i,
    home: /GCash.*Home/i,
    profile: /Profile/i,
    qrGeneration: /Generate QR Code/i,
    sendMoney: /Send Money/i
  },
  suggestedAmounts: {
    basic: ['₱500', '₱1,000', '₱1,500', '₱2,000'],
    fullyVerified: ['₱10,000', '₱25,000', '₱40,000', '₱50,000']
  }
};