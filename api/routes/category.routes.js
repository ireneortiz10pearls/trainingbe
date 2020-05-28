const { Router } = require('express');

const {
  categoryValidationRules,
  validate,
} = require('../middleware/validators/category.validator.js');
const auth = require('../middleware/auth/auth.js');

module.exports = function ({ CategoryController }) {
  const router = Router();

  router.get(
    '/',
    auth,
    CategoryController.getCategories.bind(CategoryController)
  );
  router.get(
    '/:id',
    auth,
    CategoryController.getCategory.bind(CategoryController)
  );
  router.post(
    '/',
    [auth, [categoryValidationRules(), validate]],
    CategoryController.createCategory.bind(CategoryController)
  );
  router.put(
    '/:id',
    [auth, [categoryValidationRules(), validate]],
    CategoryController.updateCategory.bind(CategoryController)
  );
  router.delete(
    '/:id',
    auth,
    CategoryController.deleteCategory.bind(CategoryController)
  );

  return router;
};
