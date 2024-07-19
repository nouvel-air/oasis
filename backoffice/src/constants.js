import urlJoin from 'url-join';

export const TYPE_ANNONCE_EVENEMENT = urlJoin(process.env.REACT_APP_MIDDLEWARE_URL, 'types', 'evenement');
export const TYPE_ANNONCE_EMPLOI = urlJoin(process.env.REACT_APP_MIDDLEWARE_URL, 'types', 'emploi-benevolat');
