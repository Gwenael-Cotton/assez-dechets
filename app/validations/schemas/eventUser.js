import {
  object, number,
} from 'yup';

const eventSchema = object({
  userId: number().required(),
  eventId: number().required(),
});

export default eventSchema;
