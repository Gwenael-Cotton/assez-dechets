require('dotenv').config();

module.exports = {
  development: {
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    host: process.env.PGHOST,
    dialect: 'postgres',
  },
  test: {
    username: 'assez-dechets',
    password: 'superSecretPassword',
    database: 'assez-dechets-project',
    host: 'localhost',
    dialect: 'postgres',
  },
  production: {
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    port: process.env.PGPORT,
    host: process.env.PGHOST,
    dialect: 'postgres',
  },
};
