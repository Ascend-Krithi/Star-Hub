module.exports = {
  urls: {
    lendingPortal: 'https://lendingportal.example.com',
    adminPortal: 'https://adminportal.example.com'
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
    status: {
      confirmed: 'Confirmed',
      completed: 'Completed',
      approved: 'Approved',
      cancelled: 'Cancelled'
    },
    loanType: {
      sssLoanLite: 'SSS LoanLite',
      udQuickLoans: 'UD Quick Loans',
      udCashLoans: 'UD Cash Loans'
    }
  },
  exportFormats: {
    csv: 'CSV',
    xlsx: 'XLSX',
    zip: 'ZIP'
  },
  reportTypes: {
    bookings: 'Bookings',
    paymentTransactions: 'Consolidated Payment Transactions',
    loanApplications: 'Loan Applications',
    loanDisbursement: 'Loan Disbursement',
    loanDocuments: 'Loan Documents',
    loanCancellation: 'Loan Cancellation'
  },
  validationMessages: {
    invalidDateRange: 'Date From cannot be greater than Date To',
    noDataAvailable: 'No data available for the selected date range',
    noRecordsFound: 'No records found'
  },
  summaryMetrics: {
    totalBookings: 'Total Bookings',
    totalAmount: 'Total Amount',
    confirmedBookings: 'Confirmed Bookings',
    pendingBookings: 'Pending Bookings'
  },
  transactionColumns: {
    bookingId: 'Booking ID',
    customerName: 'Customer Name',
    loanType: 'Loan Type',
    bookingDate: 'Booking Date',
    amount: 'Amount',
    status: 'Status',
    transactionId: 'Transaction ID',
    loanId: 'Loan ID',
    paymentDate: 'Payment Date',
    paymentMethod: 'Payment Method',
    applicationId: 'Application ID',
    applicationDate: 'Application Date',
    disbursementId: 'Disbursement ID',
    disbursementDate: 'Disbursement Date',
    documentId: 'Document ID',
    documentType: 'Document Type',
    uploadDate: 'Upload Date',
    fileName: 'File Name',
    cancellationId: 'Cancellation ID',
    cancellationDate: 'Cancellation Date',
    reason: 'Reason',
    refundAmount: 'Refund Amount'
  },
  auditTrailFields: {
    reportType: 'Report Type',
    action: 'Export',
    format: 'Format',
    operatorId: 'Operator ID',
    timestamp: 'Timestamp'
  },
  testData: {
    customerName: 'John Doe'
  },
  invalidFilters: {
    dateFrom: '12/31/2024',
    dateTo: '01/01/2024',
    futureDateFrom: '01/01/2030',
    futureDateTo: '12/31/2030'
  }
};