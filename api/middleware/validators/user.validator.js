const { body, validationResult } = require('express-validator');
const userValidationRules = () => {
  return [
    body('firstName').not().isEmpty(),
    body('lastName').not().isEmpty(),
    body('roleId').not().isEmpty(),
    // username must be an email
    body('email').isEmail(),
    // password must be at least 5 chars long
    body('password').isLength({ min: 6 }),
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors
    .array()
    .map((err) => extractedErrors.push({ msg: `${err.msg}: ${err.param}` }));

  return res.status(422).json({
    errors: extractedErrors,
  });
};

module.exports = {
  userValidationRules,
  validate,
};
