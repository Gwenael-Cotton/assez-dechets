const yup = require('yup');
const { PASSWORD_REQUIREMENTS, REQUIRED_PASSWORD } = require('../../../constants');

const userRegisterSchema = yup.object({
  body: yup.object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(REQUIRED_PASSWORD)
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        PASSWORD_REQUIREMENTS,
      ),
  }),
  // params: yup.object({
  //   id: yup.number().required(),
  // }),
});

module.exports = userRegisterSchema;
