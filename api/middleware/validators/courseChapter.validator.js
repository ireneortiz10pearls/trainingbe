const { body, validationResult } = require('express-validator');
const courseChapterValidationRules = () => {
  return [
    body('length').not().isEmpty(),
    body('name').not().isEmpty(),
    body('length').isNumeric(),
    body('order').not().isEmpty(),
    body('order').isNumeric(),
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
  courseChapterValidationRules,
  validate,
};
