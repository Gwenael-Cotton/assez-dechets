import { DataTypes, Model } from 'sequelize';
import sequelize from '../database';

class User extends Model {}

User.init({
  firstName: DataTypes.STRING,
  lastName: DataTypes.STRING,
  password: DataTypes.STRING,
  numberParticipations: DataTypes.INTEGER,
}, {
  sequelize,
  tableName: 'user',
  underscored: true,
});
export default User;
