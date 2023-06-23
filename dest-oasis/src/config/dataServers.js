const dataServers = {
  oasis: {
    baseUrl: import.meta.env.VITE_APP_MIDDLEWARE_URL,
    authServer: true,
    default: true,
    uploadsContainer: '/files'
  },
  cdlt: {
    baseUrl: 'https://data.lescheminsdelatransition.org/'
  }
};

export default dataServers;
