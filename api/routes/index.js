const { Router } = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression');

module.exports = function ({
  UserRoutes,
  CourseRoutes,
  AuthRoutes,
  CategoryRoutes,
  SettingRoutes,
  CourseChapterRoutes,
}) {
  const router = Router();
  const apiRoute = Router();

  apiRoute.use(cors()).use(bodyParser.json()).use(compression());

  apiRoute.use('/user', UserRoutes);
  apiRoute.use('/course', CourseRoutes);
  apiRoute.use('/coursechapter', CourseChapterRoutes);
  apiRoute.use('/auth', AuthRoutes);
  apiRoute.use('/category', CategoryRoutes);
  apiRoute.use('/setting', SettingRoutes);
  router.use('/api', apiRoute);

  return router;
};
