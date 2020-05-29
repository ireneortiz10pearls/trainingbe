const { Router } = require('express');
const {
  courseValidationRules,
  validate,
} = require('../middleware/validators/course.validator.js');
const auth = require('../middleware/auth/auth.js');

module.exports = function ({ CourseController }) {
  const router = Router();

  router.get('/', auth, CourseController.getCourses.bind(CourseController));
  router.get('/:id', auth, CourseController.getCourse.bind(CourseController));
  router.get(
    '/category/:categoryid',
    auth,
    CourseController.getAllByCategory.bind(CourseController)
  );
  router.get(
    '/keyword/:keyword',
    auth,
    CourseController.getAllByKeyWord.bind(CourseController)
  );
  router.get(
    '/keywordcategory/:categoryid/:keyword',
    auth,
    CourseController.getAllByKeyWordAndCategory.bind(CourseController)
  );
  router.post(
    '/',
    [auth, [courseValidationRules(), validate]],
    CourseController.createCourse.bind(CourseController)
  );
  router.put(
    '/:id',
    [auth, [courseValidationRules(), validate]],
    CourseController.updateCourse.bind(CourseController)
  );
  router.delete(
    '/:id',
    auth,
    CourseController.deleteCourse.bind(CourseController)
  );

  return router;
};
