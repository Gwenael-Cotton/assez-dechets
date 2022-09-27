const { number, object, string } = require('yup');

const userSchema = object({
  firstName: string().required(),
  lastName: string().required(),
  email: string().email().required(),
  password: string().required('Please enter your password')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      'Must contain 8 characters, one uppercase, one lowercase, one number and one special case character',
    ),
  numberParticipations: number().required(),

});

module.exports = userSchema;
