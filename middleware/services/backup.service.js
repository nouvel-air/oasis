const path = require('path');
const BackupService = require('@semapps/backup');
const CONFIG = require('../config/config');

module.exports = {
  mixins: [BackupService],
  settings: {
    localServer: {
      fusekiBase: CONFIG.FUSEKI_BASE,
      otherDirsPaths: {
        actors: path.resolve(__dirname, '../actors'),
        jwt: path.resolve(__dirname, '../jwt'),
        uploads: path.resolve(__dirname, '../uploads')
      }
    },
    copyMethod: 'fs',
    remoteServer: {
      path: CONFIG.BACKUP_SERVER_PATH
    },
    cronJob: {
      time: '0 0 4 * * *', // Every night at 4am
      timeZone: 'Europe/Paris'
    }
  }
};
