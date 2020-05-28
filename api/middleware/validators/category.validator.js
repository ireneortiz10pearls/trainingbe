const { body, validationResult } = require('express-validator');
const categoryValidationRules = () => {
  return [body('name').not().isEmpty(), body('typeId').not().isEmpty()];
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
  categoryValidationRules,
  validate,
};
