const { object, number } = require('yup');

const eventSchema = object({
  userId: number().required(),
  eventId: number().required(),
});

module.exports = eventSchema;
