const { Router } = require('express');
const auth = require('../middleware/auth/auth.js');

module.exports = function ({ TrainingPathController }) {
  const router = Router();

  router.get(
    '/mostenrolled/courses',
    auth,
    TrainingPathController.getMostEnrolledCourses.bind(TrainingPathController)
  );
  router.get(
    '/mostenrolled/users',
    auth,
    TrainingPathController.getMostEnrolledUsers.bind(TrainingPathController)
  );

  router.get(
    '/',
    auth,
    TrainingPathController.getTrainingPaths.bind(TrainingPathController)
  );
  router.get(
    '/:id',
    auth,
    TrainingPathController.getTrainingPath.bind(TrainingPathController)
  );
  router.get(
    '/user/:userId',
    auth,
    TrainingPathController.getUserCourses.bind(TrainingPathController)
  );
  router.get(
    '/userchapter/:trainingPathId/:courseId/:userId',
    auth,
    TrainingPathController.getUserChaptersByCourseId.bind(
      TrainingPathController
    )
  );

  router.put(
    '/trainingpathstatus/:chapterId/:trainingPathId',
    auth,
    TrainingPathController.updateTrainingPathStatus.bind(TrainingPathController)
  );

  router.post(
    '/',
    auth,
    TrainingPathController.createTrainingPath.bind(TrainingPathController)
  );
  router.post(
    '/trainingpathstatus/',
    auth,
    TrainingPathController.createTrainingPathStatus.bind(TrainingPathController)
  );
  router.post(
    '/trainingpathstatus/batch',
    auth,
    TrainingPathController.createBatchTrainingPathStatus.bind(
      TrainingPathController
    )
  );
  router.put(
    '/',
    auth,
    TrainingPathController.deleteTrainingPath.bind(TrainingPathController)
  );
  return router;
};
