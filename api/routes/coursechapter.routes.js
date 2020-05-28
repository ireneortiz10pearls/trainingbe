const { Router } = require('express');
const {
  courseChapterValidationRules,
  validate,
} = require('../middleware/validators/courseChapter.validator.js');
const auth = require('../middleware/auth/auth.js');

module.exports = function ({ CourseChapterController }) {
  const router = Router();

  router.get(
    '/',
    auth,
    CourseChapterController.getCourseChapters.bind(CourseChapterController)
  );
  router.get(
    '/:id',
    auth,
    CourseChapterController.getCourseChapter.bind(CourseChapterController)
  );
  router.get(
    '/course/:id',
    auth,
    CourseChapterController.getChaptersByCourseId.bind(CourseChapterController)
  );
  router.post(
    '/',
    [auth, [courseChapterValidationRules(), validate]],
    CourseChapterController.createCourseChapter.bind(CourseChapterController)
  );
  router.put(
    '/:id',
    [auth, [courseChapterValidationRules(), validate]],
    CourseChapterController.updateCourseChapter.bind(CourseChapterController)
  );
  router.delete(
    '/:id',
    auth,
    CourseChapterController.deleteCourseChapter.bind(CourseChapterController)
  );

  return router;
};
