const testData = {
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
    status: 'Confirmed',
    loanType: 'SSS LoanLite'
  },
  
  reportTypes: {
    bookings: 'Bookings'
  },
  
  exportFormats: {
    csv: 'CSV',
    xlsx: 'XLSX'
  },
  
  auditTrail: {
    action: 'Export',
    operatorId: 'admin@uniondigital.com'
  },
  
  expectedMetrics: {
    totalBookings: 'Total Bookings',
    totalAmount: 'Total Amount',
    confirmedBookings: 'Confirmed Bookings',
    pendingBookings: 'Pending Bookings'
  },
  
  expectedColumns: {
    bookingId: 'Booking ID',
    customerName: 'Customer Name',
    loanType: 'Loan Type',
    bookingDate: 'Booking Date',
    amount: 'Amount',
    status: 'Status'
  },
  
  fileNamePattern: /Bookings_Report_\d{8}_\d{6}\.csv/
};

module.exports = testData;