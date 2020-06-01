const { Router } = require('express');

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

  return router;
};
