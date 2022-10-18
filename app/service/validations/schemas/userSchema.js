// const { number, object, string } = require('yup');
const yup = require('yup');

const userSchema = yup.object({
  body: yup.object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required('Please enter your password')
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        'Must contain 8 characters, one uppercase, one lowercase, one number and one special case character',
      ),
    numberParticipations: yup.number().required(),
  }),
  // params: yup.object({
  //   id: yup.number().required(),
  // }),
});

module.exports = userSchema;
