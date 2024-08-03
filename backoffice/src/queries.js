export const filterNoParent = [
  {
    type: 'filter',
    expression: {
      type: 'operation',
      operator: 'notexists',
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
                value: 'http://virtual-assembly.org/ontologies/pair#partOf'
              },
              object: {
                termType: 'Variable',
                value: 'parent'
              }
            }
          ]
        }
      ]
    }
  }
];

export const offeredByFilter = uris => [
  {
    type: 'values',
    values: uris.map(uri => ({
      '?uri': {
        termType: 'NamedNode',
        value: uri
      }
    }))
  },
  {
    type: 'bgp',
    triples: [
      {
        subject: { termType: 'Variable', value: 's1' },
        predicate: { termType: 'NameNode', value: 'http://virtual-assembly.org/ontologies/pair#offeredBy' },
        object: { termType: 'Variable', value: 'uri' }
      }
    ]
  }
];
