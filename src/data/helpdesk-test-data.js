const helpdeskTestData = {
  urls: {
    base: 'https://helpdesk.example.com',
    login: 'https://helpdesk.example.com',
    dashboard: 'https://helpdesk.example.com/dashboard'
  },

  credentials: {
    manager: {
      username: 'manager@helpdesk.com',
      password: 'Manager@123'
    }
  },

  ticketStatuses: {
    new: 'New',
    ongoing: 'On-going',
    reject: 'Reject',
    closed: 'Closed'
  },

  ticketCategories: {
    inquiry: 'Inquiry',
    request: 'Request',
    dispute: 'Dispute',
    nuisance: 'Nuisance',
    invalid: 'Invalid'
  },

  expectedCounts: {
    TS001: {
      new: '5',
      ongoing: '10',
      reject: '2',
      closed: '15',
      total: 32
    },
    TS002: {
      inquiry: '20',
      request: '15',
      dispute: '8',
      nuisance: '3',
      invalid: '2',
      backlog: '25',
      total: 48
    },
    TS003: {
      requestFiltered: '15'
    },
    TS004: {
      ongoingFiltered: '10'
    },
    TS005: {
      sla1Day: { total: '30', withinSLA: '25', breached: '5' },
      sla2Day: { total: '20', withinSLA: '18', breached: '2' },
      sla3Day: { total: '10', withinSLA: '10', breached: '0' },
      sla5Day: { total: '5', withinSLA: '5', breached: '0' },
      totalSLATracked: 65
    },
    TS008: {
      highVolume: 1500
    }
  },

  slaCompliance: {
    oneDay: '83.33%',
    twoDay: '90%',
    threeDay: '100%',
    fiveDay: '100%'
  },

  messages: {
    noTicketsFound: 'No tickets found',
    connectionLost: 'Connection lost',
    syncFailure: 'Unable to sync data',
    cachedData: 'Displaying cached data'
  },

  performance: {
    maxLoadTime: 5000,
    maxFilterTime: 3000
  },

  timePeriods: {
    last7Days: 'Last 7 days'
  }
};

module.exports = helpdeskTestData;