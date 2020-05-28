const { body, validationResult } = require('express-validator');

const authValidationRules = () => {
  return [
    // username must be an email
    body('email').isEmail(),
    // password exists
    body('password').exists(),
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
  });
};

module.exports = {
  authValidationRules,
  validate,
};
