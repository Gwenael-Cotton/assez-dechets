const {
  object, string, number, date,
} = require('yup');

const eventSchema = object({
  title: string().required(),
  place: string().required(),
  startDate: date().required(),
  endDate: date().required(),
  description: string().required(),
  status: string().required(),
  weight: number().required().positive().integer(),
  creatorId: number().required().positive().integer(),

});

module.exports = eventSchema;
