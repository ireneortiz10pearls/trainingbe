const { body, validationResult } = require('express-validator');
const courseValidationRules = () => {
  return [body('title').not().isEmpty(), body('categoryId').not().isEmpty()];
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
  courseValidationRules,
  validate,
};
