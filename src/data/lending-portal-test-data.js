/**
 * Test Data Module — Lending Portal
 * All hardcoded assertion values, URLs, and test data for Lending Portal tests
 */

module.exports = {
  urls: {
    lendingPortal: 'https://lendingportal.example.com',
    adminPortal: 'https://adminportal.example.com'
  },

  urlPatterns: {
    lendingPortalLogin: /lendingportal\.example\.com/,
    lendingPortalDashboard: /lendingportal\.example\.com\/dashboard/,
    bookingsReport: /lendingportal\.example\.com\/reports\/bookings/,
    adminPortalLogin: /adminportal\.example\.com/,
    adminPortalDashboard: /adminportal\.example\.com\/dashboard/,
    reportLists: /adminportal\.example\.com\/reports\/lists/
  },

  credentials: {
    admin: {
      username: 'admin@uniondigital.com',
      password: 'Admin@123'
    }
  },

  filters: {
    dateFrom: '01/01/2024',
    dateTo: '12/31/2024',
    status: 'Confirmed',
    loanType: 'SSS LoanLite'
  },

  exportFormats: {
    csv: 'CSV',
    xlsx: 'XLSX'
  },

  reportTypes: {
    bookings: 'Bookings'
  },

  expectedMessages: {
    loginSuccess: 'Admin user is successfully logged in and dashboard is displayed',
    reportGenerated: 'Bookings report displays summary view with aggregated data',
    exportSuccess: 'CSV file is downloaded successfully'
  },

  summaryMetrics: [
    'Total Bookings',
    'Total Amount',
    'Confirmed Bookings',
    'Pending Bookings'
  ],

  transactionColumns: [
    'Booking ID',
    'Customer Name',
    'Loan Type',
    'Booking Date',
    'Amount',
    'Status'
  ],

  auditTrailFields: {
    reportType: 'Bookings',
    action: 'Export',
    format: 'CSV',
    operatorId: 'admin@uniondigital.com'
  }
};