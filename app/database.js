const { Sequelize } = require('sequelize');

const db = {};

const sequelize = new Sequelize(process.ENV.DATABASE_URL);

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
