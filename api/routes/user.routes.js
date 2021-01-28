const { Router } = require('express');

const {
  userValidationRules,
  validate,
} = require('../middleware/validators/user.validator.js');
const auth = require('../middleware/auth/auth.js');

module.exports = function ({ UserController }) {
  const router = Router();

  router.get('/', UserController.getUsers.bind(UserController));
  router.get('/:id', UserController.getUser.bind(UserController));
  router.post(
    '/',
    [auth, [userValidationRules(), validate]],
    UserController.createUser.bind(UserController)
  );
  router.put(
    '/:id',
    [userValidationRules(), validate],
    UserController.updateUser.bind(UserController)
   );
  router.delete('/:id', UserController.deleteUser.bind(UserController));
  router.get(
    '/forgotpassword/:email',
    UserController.forgotPassword.bind(UserController)
  );

  return router;
};
