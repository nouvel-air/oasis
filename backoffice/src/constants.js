import urlJoin from 'url-join';

export const TYPE_ANNONCE_AGENDA = urlJoin(process.env.REACT_APP_MIDDLEWARE_URL, 'types', 'agenda');
export const TYPE_ANNONCE_EMPLOI = urlJoin(process.env.REACT_APP_MIDDLEWARE_URL, 'types', 'emploi-benevolat');

export const STATUS_PUBLISHED = urlJoin(process.env.REACT_APP_MIDDLEWARE_URL, 'status', 'published');
export const STATUS_DRAFT = urlJoin(process.env.REACT_APP_MIDDLEWARE_URL, 'status', 'draft');

export const GROUP_OASIS = urlJoin(process.env.REACT_APP_MIDDLEWARE_URL, 'groups', 'oasis');
