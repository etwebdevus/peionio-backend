require('dotenv').config();

module.exports = {
  api: {
    baseUrl: process.env.API_BASE_URL || 'https://api.peionio.com/v0',
  },
  server: {
    port: process.env.PORT || 3000,
  },
  auth: {
    accessToken: process.env.ACCESS_TOKEN,
    refreshToken: process.env.REFRESH_TOKEN,
  },
  logging: {
    level: process.env.LOG_LEVEL || 'info',
  }
};

