import { dataProvider as semanticDataProvider } from '@semapps/semantic-data-provider';
import ontologies from './ontologies.json';
import dataServers from './dataServers';
import dataModels from './dataModels';

const dataProvider = semanticDataProvider({
  dataServers,
  resources: dataModels,
  ontologies,
  jsonContext: process.env.REACT_APP_MIDDLEWARE_URL + 'context.json'
});

export default dataProvider;
