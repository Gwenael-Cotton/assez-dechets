const {
  object, string, number, date,
} = require('yup');

const eventSchema = object({
  place: string().required(),
  startDate: date().required(),
  endDate: date().required(),
  description: string().required(),
  status: string().required(),
  weight: number().required(),
  creatorId: number().required(),

});

module.exports = eventSchema;
