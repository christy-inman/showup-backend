// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgresql://localhost/SHOWUP_API'
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }

};
