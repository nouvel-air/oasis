export const arrayOf = value => {
  // If the field is null-ish, we suppose there are no values.
  if (!value) {
    return [];
  }
  // Return as is.
  if (Array.isArray(value)) {
    return value;
  }
  // Single value is made an array.
  return [value];
};

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
