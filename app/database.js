import { Sequelize } from 'sequelize';

const db = {};

// On fait une connection à la BDD. sequelize nous permettra de faire par la suite nos requête
const sequelize = new Sequelize(process.ENV.CONNECT_DATABASE);

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;

// import { Sequelize } from 'sequelize';

// const sequelize = new Sequelize(process.ENV.CONNECT_DATABASE);

// try {
//   await sequelize.authenticate();
//   console.log('Connection has been established successfully.');
// } catch (err) {
//   console.error('Unable to connect to the database:', err);
// }

// sequelize.authenticate().then(() => {
//   console.log('Connection established successfully.');
// }).catch((err) => {
//   console.error('Unable to connect to the database:', err);
// }).finally(() => {
//   sequelize.close();
// });
