import urlJoin from 'url-join';

export const STATUS_PUBLISHED = urlJoin(process.env.REACT_APP_MIDDLEWARE_URL, 'status', 'published');
export const STATUS_DRAFT = urlJoin(process.env.REACT_APP_MIDDLEWARE_URL, 'status', 'draft');
