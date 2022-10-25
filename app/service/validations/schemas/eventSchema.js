const yup = require('yup');

const eventSchema = yup.object({
  body: yup.object({
    title: yup.string().required(),
    place: yup.string().required(),
    startDate: yup.date().required(),
    endDate: yup.date().required(),
    description: yup.string().required(),
    status: yup.string().required(),
    weight: yup.number().required(),
    creatorId: yup.number().required().positive().integer(),
    participantIds: yup.array().of(yup.number().positive().integer()),
  }),

});

module.exports = eventSchema;
