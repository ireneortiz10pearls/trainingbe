const { Router } = require('express');
const auth = require('../middleware/auth/auth.js');

module.exports = function ({ TrainingPathController }) {
  const router = Router();

  router.get(
    '/',
    TrainingPathController.getTrainingPaths.bind(TrainingPathController)
  );
  router.get(
    '/:id',
    TrainingPathController.getTrainingPath.bind(TrainingPathController)
  );
  router.get(
    '/user/:userId',
    TrainingPathController.getUserCourses.bind(TrainingPathController)
  );
  router.post(
    '/',
    auth,
    TrainingPathController.createTrainingPath.bind(TrainingPathController)
  );
  router.put(
    '/',
    auth,
    TrainingPathController.deleteTrainingPath.bind(TrainingPathController)
  );
  return router;
};
