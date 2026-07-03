const helpdeskTestData = {
  urls: {
    application: 'https://helpdesk.example.com',
    dashboard: 'https://helpdesk.example.com/dashboard'
  },

  credentials: {
    manager: {
      username: 'manager@helpdesk.com',
      password: 'Manager@123'
    }
  },

  ticketStatus: {
    new: { count: 5, label: 'New' },
    ongoing: { count: 10, label: 'On-going' },
    reject: { count: 2, label: 'Reject' },
    closed: { count: 15, label: 'Closed' },
    totalStatuses: 32
  },

  ticketCategories: {
    inquiry: { count: 20, label: 'Inquiry' },
    request: { count: 15, label: 'Request' },
    dispute: { count: 8, label: 'Dispute' },
    nuisance: { count: 3, label: 'Nuisance' },
    invalid: { count: 2, label: 'Invalid' },
    totalCategories: 48
  },

  backlog: {
    count: 25
  },

  resolutionTrends: {
    period: 'Last 7 days'
  },

  slaMetrics: {
    sla1Day: {
      total: 30,
      withinSLA: 25,
      breached: 5,
      compliance: '83.33%'
    },
    sla2Day: {
      total: 20,
      withinSLA: 18,
      breached: 2,
      compliance: '90%'
    },
    sla3Day: {
      total: 10,
      withinSLA: 10,
      breached: 0,
      compliance: '100%'
    },
    sla5Day: {
      total: 5,
      withinSLA: 5,
      breached: 0,
      compliance: '100%'
    },
    totalSLATickets: 65
  },

  filters: {
    categories: ['Inquiry', 'Request', 'Dispute', 'Nuisance', 'Invalid'],
    statuses: ['New', 'On-going', 'Reject', 'Closed']
  },

  messages: {
    noTickets: 'No tickets found matching the selected filters',
    connectionLost: 'Connection lost',
    unableToSync: 'Unable to sync data',
    displayingCached: 'Displaying cached data'
  },

  performance: {
    highVolumeTickets: 1500,
    expectedLoadTime: 5000,
    expectedFilterTime: 3000
  }
};

module.exports = helpdeskTestData;