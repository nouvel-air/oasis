import urlJoin from 'url-join';

export const TYPE_ANNONCE_AGENDA = urlJoin(process.env.REACT_APP_MIDDLEWARE_URL, 'types', 'agenda');
export const TYPE_ANNONCE_EMPLOI = urlJoin(process.env.REACT_APP_MIDDLEWARE_URL, 'types', 'emploi-benevolat');
export const TYPE_ANNONCE_IMMOBILIER = urlJoin(process.env.REACT_APP_MIDDLEWARE_URL, 'types', 'immobilier');

export const TYPE_ADMIN = urlJoin(process.env.REACT_APP_MIDDLEWARE_URL, 'types', 'admin');
export const TYPE_ACTOR = urlJoin(process.env.REACT_APP_MIDDLEWARE_URL, 'types', 'actor');
export const TYPE_AGENT = urlJoin(process.env.REACT_APP_MIDDLEWARE_URL, 'types', 'agent');
export const TYPE_MEMBER = urlJoin(process.env.REACT_APP_MIDDLEWARE_URL, 'types', 'member');

export const STATUS_PUBLISHED = urlJoin(process.env.REACT_APP_MIDDLEWARE_URL, 'status', 'published');
export const STATUS_DRAFT = urlJoin(process.env.REACT_APP_MIDDLEWARE_URL, 'status', 'draft');

export const GROUP_OASIS = urlJoin(process.env.REACT_APP_MIDDLEWARE_URL, 'groups', 'oasis');

export const offerOrEventSparql = [
  {
    type: 'bgp',
    triples: [
      {
        subject: { termType: 'Variable', value: 's1' },
        predicate: { termType: 'NameNode', value: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type' },
        object: { termType: 'Variable', value: 'type' }
      }
    ]
  },
  {
    type: 'filter',
    expression: {
      type: 'operation',
      operator: '||',
      args: [
        {
          type: 'operation',
          operator: '=',
          args: [
            {
              termType: 'Variable',
              value: 'type'
            },
            {
              termType: 'NameNode',
              value: 'http://virtual-assembly.org/ontologies/cdlt#OfferAndNeed'
            }
          ]
        },
        {
          type: 'operation',
          operator: '=',
          args: [
            {
              termType: 'Variable',
              value: 'type'
            },
            {
              termType: 'NameNode',
              value: 'http://virtual-assembly.org/ontologies/pair#Event'
            }
          ]
        }
      ]
    }
  }
];
