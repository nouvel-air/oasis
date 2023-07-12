const dataServers = {
  oasis: {
    baseUrl: process.env.REACT_APP_MIDDLEWARE_URL,
    authServer: true,
    default: true,
    uploadsContainer: '/files'
  },
  cdlt: {
    baseUrl: 'https://data.lescheminsdelatransition.org/'
  }
};

export default dataServers;
