import urlJoin from 'url-join';
import { dataProvider, fetchVoidEndpoints } from '@semapps/semantic-data-provider';
import dataServers from './dataServers';
import * as resources from '../resources';

const { origin: backendOrigin } = new URL(process.env.REACT_APP_MIDDLEWARE_URL);

export default dataProvider({
  dataServers,
  resources: Object.fromEntries(Object.entries(resources).map(([k, v]) => [k, v.dataModel])),
  jsonContext: ['https://www.w3.org/ns/activitystreams', urlJoin(backendOrigin, '.well-known/context.jsonld')],
  plugins: [fetchVoidEndpoints()]
});
