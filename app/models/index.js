import User from './user';
import Event from './event';

Event.belongsTo(User, {
  foreignKey: 'creator_id',
  as: 'user',
});

User.belongsToMany(Event, { through: 'EventUser', foreignKey: 'user_id' });
Event.belongsToMany(User, { through: 'EventUser', foreignKey: 'event_id' });

export default { User, Event };
