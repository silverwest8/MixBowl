"use strict";
module.exports = {
  apps : [
    {
    name: "Mixbowl",
    script: 'cd ./backend && npm run start',
    env: {
      NODE_ENV: "production",
    },
  },
  {
    name: "Mixbowl-dev",
    script: 'cd ./backend && npm run start:dev',
    watch: ['./backend/src/app.js'],
    env: {
      NODE_ENV: "development",
    },
  },
  {
    name: "Mixbowl-local",
    script: 'npm run start:dev',
    watch: ['./backend/src/app.js'],
    env: {
      NODE_ENV: "development",
    },
  }
],

  deploy : {
    production : {
      user : 'SSH_USERNAME',
      host : 'SSH_HOSTMACHINE',
      ref  : 'origin/master',
      repo : 'GIT_REPOSITORY',
      path : 'DESTINATION_PATH',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};