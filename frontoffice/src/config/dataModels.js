import { STATUS_PUBLISHED } from '../constants';

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
        'cdlt:hasPublicationStatus': STATUS_PUBLISHED,
        // Only show places which have at least one hosting service
        sparqlWhere: [
          {
            type: 'filter',
            expression: {
              type: 'operation',
              operator: 'exists',
              args: [
                {
                  type: 'bgp',
                  triples: [
                    {
                      subject: {
                        termType: 'Variable',
                        value: 's1'
                      },
                      predicate: {
                        termType: 'NamedNode',
                        value: 'http://virtual-assembly.org/ontologies/cdlt#hasServiceType'
                      },
                      object: {
                        termType: 'Variable',
                        value: 'service'
                      }
                    }
                  ]
                }
              ]
            }
          }
        ]
      },
      explicitEmbedOnFraming: false // Increase performance since explicit embed is not necessary
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
      servers: '@default',
      filter: {
        type: 'cdlt:HostingService'
      }
    }
  },
  OfferAndNeed: {
    types: ['cdlt:OfferAndNeed', 'pair:Event'],
    list: {
      servers: '@default',
      filter: {
        'cdlt:hasPublicationStatus': STATUS_PUBLISHED
      }
    }
  },
  Status: {
    types: ['cdlt:PublicationStatus'],
    list: {
      servers: '@default'
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
};

export default dataModels;
