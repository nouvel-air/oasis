const dataModels = {
  Person: {
    types: ['pair:Person'],
    list: {
      servers: '@default'
    },
    fieldsMapping: {
      title: 'pair:label'
    }
  },
  Page: {
    types: ['semapps:Page'],
    list: {
      servers: '@default'
    },
    fieldsMapping: {
      title: 'semapps:title'
    }
  },
  Place: {
    types: ['pair:Place'],
    create: {
      container: {
        oasis: '/places'
      }
    },
    list: {
      containers: {
        oasis: ['/places']
      },
      filter: {
        'cdlt:hasPublicationStatus': 'https://data.lescheminsdelatransition.org/publication-status/valide'
      },
      explicitEmbedOnFraming: false, // Increase performance since explicit embed is not necessary
    },
    fieldsMapping: {
      title: 'pair:label'
    }
  },
  Region: {
    types: ['pair:Place'],
    list: {
      containers: {
        oasis: ['/regions']
      }
    },
    fieldsMapping: {
      title: 'pair:label'
    }
  },
  Service: {
    types: ['cdlt:HostingService'],
    list: {
      servers: '@default'
    },
  },
  Status: {
    types: ['cdlt:PublicationStatus'],
    list: {
      servers: ['cdlt']
    }
  },
  Type: {
    types: ['cdlt:ServiceType', 'pair:PersonType'],
    list: {
      servers: '@default'
    },
    fieldsMapping: {
      title: 'pair:label'
    }
  }
}

export default dataModels;