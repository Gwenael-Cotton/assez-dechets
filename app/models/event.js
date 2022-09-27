import { DataTypes, Model } from 'sequelize';
import sequelize from '../database';

class User extends Model {}

User.init({
  place: DataTypes.STRING,
  startDate: DataTypes.DATE,
  endDate: DataTypes.DATE,
  description: DataTypes.STRING,
  status: DataTypes.ENUM('UPCOMING', 'ONGOING', 'DONE'),
  weight: DataTypes.INTEGER,
  creatorId: DataTypes.INTEGER,
}, {
  sequelize,
  tableName: 'event',
  underscored: true,
});
export default User;
