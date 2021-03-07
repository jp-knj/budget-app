const Joi = require('joi');

const registerValidation = data => {
  const schema = Joi.object({
    name: Joi.string()
      .min(3)
      .required(),
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .required(),
  });
  return schema.validate(data);
};

const loginValidation = data => {
  const schema = Joi.object({
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .required(),
  });
  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
