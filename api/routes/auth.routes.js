const { Router } = require('express');

const {
  authValidationRules,
  validate,
} = require('../middleware/validators/auth.validator.js');
const auth = require('../middleware/auth/auth.js');

module.exports = function ({ AuthController }) {
  const router = Router();

  router.get('/', auth, AuthController.getUser.bind(AuthController));
  router.post(
    '/',
    authValidationRules(),
    validate,
    AuthController.authUser.bind(AuthController)
  );

  return router;
};
